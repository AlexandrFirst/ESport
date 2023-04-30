﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Base;
using UserWorkflow.Application.Models.User;

namespace UserWorkflow.Application.Requests.User
{
    public enum AdminType { OrgAdmin, GymAdmin }
    public class GetPendingAdmins : BaseRequest
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public AdminType AdminType { get; set; }
    }

    public class GetPendingAdminsResult
    {
        public List<PendingAdminModel> PendingAdminModels { get; set; }
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int TotalItems { get; set; }
    }
}