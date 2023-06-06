using System.Xml.Linq;
using System;

namespace IdentityV2.Models
{
    public class Tokens
    {
        public int UserId { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; }

        public override bool Equals(object p)
        {
            if (p is null)
            {
                return false;
            }

            if (Object.ReferenceEquals(this, p))
            {
                return true;
            }


            if (this.GetType() != p.GetType())
            {
                return false;
            }

            var input = (Tokens)p;
            return (UserId == input.UserId) &&
                (Token == input.Token) &&
                (RefreshToken == input.RefreshToken);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(UserId, Token, RefreshToken);
        }
    }
}
