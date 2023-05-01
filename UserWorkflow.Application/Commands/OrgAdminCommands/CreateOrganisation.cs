using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;

namespace UserWorkflow.Application.Commands.OrgAdminCommands
{
    public class CreateOrganisation : BaseCommand
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
