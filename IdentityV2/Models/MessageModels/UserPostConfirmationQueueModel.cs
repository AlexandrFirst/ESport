namespace IdentityV2.Models.MessageModels
{
    public class UserPostConfirmationQueueModel
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string TelephoneNumber { get; set; }
    }
}
