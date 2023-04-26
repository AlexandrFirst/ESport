using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Commands.OrgAdminCommands;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Application.Profiles
{
    public class GymProfile : Profile
    {
        public GymProfile()
        {
            CreateMap<GymInfo, Gym>().ForMember(x => x.Id, x => x.Ignore());
        }
    }
}
