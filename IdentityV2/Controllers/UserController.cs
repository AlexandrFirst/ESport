using IdentityV2.CustomAttrubutes;
using IdentityV2.Data;
using IdentityV2.Dto.User;
using IdentityV2.Models.UserModels;
using IdentityV2.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace IdentityV2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IdentityDataContext context;

        public UserController(IdentityDataContext context)
        {
            this.context = context;
        }

        [HttpGet("{id}")]
        [Authorize(Policy = "UserFlowPolicy")]
        public async Task<IActionResult> GetUserInfo(int id) 
        {
            if (id < 1) 
            {
                throw new ApplicationException($"User Id: {id} is invalid");
            }

            var userInfo = await context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (userInfo == null) 
            {
                throw new ApplicationException($"User with id: {id} is not found");
            }

            UserIdentityInfo userDataToReturn = new UserIdentityInfo()
            {
                Email= userInfo.Email,
                Name=userInfo.Name,
                Surname=userInfo.Surname,
                TelephoneNumber=userInfo.TelephoneNumber,
                UserId = id
            };

            return Ok(userDataToReturn);
        }

        [ESportIdentity]
        [HttpGet("validate")]
        public IActionResult Validate([FromQuery]UserValidateNavigation userValidateNavigation)
        {
            var userClaims = User.Claims;
            return Ok("Hello world");
        }

        [Authorize]
        [HttpGet("oclelot_validate")]
        public IActionResult OclelotValidate()
        {
            var user = User;

            var id = user.Claims.Where(x => x.Type == UserClaims.Id).First();
            var name = user.Claims.Where(x => x.Type == UserClaims.Name).First();
            var email = user.Claims.Where(x => x.Type == UserClaims.Email).First();
            var role = user.Claims.Where(x => x.Type == UserClaims.Role).First();

            var userInfo = new Dictionary<string, string>
            {
                { UserClaims.Id, id.Value },
                { UserClaims.Name, name.Value },
                { UserClaims.Email, email.Value },
                { UserClaims.Role, role.Value }
            };

            return Ok(new { Claims = userInfo });
        }
    }
}
