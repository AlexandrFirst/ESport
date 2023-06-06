using System;

namespace IdentityV2.Models.UserModels
{
    public class UserIdentityInfo
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string TelephoneNumber { get; set; }

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

            var input = (UserIdentityInfo)p;

            return (UserId == input.UserId) &&
                (Name == input.Name) &&
                (Surname == input.Surname) &&
                (Email == input.Email) &&
                (TelephoneNumber == input.TelephoneNumber);
        }

        public override int GetHashCode()
        {
            return System.HashCode.Combine(UserId, Name, Surname, Email, TelephoneNumber);
        }
    }
}
