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
    public class UpdateOrganisationAdmin : BaseCommand
    {
        [Required]
        public UpdateUserInfo UpdateUserInfo { get; set; }
        [Required]
        public int OrganisationId { get; set; }
    }
}
