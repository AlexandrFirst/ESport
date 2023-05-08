using UserWorkflow.Application.Commands.User;
using UserWorkflow.Application.Extensions;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Api.Dto
{
  
    public class UpdateUserDto
    {
        public UpdateAdmin UpdateAdminInfo { get; set; }
        public UpdateOrganisationAdmin UpdateOrganisationAdminInfo { get; set; }
        public UpdateTrainee UpdateTraineeInfo { get; set; }
        public UpdateTrainer UpdateTrainerInfo { get; set; }

        public void SetUserId(int userId)
        {
            if (IsAdminUpdate) UpdateAdminInfo.UpdateUserInfo.UserId = userId;
            if (IsOrganiserUpdate) UpdateOrganisationAdminInfo.UpdateUserInfo.UserId = userId;
            if (IsTraineeUpdate) UpdateTraineeInfo.UpdateUserInfo.UserId = userId;
            if (IsTrainerUpdate) UpdateTrainerInfo.UpdateUserInfo.UserId = userId;
        }

        public bool IsAdminUpdate
        {
            get => GetUpdateMode.Contains(UserTypeEntity.Admin);
        }

        public bool IsOrganiserUpdate
        {
            get => GetUpdateMode.Contains(UserTypeEntity.Organisator);
        }

        public bool IsTraineeUpdate
        {
            get => GetUpdateMode.Contains(UserTypeEntity.Trainee);
        }

        public bool IsTrainerUpdate
        {
            get => GetUpdateMode.Contains(UserTypeEntity.Trainer);
        }

        private UserTypeEntity GetUpdateMode
        {
            get
            {
                var mode = UserTypeEntity.None;

                if (UpdateAdminInfo != null) mode |= UserTypeEntity.Admin;
                if (UpdateOrganisationAdminInfo != null) mode |= UserTypeEntity.Organisator;
                if (UpdateTraineeInfo != null) mode |= UserTypeEntity.Trainee;
                if (UpdateTrainerInfo != null) mode |= UserTypeEntity.Trainer;

                return mode;
            }
        }
    }
}
