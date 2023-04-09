using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class Administrators: User
    {
        public Administrators()
        {
            GymAdministrators = new List<GymAdministrators>();
        }
        [Key]
        public int Id { get; set; }
        public virtual List<GymAdministrators> GymAdministrators { get; set; }

        [NotMapped]
        public override UserTypeEntity GetUserType => UserTypeEntity.Admin;
    }
}
