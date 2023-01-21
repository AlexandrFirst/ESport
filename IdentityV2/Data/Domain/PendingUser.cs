using System;

namespace IdentityV2.Data.Domain
{
    public class PendingUser
    {
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public Guid PendingToken { get; set; }
        public DateTime PendingDateEnd { get; set; }
    }
}
