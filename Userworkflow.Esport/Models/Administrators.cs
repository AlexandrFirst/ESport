using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class Administrators: User
    {
        public Administrators()
        {
            GymAdministrators = new List<GymAdministrators>();
        }

        public int Id { get; set; }
        public virtual List<GymAdministrators> GymAdministrators { get; set; }
    }
}
