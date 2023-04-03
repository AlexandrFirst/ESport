using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace UserWorkflow.Esport.Models
{
    public enum UserTypeEntity
    {
        None = 0, Trainee = 1, Trainer = 2, Organisator = 4, Admin = 8
    }

    public class User
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string TelephoneNumber { get; set; }
        public Guid? PhotoId { get; set; }
        public bool IsProfileConfirmed { get; set; } = true;

        [NotMapped]
        public virtual UserTypeEntity GetUserType { get => UserTypeEntity.None; }
    }
}
