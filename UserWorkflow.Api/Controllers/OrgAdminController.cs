using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net;
using System;
using System.Threading.Tasks;
using UserWorkflow.Api.Filters;
using UserWorkflow.Application;
using UserWorkflow.Application.Commands.UserCommands;
using UserWorkflow.Application.Requests.User;
using UserWorkFlow.Infrastructure.Queries;

namespace UserWorkflow.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    [TypeFilter(typeof(AdminAuthFilter))]
    public class OrgAdminController: ControllerBase
    {
        private readonly ICommandBus commandBus;
        private readonly IRequestBus requestBus;
        private readonly ILogger<OrgAdminController> logger;

        public OrgAdminController(ICommandBus commandBus, IRequestBus requestBus, ILogger<OrgAdminController> logger)
        {
            this.commandBus = commandBus;
            this.requestBus = requestBus;
            this.logger = logger;
        }

        [HttpPost("confirmadmin")]
        public async Task<IActionResult> ConfirmAdmin([FromBody] ConfirmAdmin confirmAdmin) 
        {
            var started = DateTime.UtcNow;
            var requestInstanceId = Guid.NewGuid();
            var methodName = this.ControllerContext.RouteData.Values["action"].ToString();
            try
            {
                logger.LogInformation($"STARTED {methodName} {requestInstanceId} at {started} utc");

                if (confirmAdmin == null) { throw new ArgumentNullException(nameof(confirmAdmin)); }

                var result = await commandBus.ExecuteAsync(User, confirmAdmin);

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

        [HttpPost("create")]
        public async Task<IActionResult> CreateOrganisation() 
        {
            return Ok();
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateOrganisation() 
        {
            return Ok();
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteOrganisation() 
        {
            return Ok();
        }
    }
}
