using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Windows.Input;
using UserWorkflow.Application;

namespace UserWorkflow.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController: ControllerBase
    {
        private readonly ICommandBus commandBus;
        private readonly IRequestBus requestBus;

        public UserController(ICommandBus commandBus, IRequestBus requestBus)
        {
            this.commandBus = commandBus;
            this.requestBus = requestBus;
        }


        //public async Task<IActionResult>

    }
}
