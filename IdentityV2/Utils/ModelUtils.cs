using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IdentityV2.Utils
{
    public static class ModelUtils
    {
        public static bool Validate<T>(T obj, out ICollection<ValidationResult> results)
        {
            results = new List<ValidationResult>();

            return Validator.TryValidateObject(obj, new ValidationContext(obj), results, true);
        }
    }
}
