using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace UserWorkflow.Application.Models.Organisation
{
    public class SimpleOrgansiationInfo
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public List<string> Validate() 
        {
            var orgInfoValidationContext = new ValidationContext(this);
            var errorList = new List<ValidationResult>();
            Validator.TryValidateObject(this, orgInfoValidationContext, errorList, true);

            return errorList.Select(x => x.ErrorMessage).ToList();
        }
    }
}
