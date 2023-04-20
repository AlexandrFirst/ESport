using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using UserWorkflow.Api.Filters;
using UserWorkflow.Application;
using UserWorkflow.Application.Commands.UserCommands;

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
            return Ok();
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
