using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;
using UserWorkflow.Application.ReadModels;

namespace UserWorkflow.Application.Commands.User
{
    public class UpdateAdmin : BaseCommand
    {
        [Required]
        public UpdateUserInfo CreateUserInfo { get; set; }
        [Required]
        public List<int> GymId { get; set; }
    }
}
