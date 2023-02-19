using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkflow.Images.Models
{
    public class UserImage: DomainImage
    {
        public int UserId { get; set; }
    }
}
