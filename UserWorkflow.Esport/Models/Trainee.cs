using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class Trainee: User
    {
        public Trainee()
        {
            TraineeAnswers= new List<TraineeAnswers>();
            TraineeShedules = new List<TraineeShedule>();
        }

        [Key]
        public int Id { get; set; }
        public string Info { get; set; }
        
        public virtual List<TraineeAnswers> TraineeAnswers { get; set; }
        public virtual List<TraineeShedule> TraineeShedules { get; set; }

        [NotMapped]
        public override UserTypeEntity GetUserType => UserTypeEntity.Trainee;
    }
}
