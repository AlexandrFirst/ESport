using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Application.Extensions
{
    public static class DayOfTheWeekExtension
    {
        public static DayOfTheWeek GetMyDayOfTheWeek(this DayOfWeek dayOfWeek) 
        {
            switch (dayOfWeek)
            {
                case DayOfWeek.Sunday:
                    return DayOfTheWeek.SUNDAY;
                case DayOfWeek.Monday:
                    return DayOfTheWeek.MONDAY;
                case DayOfWeek.Tuesday:
                    return DayOfTheWeek.TUESDAY;
                case DayOfWeek.Wednesday:
                    return DayOfTheWeek.WEDNESDAY;
                case DayOfWeek.Thursday:
                    return DayOfTheWeek.THURSDAY;
                case DayOfWeek.Friday:
                    return DayOfTheWeek.FRIDAY;
                case DayOfWeek.Saturday:
                    return DayOfTheWeek.SATURDAY;
                default:
                    throw new Exception("Unknown day of teh week");
            }
        }
    }
}
