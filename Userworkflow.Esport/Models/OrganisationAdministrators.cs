using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class OrganisationAdministrators: User
    {
        public int Id { get; set; }
        public int OrganisationId { get; set; }
        public virtual Organisation Organisation { get; set; }
    }
}
