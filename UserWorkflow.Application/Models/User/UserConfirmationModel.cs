using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Application.Models.User
{
    public class UserConfirmationModel
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public string Email { get; set; }
    }
}
