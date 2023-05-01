using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;
using UserWorkflow.Application.Models.Organisation;

namespace UserWorkflow.Application.Commands.OrgAdminCommands
{
    public class UpdateOrganisation : BaseCommand
    {
        public int OrganisationId { get; set; }
        [Required]
        public SimpleOrgansiationInfo OrganisationInfo { get; set; }
        public List<GymInfo> OrganisationGyms { get; set; }
    }

    public class GymInfo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public TimeSpan OpenTime { get; set; }
        public TimeSpan CloseTime { get; set; }
    }
}
