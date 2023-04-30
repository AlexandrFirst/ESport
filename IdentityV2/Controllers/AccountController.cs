using IdentityV2.Dto.User;
using IdentityV2.Infrastructure.Core;
using IdentityV2.Infrastructure.Implementation;
using IdentityV2.Models.AccountModels;
using IdentityV2.Utils;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IdentityV2.Controllers
{

    [Controller]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService accountService;

        public AccountController(IAccountService accountService)
        {
            this.accountService = accountService;
        }

        [HttpPost("ApiLogin")]
        public async Task<IActionResult> ApiLogin([FromBody] LoginModel loginModel)
        {
            var loginDto = new UserLoginDto()
            {
                Mail = loginModel.Mail,
                Password = loginModel.Password
            };
            
            var token = await accountService.Login(loginDto);
            if (token == null) { return BadRequest(new { Message = "Login or password is incorrect"}); }
            
            Response.Headers.Add("access-control-expose-headers", "Set-Cookie");
            Response.Headers.Add("Access-Control-Allow-Credentials", "true");
            
            Response.Cookies.Append("ESportCookie", token.Token, new Microsoft.AspNetCore.Http.CookieOptions()
            {
                Path = "/",
                IsEssential = false,
                Expires = DateTime.Now.AddMonths(1),
                SameSite = Microsoft.AspNetCore.Http.SameSiteMode.None,
                Secure = true,
                HttpOnly = false
            });

            return Ok(token);
        }


        [Authorize]
        [RequireHttps]
        [HttpPost("ApiLogout")]
        public async Task<IActionResult> ApiLogout() 
        {
            var userIdClaim = User.Claims.FirstOrDefault(x => x.Type == UserClaims.Id);
            if (userIdClaim == null) { return BadRequest(new { Message = "USer is not logged in" }); }
                
            var userId = int.Parse(userIdClaim.Value);
            await accountService.Logout(userId);
            return Ok();
        }

        [HttpGet("Confirm")]
        public async Task<IActionResult> ConfirmRegistration(string token)
        {
            var validationResult = await accountService.ConfirmRegistration(token);
            if (validationResult)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut("UpdateMainProfile")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserProfile updateUserProfile) 
        {
            var userAccountUpdated = await accountService.UpdateUserProfile(updateUserProfile);
            if (userAccountUpdated)
            {
                return Ok(new { Message = "User updated successfully" });
            }
            else 
            {
                return BadRequest(new {Message = "Fail during user update"});
            }
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel registerModel)
        {
            var registrationResult = await accountService.Register(registerModel);
            return Ok(registrationResult);
        }
    }
}
