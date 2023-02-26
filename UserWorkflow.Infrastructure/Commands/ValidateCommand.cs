using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace UserWorkFlow.Infrastructure.Commands
{
    public class ValidateCommand : IValidateCommand
    {
        public List<string> Validate(ICommand command)
        {
            if(command == null) return new List<string>() { "Unable to validate an empty object"};

            var context = new ValidationContext(command, null, null);
            var validationErrors = new List<ValidationResult>();
            Validator.TryValidateObject(command, context, validationErrors, true);
            return validationErrors.Select(validationResult => validationResult.ErrorMessage).ToList();
        }
    }
}
