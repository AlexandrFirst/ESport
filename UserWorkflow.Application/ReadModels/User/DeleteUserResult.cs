using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Application.ReadModels.User
{
    public class DeleteUserResult
    {
        public bool IsSuccess { get; set; }
        public int EntityId { get; set; }
        public string Reason { get; set; }
        public UserTypeEntity UserTypeEntity { get; set; }
    }
}
