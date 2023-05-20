using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Commands.User;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Application.Profiles
{
    public class TrainerProfile: Profile
    {
        public TrainerProfile()
        {
            CreateMap<TrainerSportInfo, TrainerSport>()
                .ForMember(x => x.ToDate, opt => opt.MapFrom(x => x.To))
                .ForMember(x => x.FromDate, opt => opt.MapFrom(x => x.From))
                .ForMember(x => x.IsConfirmed, opt => opt.Ignore());
        }
    }
}
