using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class OrganisationAdministrators: User
    {
        [Key]
        public int Id { get; set; }
        public int OrganisationId { get; set; }
        public virtual Organisation Organisation { get; set; }
        public bool IsConfirmed { get; set; } = false;

        [NotMapped]
        public override UserTypeEntity GetUserType => UserTypeEntity.Organisator;
    }
}
