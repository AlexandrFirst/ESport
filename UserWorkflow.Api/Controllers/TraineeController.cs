using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using UserWorkflow.Application;

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
    }
}
