﻿using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Application.Models.Rmq
{
    public class RmqUserModel
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }

        public string Role { get; set; }
        public string Operation { get; set; }
    }
}
