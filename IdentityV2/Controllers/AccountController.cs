using IdentityV2.Dto.User;
using IdentityV2.Infrastructure.Core;
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
        private readonly IJWTManagerRepository jwtMananager;

        public AccountController(IJWTManagerRepository jwtMananager)
        {
            this.jwtMananager = jwtMananager;
        }

        [HttpGet("Login")]
        public async Task<IActionResult> Login([FromQuery]string postBackUrl) 
        {
            if (string.IsNullOrEmpty(postBackUrl)) postBackUrl = "https://localhost:3000";

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

            var token = await jwtMananager.AuthenticateAsync(loginDto);

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

            var token = await jwtMananager.AuthenticateAsync(loginDto);
            Response.Cookies.Append("ESportCookie", token.Token);


            byte[] decodedBytes = Convert.FromBase64String(loginModel.PostBackUrl);
            var urlToRedirect = Encoding.UTF8.GetString(decodedBytes);
             
            return Redirect(urlToRedirect);
        }


        [HttpGet]
        public async Task<IActionResult> Register(string returnUrl)
        {
            var model = new RegisterModel() { ReturnUrl = returnUrl };
            return View(model);
        }

        [HttpGet]
        public async Task<IActionResult> Register() 
        {
            var model = new RegisterModel() { ReturnUrl = "google.com" };
            return View(model);
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterModel registerModel)
        {
            return View();
        }
    }
}
