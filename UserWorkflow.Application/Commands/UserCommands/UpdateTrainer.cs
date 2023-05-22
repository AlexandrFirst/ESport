using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;
using UserWorkflow.Application.Models;
using UserWorkflow.Application.ReadModels.User;

namespace UserWorkflow.Application.Commands.User
{
    public class UpdateTrainer : BaseCommand
    {
        public UpdateUserInfo UpdateUserInfo { get; set; }
        public List<TrainerSportInfo> TrainerSportInfoIds { get; set; }
    }

    public class TrainerSportInfo 
    {
        public int SportId { get; set; }
        public DateTime From { get; set; }  
        public DateTime? To { get; set; }
        public string Level { get; set; }
    }
}
