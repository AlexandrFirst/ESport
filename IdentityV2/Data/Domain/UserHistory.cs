using System;

namespace IdentityV2.Data.Domain
{
    public class UserHistory
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public DateTime VisitTime { get; set; }
        public virtual User User { get; set; }
    }
}
