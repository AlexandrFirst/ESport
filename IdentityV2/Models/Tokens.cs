namespace IdentityV2.Models
{
    public class Tokens
    {
        public int UserId { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}
