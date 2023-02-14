using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Application.Models.User
{
    public class UserTraineeInfo: UserIdentityInfo
    {
        public int Id { get; set; }
        public string Info { get; set; }
    }
}
