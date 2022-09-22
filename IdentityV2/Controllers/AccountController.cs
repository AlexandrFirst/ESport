using IdentityV2.Dto.User;
using IdentityV2.Infrastructure.Core;
using IdentityV2.Models.AccountModels;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> Login(string returnUrl) 
        {
            if (string.IsNullOrEmpty(returnUrl)) returnUrl = "https://localhost:6001/Home/Index";

            var model = new LoginModel() { ReturnUrl = returnUrl };
            return View(model);
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

            return Redirect(loginModel.ReturnUrl);
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
