using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net;
using System;
using System.Threading.Tasks;
using UserWorkflow.Application;
using UserWorkflow.Application.Commands.Trainer;
using UserWorkflow.Application.Models.Organisation;
using UserWorkflow.Application.Requests.Organisation;

namespace UserWorkflow.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class TrainerController: ControllerBase
    {
        private readonly ICommandBus commandBus;
        private readonly ILogger<TrainerController> logger;

        public TrainerController(ICommandBus commandBus, ILogger<TrainerController> logger)
        {
            this.commandBus = commandBus;
            this.logger = logger;
        }

        [HttpPost("applyForRequest")]
        public async Task<IActionResult> ApplyForTheGymRequest([FromBody] ApplyTrainerForTimeSchedule applyTrainerForTimeSchedule) 
        {
            var started = DateTime.UtcNow;
            var requestInstanceId = Guid.NewGuid();
            var methodName = this.ControllerContext.RouteData.Values["action"].ToString();
            try
            {
                logger.LogInformation($"STARTED {methodName} {requestInstanceId} at {started} utc");

                var result = await commandBus.ExecuteAsync(User, applyTrainerForTimeSchedule);

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

        //[HttpPost("LessonCreate")]
        //public async Task<IActionResult> CreateLesson()
    }
}
