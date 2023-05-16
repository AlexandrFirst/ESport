using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Application.Models.Base
{
    public class BaseListing
    {
        public int Page { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
    }
}
