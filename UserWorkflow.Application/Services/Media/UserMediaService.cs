using MediaClient.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Esport;

namespace UserWorkflow.Application.Services.Media
{
    public class UserMediaService : IUserMediaService
    {
        private readonly EsportDataContext esportDataContext;
        private readonly IMediaService mediaService;

        private string trainerExerciseBucket = "exercise_tutorials";

        public UserMediaService(EsportDataContext esportDataContext, IMediaService mediaService)
        {
            this.esportDataContext = esportDataContext;
            this.mediaService = mediaService;
        }

        public async Task<MemoryStream> GetVideoStream(int exerciseTutorialId, string format)
        {
            var exerciseTutorial = await esportDataContext.ExerciseTutorials.FirstOrDefaultAsync(x => x.Id == exerciseTutorialId);
            if (exerciseTutorial == null) {
                throw new ApplicationException("Unable to find tutorial exercise");
            }

            var fileId = exerciseTutorial.Link;
            var videoData = await mediaService.DownloadFile(trainerExerciseBucket, fileId);

            MemoryStream memStream = new MemoryStream();

            memStream.Write(videoData, 0, videoData.Length);
            memStream.Seek(0, SeekOrigin.Begin);

            return memStream;
        }
    }
}
