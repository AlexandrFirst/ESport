using StreamingService.Models.FileUpload;
using StreamingService.Services;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;

namespace StreamingService.Controllers
{
    [Route("[controller]")]
    public class FileUploadController : ApiController
    {
        [HttpPost]
        [Route("upload")]
        public async Task<IHttpActionResult> UploadDocument()
        {
            var uploadFileService = new UploadFileService();
            UploadProcessingResult uploadResult = await uploadFileService.HandleRequest(Request);

            if (uploadResult.IsComplete)
            { 
                return Ok();
            }

            return Ok(HttpStatusCode.Continue);
        }
    }
}
