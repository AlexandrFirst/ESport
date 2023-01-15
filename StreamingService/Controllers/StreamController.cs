using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using StreamingService.DL;
using StreamingService.DL.Models;
using StreamingService.Dto.Stream;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace StreamingService.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class StreamController: ControllerBase
    {
        private readonly StreamDataContext context;

        public StreamController(StreamDataContext context)
        {
            this.context = context;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateStreamEvent([FromBody] CreateStreamEventDto createStreamEventDto) 
        {
            var userIdClaim = User.Claims.FirstOrDefault(x => x.Type == "Id");

            if (userIdClaim == null) 
            {
                throw new System.Exception("No user id is found");
            }

            var userId = int.Parse(userIdClaim.Value);

            Guid? imageId = Guid.Empty;
            if (createStreamEventDto.PreviewImageId == null)
            {
                imageId = null;
            }
            else 
            {
                imageId = Guid.Parse(createStreamEventDto.PreviewImageId);
            }

            var newStream = new EsStream()
            {
                Description = createStreamEventDto.Description,
                EndTime = createStreamEventDto.EndTime,
                EventId = createStreamEventDto.EventId,
                Name = createStreamEventDto.Name,
                PreviewImageId = imageId,
                OrganiserId = userId,
                StartTime = createStreamEventDto.StartTime,
            };

            await context.EsStreams.AddAsync(newStream);
            await context.SaveChangesAsync();

            return Ok(newStream.Id);
        }

        [HttpGet("{page}/{size}")]
        public async Task<IActionResult> GetAllStreams(int page, int size) 
        {
            if (page < 1 || size < 1) 
            {
                return NotFound(new { Message = "No streams are found" });
            }

            var streamsToReturn = await context.EsStreams.Skip(page - 1).Take(size).ToListAsync();
            return Ok(streamsToReturn);
        }
    }
}
