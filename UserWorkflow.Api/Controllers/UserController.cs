using Castle.Core.Logging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Windows.Input;
using UserWorkflow.Api.Dto;
using UserWorkflow.Api.Filters;
using UserWorkflow.Application;
using UserWorkflow.Application.Commands.User;
using UserWorkflow.Application.Commands.UserCommands;
using UserWorkflow.Application.Requests;
using UserWorkflow.Application.Requests.GymAdmin;
using UserWorkflow.Application.Requests.User;
using UserWorkFlow.Infrastructure.Commands;
using UserWorkFlow.Infrastructure.Queries;

namespace UserWorkflow.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ICommandBus commandBus;
        private readonly IRequestBus requestBus;
        private readonly ILogger<UserController> logger;
        private readonly IWebHostEnvironment env;

        public UserController(ICommandBus commandBus, IRequestBus requestBus,
            ILogger<UserController> logger, IWebHostEnvironment env)
        {
            this.commandBus = commandBus;
            this.requestBus = requestBus;
            this.logger = logger;
            this.env = env;
        }

        [HttpGet("info/{userId}")]
        public async Task<IActionResult> GetUserInfo(int userId)
        {
            var started = DateTime.UtcNow;
            var requestInstanceId = Guid.NewGuid();
            var methodName = this.ControllerContext.RouteData.Values["action"].ToString();

            try
            {
                logger.LogInformation($"STARTED {methodName} {requestInstanceId} at {started} utc");

                if (userId < 1)
                    return BadRequest(new[] { $"The given id cannot be less than 1. Id: {userId}" });

                var result = await requestBus.ExecuteAsync<GetUser, GetUserResult>(User, new GetUser
                {
                    UserId = userId
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

        [HttpPost("Update")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserDto updateUserDto)
        {
            var started = DateTime.UtcNow;
            var requestInstanceId = Guid.NewGuid();
            var methodName = this.ControllerContext.RouteData.Values["action"].ToString();

            try
            {
                logger.LogInformation($"STARTED {methodName} {requestInstanceId} at {started} utc");

                var userId = User.Claims.FirstOrDefault(x => x.Type == "Id")?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return BadRequest(new[] { $"User Id information is abscent in request {methodName}" });
                }

                updateUserDto.SetUserId(int.Parse(userId));

                List<Task<ICommandResult>> updateCommandTasks = new List<Task<ICommandResult>>();

                if (updateUserDto.IsAdminUpdate)
                {
                    updateCommandTasks.Add(commandBus.ExecuteAsync(User, updateUserDto.UpdateAdminInfo));
                }

                if (updateUserDto.IsOrganiserUpdate)
                {
                    updateCommandTasks.Add(commandBus.ExecuteAsync(User, updateUserDto.UpdateOrganisationAdminInfo));
                }

                if (updateUserDto.IsTraineeUpdate)
                {
                    updateCommandTasks.Add(commandBus.ExecuteAsync(User, updateUserDto.UpdateTraineeInfo));
                }

                if (updateUserDto.IsTrainerUpdate)
                {
                    updateCommandTasks.Add(commandBus.ExecuteAsync(User, updateUserDto.UpdateTrainerInfo));
                }

                var result = await Task.WhenAll(updateCommandTasks);
                return Ok(result.Select(x => x.Errors));
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

        [HttpPost("Delete")]
        public async Task<IActionResult> DeleteUser([FromBody] DeleteUser deleteUser)
        {
            var started = DateTime.UtcNow;
            var requestInstanceId = Guid.NewGuid();
            var methodName = this.ControllerContext.RouteData.Values["action"].ToString();

            try
            {
                logger.LogInformation($"STARTED {methodName} {requestInstanceId} at {started} utc");

                var result = await commandBus.ExecuteAsync<DeleteUser>(User, deleteUser);

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

        [HttpPost("Confirm")]
        public async Task<IActionResult> ConfirmUser([FromBody] ConfirmProfileEmail confirmProfileEmail) 
        {
            var started = DateTime.UtcNow;
            var requestInstanceId = Guid.NewGuid();
            var methodName = this.ControllerContext.RouteData.Values["action"].ToString();

            try
            {
                logger.LogInformation($"STARTED {methodName} {requestInstanceId} at {started} utc");

                var userId = User.Claims.FirstOrDefault(x => x.Type == "Id")?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return BadRequest(new[] { $"User Id information is abscent in request {methodName}" });
                }

                var result = await commandBus.ExecuteAsync(User, confirmProfileEmail);

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

        [HttpPost("PendingAdmins")]
        [TypeFilter(typeof(AdminAuthFilter))]
        public async Task<IActionResult> GetPendingAdmins([FromBody]GetPendingAdmins request) 
        {
            var started = DateTime.UtcNow;
            var requestInstanceId = Guid.NewGuid();
            var methodName = this.ControllerContext.RouteData.Values["action"].ToString();

            try
            {
                logger.LogInformation($"STARTED {methodName} {requestInstanceId} at {started} utc");

                if (request == null) { throw new ArgumentNullException(nameof(request)); }

                var result = await requestBus.ExecuteAsync<GetPendingAdmins, GetPendingAdminsResult>(User, request);
                
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

        [HttpPost("TrainerRequests")]
        public async Task<IActionResult> GetTrainerRequests([FromBody] GetGymRequests request) 
        {
            var started = DateTime.UtcNow;
            var requestInstanceId = Guid.NewGuid();
            var methodName = this.ControllerContext.RouteData.Values["action"].ToString();

            try
            {
                logger.LogInformation($"STARTED {methodName} {requestInstanceId} at {started} utc");

                var result = await requestBus.ExecuteAsync<GetGymRequests, GetGymRequestsResult>(User, request);

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
