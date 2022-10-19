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
    public class AccountController : Controller
    {
        private readonly IAccountService accountService;

        public AccountController(IAccountService accountService)
        {
            this.accountService = accountService;
        }

        [HttpGet("Login")]
        public IActionResult Login([FromQuery]string postBackUrl) 
        {
            if (string.IsNullOrEmpty(postBackUrl)) postBackUrl = "https://localhost:3000"; //TODO: set landing page

            var model = new LoginModel() { PostBackUrl = postBackUrl };
            return View(model);
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
            Response.Cookies.Append("ESportCookie", token.Token, new Microsoft.AspNetCore.Http.CookieOptions()
            {
                HttpOnly = true
            });

            return Ok(token);
        }


        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromForm] LoginModel loginModel)
        {
            var loginDto = new UserLoginDto()
            {
                Mail = loginModel.Mail,
                Password = loginModel.Password
            };

            var token = await accountService.Login(loginDto);
            if (token == null) 
            {
                return Redirect(nameof(Login));
            }
            Response.Cookies.Append("ESportCookie", token.Token, new Microsoft.AspNetCore.Http.CookieOptions() 
            {
                HttpOnly = true
            });


            byte[] decodedBytes = Convert.FromBase64String(loginModel.PostBackUrl);
            var urlToRedirect = Encoding.UTF8.GetString(decodedBytes);
             
            return Redirect(urlToRedirect);
        }


        [HttpGet]
        public IActionResult Register([FromQuery]string postBackUrl)
        {
            if (string.IsNullOrEmpty(postBackUrl)) postBackUrl = "https://localhost:3000";            
            var model = new RegisterModel() { PostBackUrl = postBackUrl };

            return View(model);
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel registerModel)
        {
            var registrationResult = await accountService.Register(registerModel);
            return Ok(registrationResult);
        }
    }
}
