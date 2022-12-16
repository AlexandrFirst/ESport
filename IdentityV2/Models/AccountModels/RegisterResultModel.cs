using System.Collections.Generic;

namespace IdentityV2.Models.AccountModels
{
    public class RegisterResultModel
    {
        public bool IsSuccess { get; set; }
        public List<string> Error { get; set; }
    }
}
