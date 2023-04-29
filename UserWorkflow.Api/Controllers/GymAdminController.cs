using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net;
using System;
using System.Threading.Tasks;
using UserWorkflow.Api.Filters;
using UserWorkflow.Application;
using UserWorkflow.Application.Commands.UserCommands;
using UserWorkflow.Application.Commands.Gym;

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
        public async Task<IActionResult> UpdateTimeTable(int gymId, [FromBody] AddUpdateGymShift command) 
        {
            var started = DateTime.UtcNow;
            var requestInstanceId = Guid.NewGuid();
            var methodName = this.ControllerContext.RouteData.Values["action"].ToString();
            try
            {
                logger.LogInformation($"STARTED {methodName} {requestInstanceId} at {started} utc");
               

                var result = await commandBus.ExecuteAsync(User, command);

                if (!result.Succeeded)
                    return BadRequest(result.Errors);

                return Ok(result.ItemId);
            }
            catch (ApplicationException exception)
            {
                return BadRequest(new[] { exception.Message });
            }
            catch (Exception e)
            {
                logger.LogError(e, e.Message);
                if (e is InvalidOperationException)
                    return BadRequest(new[] { e.Message });

                return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
            }
            finally
            {
                var ended = DateTime.UtcNow;
                logger.LogInformation($"ENDED {methodName} {requestInstanceId} at {ended} utc. Took {ended - started}");
            }
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

        [HttpPost("openTrainerRequest")]
        public async Task<IActionResult> OpenTrainerRequest(int gymId) 
        {
            return Ok();
        }

        [HttpPut("updateTrainerRequest")]
        public async Task<IActionResult> UpdateTrainerRequest(int gymId)
        {
            return Ok();
        }

        [HttpPost("closeTrainerRequest")]
        public async Task<IActionResult> CloseTrainerRequest(int gymId)
        {
            return Ok();
        }
    }
}
