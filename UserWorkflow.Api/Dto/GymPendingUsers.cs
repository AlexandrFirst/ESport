namespace UserWorkflow.Api.Dto
{
    public class GymPendingUsers
    {
        public int CurrentPage { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public int? ShiftId { get; set; }
    }
}
