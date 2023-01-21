﻿using IdentityV2.CustomAttrubutes;
using IdentityV2.Dto.UserAvatar;
using IdentityV2.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        [HttpGet("validate")]
        [ESportIdentity]
        public IActionResult Validate([FromQuery]UserValidateNavigation userValidateNavigation)
        {
            var userClaims = UserAvatar.Claims;
            return Ok("Hello world");
        }

        [Authorize]
        [HttpGet("oclelot_validate")]
        public IActionResult OclelotValidate()
        {
            var userSlice = UserAvatar;

            var id = userSlice.Claims.Where(x => x.Type == UserClaims.Id).First();
            var name = userSlice.Claims.Where(x => x.Type == UserClaims.Name).First();
            var email = userSlice.Claims.Where(x => x.Type == UserClaims.Email).First();
            var role = userSlice.Claims.Where(x => x.Type == UserClaims.Role).First();

            var userInfo = new Dictionary<string, string>();
            userInfo.Add(UserClaims.Id, id.Value);
            userInfo.Add(UserClaims.Name, name.Value);
            userInfo.Add(UserClaims.Email, email.Value);
            userInfo.Add(UserClaims.Role, role.Value);

            return Ok(new { Claims = userInfo });
        }
    }
}
