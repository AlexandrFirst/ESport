using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Commands.Gym;
using UserWorkflow.Application.Commands.OrgAdminCommands;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Application.Profiles
{
    public class GymProfile : Profile
    {
        public GymProfile()
        {
            CreateMap<GymInfo, Gym>().ForMember(x => x.Id, x => x.Ignore());
            CreateMap<GymShiftInfo, GymShift>(MemberList.None)
                .ForMember(x => x.FromTime, opt => opt.MapFrom(c => c.Start))
                .ForMember(x => x.ToTime, opt => opt.MapFrom(c => c.End))
                .ForMember(x => x.DayOfTheWeeks, opt => opt.MapFrom(c => c.DayOfTheWeek));
        }
    }
}
