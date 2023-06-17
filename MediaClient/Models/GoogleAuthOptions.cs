using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediaClient.Models
{
    public class GoogleAuthOptions
    {
        public string CredentialPath { get; set; }
        public string GoogleId { get; set; }
        public string GoogleCaptchaSecret { get; set; }
    }
}
