using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Application.Models.TimeTable
{
    public class TimeTableFilterUnit
    {
        public DayOfTheWeek DayOfTheWeek { get; set; }
        public TimeSpan From { get; set; }
        public TimeSpan To { get; set; }
    }
}
