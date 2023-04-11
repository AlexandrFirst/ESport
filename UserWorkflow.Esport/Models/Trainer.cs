﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public class Trainer: User
    {
        public Trainer()
        {
            TraineeShedules = new List<TrainerShedule>();
            TrainerSports = new List<TrainerSport>();
            FoodDiets= new List<FoodDiet>();
        }
        [Key]
        public int Id { get; set; }
      
        public string Info { get; set; }

        public virtual List<TrainerShedule> TraineeShedules { get; set; }
        public virtual List<TrainerSport> TrainerSports { get; set; }
        public virtual List<FoodDiet> FoodDiets { get; set; }

        [NotMapped]
        public override UserTypeEntity GetUserType => UserTypeEntity.Trainer;
    }
}