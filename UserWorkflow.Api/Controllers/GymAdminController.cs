using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using UserWorkflow.Api.Filters;
using UserWorkflow.Application;

namespace UserWorkflow.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]/{gymId}")]
    [TypeFilter(typeof(GymFilter))]
    public class GymAdminController: ControllerBase
    {
        private readonly ICommandBus commandBus;
        private readonly IRequestBus requestBus;
        private readonly ILogger<GymAdminController> logger;

        public GymAdminController(ICommandBus commandBus, IRequestBus requestBus, ILogger<GymAdminController> logger)
        {
            this.commandBus = commandBus;
            this.requestBus = requestBus;
            this.logger = logger;
        }

        [HttpPost("timetable")]
        public async Task<IActionResult> AddUpdateTimeTable(int gymId) 
        {
            return Ok();
        }

        [HttpDelete("removetimetable")]
        public async Task<IActionResult> RemoveTimeTable(int gymId) 
        {
            return Ok();
        }

        [HttpPost("aproveTrainer")]
        public async Task<IActionResult> ApproveTrainerReqeust(int gymId) 
        {
            return Ok();
        }

        [HttpPost("declineTrainer")]
        public async Task<IActionResult> DeclineTrainerRequest(int gymId) 
        {
            return Ok();
        }
    }
}
