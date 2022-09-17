using IdentityV2.CustomAttrubutes;
using IdentityV2.Dto.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace IdentityV2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        [HttpGet("validate")]
        [ESportIdentity]
        public IActionResult Validate([FromQuery]UserValidateNavigation userValidateNavigation) 
        {
            var userClaims = User.Claims;


            return Ok("Hello world");
        }
    }
}
