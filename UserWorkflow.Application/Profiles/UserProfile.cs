using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using UserWorkflow.Application.Models;
using UserWorkflow.Application.Models.User;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Application.Profiles
{
    public class UserProfile: Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserModel>();
        }
    }
}
