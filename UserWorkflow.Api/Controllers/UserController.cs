using Castle.Core.Logging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Windows.Input;
using UserWorkflow.Application;
using UserWorkflow.Application.Requests;
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

        public UserController(ICommandBus commandBus, IRequestBus requestBus, ILogger<UserController> logger, IWebHostEnvironment env)
        {
            this.commandBus = commandBus;
            this.requestBus = requestBus;
            this.logger = logger;
            this.env = env;
        }

        [HttpGet("info/{id}")]
        public async Task<IActionResult> GetUserInfo(int userId)
        {
            var started = DateTime.UtcNow;
            var requestInstanceId = Guid.NewGuid();
            var methodName = this.ControllerContext.RouteData.Values["action"].ToString();

            try
            {
                logger.LogInformation($"STARTED {methodName} {requestInstanceId} at {started} utc");
                var identity = User.Claims;

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

    }
}
