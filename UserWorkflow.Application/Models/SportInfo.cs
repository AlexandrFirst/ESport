using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Application.Models
{
    public class SportInfo
    {
        public int SportId { get; set; }
        public string SportName { get; set; }
        public string SportDescription { get; set;}
        public SportType SportType { get; set; }
    }
}
