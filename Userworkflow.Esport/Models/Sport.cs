using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public enum SportType { Fighting, Endurance, Strength, Power, Team}

    public class Sport
    {
        public Sport()
        {
            ExerciseSports = new List<ExerciseSport>();
            AnswerSports= new List<AnswerSport>();
            TrainerSports= new List<TrainerSport>();
        }

        public int Id { get; set; }
        public SportType Type { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual List<ExerciseSport> ExerciseSports { get; set; }
        public virtual List<AnswerSport> AnswerSports { get; set; }
        public virtual List<TrainerSport> TrainerSports { get; set; }
    }
}
