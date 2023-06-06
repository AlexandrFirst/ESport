using Castle.Core.Logging;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using UserWorkflow.Application.Services.Media;

namespace UserWorkflow.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MediaController: ControllerBase
    {
        private readonly IUserMediaService userMediaService;
        private readonly ILogger<MediaController> logger;

        public MediaController(IUserMediaService userMediaService, ILogger<MediaController> logger)
        {
            this.userMediaService = userMediaService;
            this.logger = logger;
        }

        [HttpGet("exercise/{tutorialId}")]
        public async Task<IActionResult> GetExerciseTutorial(int tutorialId) 
        {
            try
            {
                string videoFormat = "video/webm";
                var videoStream = await userMediaService.GetVideoStream(tutorialId,videoFormat);
                return new FileStreamResult(videoStream, "video/webm");
            }
            catch (System.Exception ex)
            {
                logger.LogError($"{ex.Message} | {ex.InnerException.Message}");
                return NotFound();
            }
        }
    }
}
