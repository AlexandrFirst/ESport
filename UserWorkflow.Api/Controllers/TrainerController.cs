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
using UserWorkflow.Api.Dto;
using UserWorkflow.Application.Models.Gym;
using UserWorkflow.Application.Requests.Gym;
using UserWorkflow.Application.Requests.Trainer;
using UserWorkFlow.Infrastructure.Queries;
using UserWorkflow.Esport.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace UserWorkflow.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class TrainerController: ControllerBase
    {
        private readonly ICommandBus commandBus;
        private readonly IRequestBus requestBus;
        private readonly ILogger<TrainerController> logger;

        public TrainerController(ICommandBus commandBus, ILogger<TrainerController> logger, IRequestBus requestBus)
        {
            this.commandBus = commandBus;
            this.logger = logger;
            this.requestBus = requestBus;
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

        [HttpPost("LessonCreate")]
        public async Task<IActionResult> CreateLesson([FromBody] CreateLesson lessonToCreate) 
        {
            var started = DateTime.UtcNow;
            var requestInstanceId = Guid.NewGuid();
            var methodName = this.ControllerContext.RouteData.Values["action"].ToString();
            try
            {
                logger.LogInformation($"STARTED {methodName} {requestInstanceId} at {started} utc");

                var result = await commandBus.ExecuteAsync(User, lessonToCreate);

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

        [HttpPost("timetable")]
        public async Task<IActionResult> GetTrainerTimetable([FromBody] TrainerTimeTableFilter trainerTimeTableFilter) 
        {
            var started = DateTime.UtcNow;
            var requestInstanceId = Guid.NewGuid();
            var methodName = this.ControllerContext.RouteData.Values["action"].ToString();

            try
            {
                logger.LogInformation($"STARTED {methodName} {requestInstanceId} at {started} utc");

                var result = await requestBus.ExecuteAsync<GetTrainerTimeTable, GetTrainerTimeTableResult>(User, new GetTrainerTimeTable() 
                {
                    GymId = trainerTimeTableFilter.GymId,
                    DayOfTheWeek = trainerTimeTableFilter.GetFiltrationValue(),
                    TrainerId = trainerTimeTableFilter.TrainerId,
                });

                if (!result.Succeeded)
                    return BadRequest(result.Errors);

                return Ok(result.Data.GymTimeTable);
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

        [HttpPost("ExerciseCreate")]
        public async Task<IActionResult> CreateLesson([FromForm] ExerciseCreate exerciseCreate) 
        {
            var started = DateTime.UtcNow;
            var requestInstanceId = Guid.NewGuid();
            var methodName = this.ControllerContext.RouteData.Values["action"].ToString();
            try
            {
                logger.LogInformation($"STARTED {methodName} {requestInstanceId} at {started} utc");

                var result = await commandBus.ExecuteAsync(User, exerciseCreate);

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

        [HttpPost("ExerciseListing")]
        public async Task<IActionResult> GetTrainerExerciseListing([FromBody] GetExerciseTrainerListing request) 
        {
            var started = DateTime.UtcNow;
            var requestInstanceId = Guid.NewGuid();
            var methodName = this.ControllerContext.RouteData.Values["action"].ToString();
            try
            {
                logger.LogInformation($"STARTED {methodName} {requestInstanceId} at {started} utc");

                var result = await requestBus.ExecuteAsync<GetExerciseTrainerListing, GetExerciseTrainerListingResult>(User, request);

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


        [HttpGet("lessonInfo/{lessonId}")]
        public async Task<IActionResult> GetLessonInfo(int lessonId)
        {
            var started = DateTime.UtcNow;
            var requestInstanceId = Guid.NewGuid();
            var methodName = this.ControllerContext.RouteData.Values["action"].ToString();
            try
            {
                logger.LogInformation($"STARTED {methodName} {requestInstanceId} at {started} utc");

                var result = await requestBus.ExecuteAsync<GetTrainerLessonInfo, GetTrainerLessonInfoResult>(User, new GetTrainerLessonInfo() { LessonId = lessonId});

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

        [HttpPost("pendingTrainees")]
        public async Task<IActionResult> GetPendingTrainees([FromBody] GetPendingTrainees request) 
        {
            var started = DateTime.UtcNow;
            var requestInstanceId = Guid.NewGuid();
            var methodName = this.ControllerContext.RouteData.Values["action"].ToString();
            try
            {
                logger.LogInformation($"STARTED {methodName} {requestInstanceId} at {started} utc");

                var result = await requestBus.ExecuteAsync<GetPendingTrainees, GetPendingTraineesResult>(User, request);

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

        [HttpPost("approvePendingTrainess")]
        public async Task<IActionResult> ApprovePendingTrainees([FromBody] ApprovePendingTrainees command) 
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

        [HttpPost("updateTraineeSchedule")]
        public async Task<IActionResult> UpdateTraineeSchedule([FromBody] UpdateTraineeLessonInfo command)
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
    }
}
