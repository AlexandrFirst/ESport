using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class Gym
    {
        public Gym()
        {
            GymShifts = new List<GymShift>();
            GymAdministrators = new List<GymAdministrators>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public TimeSpan OpenTime { get; set; }
        public TimeSpan CloseTime { get; set; }

        public int? OrganisationId { get; set; }
        public virtual Organisation Organisation { get; set; }


        public virtual List<GymShift> GymShifts { get; set; }
        public virtual List<GymAdministrators> GymAdministrators { get; set; }

    }
}
