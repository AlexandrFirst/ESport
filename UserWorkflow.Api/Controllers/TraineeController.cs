using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net;
using System;
using System.Threading.Tasks;
using UserWorkflow.Application;
using UserWorkflow.Application.Models.Gym;
using UserWorkflow.Application.Requests.Gym;
using UserWorkflow.Application.Requests.Trainee;
using UserWorkflow.Application.Commands.Trainee;
using UserWorkFlow.Infrastructure.Queries;
using UserWorkflow.Api.Dto;

namespace UserWorkflow.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class TraineeController : ControllerBase
    {
        private readonly ICommandBus commandBus;
        private readonly IRequestBus requestBus;
        private readonly ILogger<TrainerController> logger;

        public TraineeController(ICommandBus commandBus, IRequestBus requestBus, ILogger<TrainerController> logger)
        {
            this.commandBus = commandBus;
            this.requestBus = requestBus;
            this.logger = logger;
        }

        [HttpPost("lessonRecomendation")]
        public async Task<IActionResult> GetRecommendation([FromBody] GetTraineeRecommedation request)
        {
            var started = DateTime.UtcNow;
            var requestInstanceId = Guid.NewGuid();
            var methodName = this.ControllerContext.RouteData.Values["action"].ToString();

            try
            {
                logger.LogInformation($"STARTED {methodName} {requestInstanceId} at {started} utc");

                var result = await requestBus.ExecuteAsync<GetTraineeRecommedation, GetTraineeRecommedationResult>(User, request);

                if (!result.Succeeded)
                    return BadRequest(result.Errors);

                return Ok(result.Data);
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

        [HttpPost("applyForLesson")]
        public async Task<IActionResult> ApplyForLesson([FromBody] ApplyForLesson applyForLesson) 
        {
            var started = DateTime.UtcNow;
            var requestInstanceId = Guid.NewGuid();
            var methodName = this.ControllerContext.RouteData.Values["action"].ToString();

            try
            {
                logger.LogInformation($"STARTED {methodName} {requestInstanceId} at {started} utc");

                var result = await commandBus.ExecuteAsync(User, applyForLesson);

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

        [HttpPost("userTimeTable")]
        public async Task<IActionResult> GetTraineeTimetable([FromBody] GymTimeTableFilter gymTimeTableFilter) 
        {
            var started = DateTime.UtcNow;
            var requestInstanceId = Guid.NewGuid();
            var methodName = this.ControllerContext.RouteData.Values["action"].ToString();

            try
            {
                logger.LogInformation($"STARTED {methodName} {requestInstanceId} at {started} utc");

                var result = await requestBus.ExecuteAsync<GetTraineeTimetable, GetTraineeTimetableResult>(User, new GetTraineeTimetable()
                {
                    DayOfTheWeeks = gymTimeTableFilter.GetFiltrationValue()
                });

                if (!result.Succeeded)
                    return BadRequest(result.Errors);

                return Ok(result.Data);
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
    }
}
