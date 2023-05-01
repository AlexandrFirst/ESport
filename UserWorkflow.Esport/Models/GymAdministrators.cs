using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class GymAdministrators
    {
        public int Id { get; set; }
        
        public int GymId { get; set; }
        public virtual Gym Gym { get; set; }

        public int AdministratorId { get; set; }
        public virtual Administrators Administrators { get; set; }

        public bool IsConfirmed { get; set; } = false;
    }
}
