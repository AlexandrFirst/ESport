using MediaClient.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using StreamingService.DL;
using StreamingService.Dto.Records;
using System;
using System.IO;
using System.IO.Pipes;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Serialization.Formatters.Binary;
using System.Threading.Tasks;

namespace StreamingService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MediaController : ControllerBase
    {
        private readonly IMediaService mediaService;
        private readonly ILogger<MediaController> logger;
        private readonly StreamDataContext streamDataContext;

        private string recordStringBucket = "recorded_streams";

        public MediaController(IMediaService mediaService, ILogger<MediaController> logger, StreamDataContext streamDataContext)
        {
            this.mediaService = mediaService;
            this.logger = logger;
            this.streamDataContext = streamDataContext;
        }


        [HttpGet("record/{fileId}")]
        public async Task<IActionResult> Get(string fileId)
        {
            var fileGuid = Guid.Parse(fileId);
            var streamRecord = await streamDataContext.EsStreamRecords.FirstOrDefaultAsync(x => x.FileName == fileId);
            if (streamRecord == null) { return new NotFoundResult(); }

            var getVideoBytes = await mediaService.DownloadFile(recordStringBucket, streamRecord.FileName);

            MemoryStream memStream = new MemoryStream();
            BinaryFormatter binForm = new BinaryFormatter();

            memStream.Write(getVideoBytes, 0, getVideoBytes.Length);
            memStream.Seek(0, SeekOrigin.Begin);

            return new FileStreamResult(memStream, "video/webm");
        }

        [HttpPost("streams")]
        public async Task<IActionResult> GetAllRecords([FromBody] RecordFilter recordFilter) 
        {
            var recordsQuery = streamDataContext.EsStreamRecords.Where(x => x.PublicId != null).AsQueryable();
            if (recordFilter.PageSize < 1 || recordFilter.Page < 1) 
            {
                return BadRequest("Invalid input params");
            }

            var records = await recordsQuery.Skip((recordFilter.Page - 1) * recordFilter.PageSize).Take(recordFilter.PageSize).ToListAsync();
            var recordsResult = records.Select(x => new RecordListingResponse()
            {
                FileName = x.FileName,
                PublicId = x.PublicId,
                RecordId = x.Id.ToString(),
                RecordTime = x.CreationDate
            });
            return Ok(recordsResult);
        }
    }
}
