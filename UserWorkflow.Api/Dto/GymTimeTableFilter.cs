using System.Collections.Generic;
using System.Linq;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Api.Dto
{
    public class GymTimeTableFilter
    {
        public List<DayOfTheWeek> DayOfTheWeeks { get; set; }
        public int? GetFiltrationValue()
        {
            if (DayOfTheWeeks == null || !DayOfTheWeeks.Any()) 
            {
                return null;
            }

            var result = DayOfTheWeeks.Aggregate(0, (x, y) =>
            {
                if (x == 0) x = (int)y;
                x |= (int)y;
                return x;
            });
            return result;
        }
    }
}
