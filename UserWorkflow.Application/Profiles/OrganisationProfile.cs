using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models.Organisation;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Application.Profiles
{
    public class OrganisationProfile: Profile
    {
        public OrganisationProfile()
        {
            CreateMap<SimpleOrgansiationInfo, Organisation>();
        }
    }
}
