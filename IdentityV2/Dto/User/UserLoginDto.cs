using System.Xml.Linq;
using System;

namespace IdentityV2.Dto.User
{
    public class UserLoginDto
    {
        public string Mail { get; set; }
        public string Password { get; set; }

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

            var input = (UserLoginDto)p;
            return (Mail == input.Mail) &&
                (Mail == input.Mail);
        }

        public override int GetHashCode()
        {
            return System.HashCode.Combine(Mail, Password);
        }
    }
}
