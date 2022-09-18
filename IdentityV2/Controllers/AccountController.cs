using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace IdentityV2.Controllers
{
    public class AccountController : Controller
    {
        public async Task<IActionResult> Login(string returnUrl) 
        {
            return View();
        }

        public async Task<IActionResult> Register() 
        {
            return View();
        }
    }
}
