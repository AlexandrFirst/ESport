﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;

namespace UserWorkflow.Application.Commands.Trainee
{
    public class ApplyForLesson: BaseCommand
    {
        public int LessonId { get; set; }
    }
}
