﻿namespace UserWorkflow.Api.Dto
{
    public class TrainerTimeTableFilter: GymTimeTableFilter
    {
        public int TrainerId { get; set; }
        public int? GymId { get; set; }
    }
}