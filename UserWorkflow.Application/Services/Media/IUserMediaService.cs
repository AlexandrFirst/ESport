using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Channels;
using System.Threading.Tasks;
using UserWorkflow.Application.Models.Exercise;

namespace UserWorkflow.Application.Services.Media
{
    public interface IUserMediaService
    {
        Task<MemoryStream> GetVideoStream(int exerciseTutorialId, string format);
        ChannelReader<ExerciseMediaModel> GetMediaUploadChannelReader();
        ChannelWriter<ExerciseMediaModel> GetMediaUploadChannelWriter();
        //Task<MemoryStream> GetImageStream();
    }
}
