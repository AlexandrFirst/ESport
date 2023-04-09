using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class Organisation
    {
        public Organisation()
        {
            Gyms = new List<Gym>();
            OrganisationAdministrators = new List<OrganisationAdministrators>();
        }

        public int Id { get; set; } 
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual List<Gym> Gyms { get; set; }
        public virtual List<OrganisationAdministrators> OrganisationAdministrators { get; set; }
    }
}
