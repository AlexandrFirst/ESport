using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    [Index(nameof(Name), IsUnique = true)]
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
