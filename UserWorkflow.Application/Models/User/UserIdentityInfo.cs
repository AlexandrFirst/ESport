using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Application.Models.User
{
    public class UserIdentityInfo
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string TelephoneNumber { get; set; }
        public Guid? PhotoId { get; set; }

        public static UserIdentityInfo InitFromDbUser(UserWorkflow.Esport.Models.User user)
        {
            return new UserIdentityInfo()
            {
                UserId = user.UserId,
                Name = user.Name,
                Surname = user.Surname,
                Email = user.Email,
                TelephoneNumber = user.TelephoneNumber,
                PhotoId = user.PhotoId,
            };

        }
    }
}
