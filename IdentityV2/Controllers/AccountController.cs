using IdentityV2.Dto.User;
using IdentityV2.Infrastructure.Core;
using IdentityV2.Infrastructure.Implementation;
using IdentityV2.Models.AccountModels;
using Microsoft.AspNetCore.Mvc;
using System;
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
            Console.WriteLine("sdsd");
            var token = await accountService.Login(loginDto);
            Response.Headers.Add("access-control-expose-headers", "Set-Cookie");
            Response.Headers.Add("Access-Control-Allow-Credentials", "true");
            Response.Cookies.Append("ESportCookie", token.Token, new Microsoft.AspNetCore.Http.CookieOptions()
            {
                Path = "/",
                IsEssential = true,
                Expires = DateTime.Now.AddMonths(1),
                SameSite = Microsoft.AspNetCore.Http.SameSiteMode.None,
                Secure = true
            });

            return Ok(token);
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

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel registerModel)
        {
            var registrationResult = await accountService.Register(registerModel);
            return Ok(registrationResult);
        }
    }
}
