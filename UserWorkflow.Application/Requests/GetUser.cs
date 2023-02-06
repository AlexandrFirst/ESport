using System;
using System.Collections.Generic;
using System.Text;
using UserWorkflow.Application.Base;

namespace UserWorkflow.Application.Requests
{
    public class GetUser: BaseRequest
    {
        public int Id { get; set; } 
    }

    public class GetUserResult 
    {
        public string Name { get; set; }    
        public int Id { get; set; }
    }
}
