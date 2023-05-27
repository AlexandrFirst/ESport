using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Application.Models.Trauma
{
    public class TraumaHistoryRecord
    {
        public int TraumaId { get; set; }
        public DateTime From { get; set; }
        public DateTime? To { get; set; }
    }
}
