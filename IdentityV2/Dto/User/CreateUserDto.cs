using System.ComponentModel.DataAnnotations;

namespace IdentityV2.Dto.UserAvatar
{
    public class CreateUserDto: UserDto
    {
        [Required(ErrorMessage = "Password is required")]
        [StringLength(255, ErrorMessage = "Must be between 5 and 255 characters", MinimumLength = 5)]
        [RegularExpression("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", ErrorMessage = "Password must have 8 characters in length; " +
            "at least one uppercase English letter; at least one lowercase English letter; at least one digit; at least one special character")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Confirm Password is required")]
        [Compare(nameof(Password), ErrorMessage ="Confirm password is not the same")]
        public string ConfirmPassword { get; set; }
    }
}
