using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using UserWorkflow.Application.Models.Rmq;
using UserWorkflow.Application.Models.User;
using UserWorkflow.Application.ReadModels;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Application.Profiles
{
    public class UserProfile: Profile
    {
        public UserProfile()
        {
            CreateMap<User, RmqUserModel>();
            CreateMap<User, UserInfo>().ReverseMap();
        }
    }
}
