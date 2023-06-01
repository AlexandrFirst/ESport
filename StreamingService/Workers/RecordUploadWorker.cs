using MediaClient.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using StreamingService.DL;
using StreamingService.Models.Options;
using StreamingService.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace StreamingService.Workers
{
    public class RecordUploadWorker : BackgroundService
    {
        private readonly IServiceProvider serviceProvider;
        private readonly ILogger<RecordUploadWorker> logger;
        private readonly IRecordService recordService;
        private readonly RecordedFileOptions recordedVideoOptions;
        private List<Task> listenerList = new List<Task>();
        private int listenerCount = 4;

        private string recordedVideoBucket = "recorded_streams";

        public RecordUploadWorker(IServiceProvider serviceProvider, ILogger<RecordUploadWorker> logger,
            IRecordService recordService, IOptions<RecordedFileOptions> recordedVideoOptions)
        {
            this.serviceProvider = serviceProvider;
            this.logger = logger;
            this.recordService = recordService;
            this.recordedVideoOptions = recordedVideoOptions.Value;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var channelReader = recordService.GetUploadRecordQueueReader();
            for (int i = 0; i < listenerCount; i++) 
            {
                listenerList.Add(Task.Factory.StartNew(async () =>
                {
                    await using var scope = serviceProvider.CreateAsyncScope();

                    var mediaClient = scope.ServiceProvider.GetRequiredService<IMediaService>();
                    var dbContext = scope.ServiceProvider.GetRequiredService<StreamDataContext>();

                    while (!stoppingToken.IsCancellationRequested)
                    {
                        var message = await channelReader.ReadAsync(stoppingToken);

                        var fileName = $"D:\\nure\\Diplom\\ESport\\records\\{message.FileId.ToString().ToLowerInvariant()}.WEBM";
                        if (File.Exists(fileName)) 
                        {
                            var videoRecord = await dbContext.EsStreamRecords.FirstOrDefaultAsync(x => x.EsStreamId == message.RecordId);
                            if (videoRecord == null) { continue; }

                            var fileBytes = File.ReadAllBytes(fileName);
                            var result = await mediaClient.UploadFile(recordedVideoBucket, fileBytes, "video/webm");

                            videoRecord.FileName = result.FileName;
                            videoRecord.RecordStatus = DL.Models.RecordStatus.Active;
                            videoRecord.PublicId = result.Id;

                            await dbContext.SaveChangesAsync();
                        }
                    }
                }));
            }

            await Task.CompletedTask;
        }
    }
}
