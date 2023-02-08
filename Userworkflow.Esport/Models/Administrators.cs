using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class Administrators
    {
        public Administrators()
        {
            GymAdministrators = new List<GymAdministrators>();
        }

        public int Id { get; set; }
        public int UserId { get; set; }
        public Guid? PhotoId { get; set; }

        public virtual List<GymAdministrators> GymAdministrators { get; set; }
    }
}
