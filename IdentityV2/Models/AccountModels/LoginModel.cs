namespace IdentityV2.Models.AccountModels
{
    public class LoginModel
    {
        public string Mail { get; set; }
        public string Password { get; set; }
        public bool RememberMe { get; set; }
        public string ReturnUrl { get; set; }
    }
}
