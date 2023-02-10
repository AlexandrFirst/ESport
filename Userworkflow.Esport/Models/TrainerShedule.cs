using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class TimeOverride
    {
        public TimeSpan From { get; set; }
        public TimeSpan To { get; set; }
        public int DayOfTheWeeks { get; set; }
    }
    public enum TrainerStatus { Pending, Active, Stopped }

    public class TrainerShedule
    {
        public TrainerShedule()
        {
            Lessons = new List<Lesson>();
        }

        public int Id { get; set; }

        public int ShiftId { get; set; }
        public virtual GymShift GymShift { get; set; }

        public int TrainerId { get; set; }
        public virtual Trainer Trainer { get; set; }

        public TrainerStatus Status { get; set; }

        public List<TimeOverride> TimeOverride { get; set; }

        public virtual List<Lesson> Lessons { get; set; }
    }
}
