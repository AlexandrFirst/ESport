using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using RMQEsportClient.QueueConfigs;
using RMQEsportClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using UserWorkflow.Application.Configs;
using UserWorkflow.Application.Services.Confirmation;
using UserWorkflow.Application.Services.Media;
using UserWorkflow.Esport;
using Microsoft.EntityFrameworkCore;
using MediaClient.Services;
using UserWorkflow.Esport.Models;
using Microsoft.AspNetCore.Http.Internal;

namespace UserWorkflow.Application.Workers
{
    public class ExerciseMediaWorker : BackgroundService
    {
        private readonly IServiceProvider serviceProvider;
        private readonly ILogger<ExerciseMediaWorker> logger;
        private readonly IUserMediaService userMediaService;

        private List<Task> listenerList = new List<Task>();
        private int listenerCount = 4;

        private readonly string bucketName = "exercise_tutorials";

        public ExerciseMediaWorker(IServiceProvider serviceProvider, ILogger<ExerciseMediaWorker> logger, 
            IUserMediaService userMediaService)
        {
            this.serviceProvider = serviceProvider;
            this.logger = logger;
            this.userMediaService = userMediaService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var channelReader = userMediaService.GetMediaUploadChannelReader();
            for (int i = 0; i < listenerCount; i++)
            {
                listenerList.Add(Task.Factory.StartNew(async () =>
                {
                    using var scope = serviceProvider.CreateScope();
                    var dbContext = scope.ServiceProvider.GetRequiredService<EsportDataContext>();
                    var mediaService = scope.ServiceProvider.GetRequiredService<IMediaService>();

                    while (!stoppingToken.IsCancellationRequested)
                    {
                        var message = await channelReader.ReadAsync(stoppingToken);
                        var exercise = await dbContext.Exercises.FirstOrDefaultAsync(x => x.Id == message.ExerciseId);
                        if (exercise == null) 
                        {
                            logger.LogError("Unable to find exercise with id: " + message.ExerciseId);
                            continue;
                        }
                         
                        if ((message.ExerciseTutorialAction & Models.Exercise.ExerciseTutorialAction.CREATE) == Models.Exercise.ExerciseTutorialAction.CREATE)
                        {
                            try
                            {

                                long length = message.ExerciseTutorial.Length;
                                if (length < 0)
                                    throw new ApplicationException("file is empty");

                                var fileStream = message.ExerciseTutorial.OpenReadStream();
                                byte[] bytes = new byte[length];
                                fileStream.Read(bytes, 0, (int)message.ExerciseTutorial.Length);

                                var uploadResult = await mediaService.UploadFile(bucketName, bytes, "video/webm");

                                var exerciseTutorial = new ExerciseTutorial()
                                {
                                    Link = uploadResult.FileId,
                                    PublicId = uploadResult.Id,
                                };

                                exercise.ExerciseTutorails.Add(exerciseTutorial);
                            }
                            catch (Exception ex)
                            {
                                logger.LogError(ex.Message + " | " + ex.InnerException.Message);
                                continue;
                            }

                            
                        }
                        else if ((message.ExerciseTutorialAction & Models.Exercise.ExerciseTutorialAction.DELETE) == Models.Exercise.ExerciseTutorialAction.DELETE)
                        {
                            try
                            {
                                var tutorialToRemove = exercise.ExerciseTutorails.FirstOrDefault(x => x.Id == message.TutorialId);
                                if (tutorialToRemove == null)
                                {
                                    logger.LogError("Unable to find tutorial to delete with id: " + message.TutorialId);
                                    continue;
                                }

                                await mediaService.RemoveFile(bucketName, tutorialToRemove.Link);
                                exercise.ExerciseTutorails.RemoveAll(l => l.Link == tutorialToRemove.Link);
                            }
                            catch (Exception ex)
                            {

                                logger.LogError(ex.Message + " | " + ex.InnerException.Message);
                                continue;
                            }
                        }
                        else 
                        {
                            logger.LogError("Unsupported action: " + message.ExerciseTutorialAction);
                        }
                        await dbContext.SaveChangesAsync();

                    }
                }, stoppingToken));
            }

            await Task.CompletedTask;
        }
    }
}
