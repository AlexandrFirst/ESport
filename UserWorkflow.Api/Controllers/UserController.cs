using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using UserWorkflow.Application;
using UserWorkflow.Application.Requests;

namespace UserWorkflow.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController: ControllerBase
    {
        private readonly IRquestBus requestBus;

        public UserController(IRquestBus requestBus)
        {
            this.requestBus = requestBus;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int userId) 
        {
            try
            {
                var userInfo = await requestBus.ExecuteAsync<GetUser, GetUserResult>(User, new GetUser() { Id = 2 });
                return Ok(userInfo.Data);
            }
            catch (System.Exception)
            {
                return BadRequest();
            }
        }
    }
}
