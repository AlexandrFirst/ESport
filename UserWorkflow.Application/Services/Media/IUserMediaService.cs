using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Application.Services.Media
{
    public interface IUserMediaService
    {
        Task<MemoryStream> GetVideoStream(int exerciseTutorialId, string format);
        //Task<MemoryStream> GetImageStream();
    }
}
