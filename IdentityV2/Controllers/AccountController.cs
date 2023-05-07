using Castle.Core.Logging;
using IdentityV2.Dto.User;
using IdentityV2.Infrastructure.Core;
using IdentityV2.Infrastructure.Implementation;
using IdentityV2.Models.AccountModels;
using IdentityV2.Models.UserModels;
using IdentityV2.Utils;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
        private readonly ILogger<AccountController> logger;

        public AccountController(IAccountService accountService, ILogger<AccountController> logger)
        {
            this.accountService = accountService;
            this.logger = logger;
        }

        [HttpPost("ApiLogin")]
        [EnableCors("ESportCors")]
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
        [HttpPost("ApiLogout")]
        [EnableCors("ESportCors")]
        public async Task<IActionResult> ApiLogout() 
        {
            var userIdClaim = User.Claims.FirstOrDefault(x => x.Type == UserClaims.Id);
            if (userIdClaim == null) { return BadRequest(new { Message = "User is not logged in" }); }
                
            var userId = int.Parse(userIdClaim.Value);
            await accountService.Logout(userId);
            return Ok();
        }

        [Authorize]
        //[RequireHttps]
        [HttpGet("info")]
        [EnableCors("ESportCors")]
        public IActionResult CurrentUserInfo() 
        {
            var user = User;

            if (User?.Claims?.Any() != true) 
            {
                return BadRequest(new { Message = "Invalid user data" });
            }

            try
            {
                var id = user.Claims.Where(x => x.Type == UserClaims.Id).First();
                var name = user.Claims.Where(x => x.Type == UserClaims.Name).First();
                var email = user.Claims.Where(x => x.Type == UserClaims.Email).First();
                var role = user.Claims.Where(x => x.Type == UserClaims.Role).First();

                var userCredInfo = new UserCredentialInfo() 
                {
                    Email = email.Value,
                    Id = id.Value,
                    Name= name.Value,
                    Role=role.Value,
                };

                
                return Ok(userCredInfo);
            }
            catch (Exception ex) 
            {
                logger.LogError(ex.Message + "|" + ex.InnerException.Message);
                return BadRequest(new { Message = "Unable to get user info" });
            }
        }

        [HttpGet("Confirm")]
        [EnableCors("ESportCors")]
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

        [HttpPost("UpdateMainProfile")]
        [EnableCors("UserFlowPolicy")]
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
        [EnableCors("ESportCors")]
        public async Task<IActionResult> Register([FromBody] RegisterModel registerModel)
        {
            var registrationResult = await accountService.Register(registerModel);
            return Ok(registrationResult);
        }
    }
}
