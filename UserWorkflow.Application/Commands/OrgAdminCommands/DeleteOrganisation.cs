using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;

namespace UserWorkflow.Application.Commands.OrgAdminCommands
{
    public class DeleteOrganisation: BaseCommand
    {
        public int OrganisationId { get; set; }
    }
}
