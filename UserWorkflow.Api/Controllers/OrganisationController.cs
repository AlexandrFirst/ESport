using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net;
using System;
using System.Threading.Tasks;
using UserWorkflow.Application;
using UserWorkflow.Application.Models.Organisation;
using UserWorkflow.Application.Requests.Gym;
using UserWorkflow.Application.Requests.Organisation;

namespace UserWorkflow.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class OrganisationController: ControllerBase
    {
        private readonly ICommandBus commandBus;
        private readonly IRequestBus requestBus;
        private readonly ILogger<OrganisationController> logger;

        public OrganisationController(ICommandBus commandBus, IRequestBus requestBus, ILogger<OrganisationController> logger)
        {
            this.commandBus = commandBus;
            this.requestBus = requestBus;
            this.logger = logger;
        }

        [HttpPost("organisationListing")]
        public async Task<IActionResult> GetOrganisationListing([FromBody] OrganisationInfoFiltration organisationInfoFiltration) 
        {
            var started = DateTime.UtcNow;
            var requestInstanceId = Guid.NewGuid();
            var methodName = this.ControllerContext.RouteData.Values["action"].ToString();

            try
            {
                logger.LogInformation($"STARTED {methodName} {requestInstanceId} at {started} utc");

                var result = await requestBus.ExecuteAsync<GetOrganisationListing, GetOrganisationListingResult>(User, new GetOrganisationListing() { OrganisationFiltration = organisationInfoFiltration });

                if (!result.Succeeded)
                    return BadRequest(result.Errors);

                return Ok(result.Data.OrganisationInfoListing);
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
