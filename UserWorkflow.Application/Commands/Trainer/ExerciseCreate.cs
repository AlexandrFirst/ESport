﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;
using UserWorkflow.Application.Models.Exercise;

namespace UserWorkflow.Application.Commands.Trainer
{
    public class ExerciseCreate: BaseCommand
    {
        public int ExerciseId { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public int? AgeLimit { get; set; }

        public bool IsPublic { get; set; }

        public List<ExerciseTutorialInfo> exerciseInfos { get; set; }
        
        public List<int> SportIds { get; set; }
        public List<int> BodyPartIds { get; set; }
        public List<int> TraumaIds { get; set; }
    }
}