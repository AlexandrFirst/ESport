﻿using System.ComponentModel.DataAnnotations;

namespace IdentityV2.Dto.User
{
    public class UserDto
    {
        [Required(ErrorMessage = "Name is required")]
        [RegularExpression("^[a-zA-Z ']+$", ErrorMessage = "Name is required and must be properly formatted.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Surname is required")]
        [RegularExpression("^[a-zA-Z ']+$", ErrorMessage = "Surname is required and must be properly formatted.")]
        public string Surname { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [RegularExpression("^[A-Za-z0-9._%+-]*@[A-Za-z0-9.-]*\\.[A-Za-z0-9-]{2,}$", ErrorMessage = "Email is required and must be properly formatted.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Telephone is required")]
        [RegularExpression("^(?:\\+38)?(?:\\(044\\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[0-9]{7})$", 
            ErrorMessage = "Telephone is required and must be properly formatted.")]
        public string TelephoneNumber { get; set; }
        public string ProfileImageUrl { get; set; }
    }
}
