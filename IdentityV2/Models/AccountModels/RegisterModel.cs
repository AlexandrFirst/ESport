﻿namespace IdentityV2.Models.AccountModels
{
    public class RegisterModel
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string TelephoneNumber { get; set; }
        public string Password { get; set; }
        public string RepeatPassword { get; set; }
        public string ReturnUrl { get; set; }
    }
}