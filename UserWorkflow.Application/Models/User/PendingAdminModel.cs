using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Application.Models.User
{
    public class PendingAdminModel
    {
        public int AdminId { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Description { get; set; }
    }
}
