using System;

namespace IdentityV2.Data.Domain
{
    public class PendingUser
    {
        public int UserId { get; set; }
        public virtual UserAvatar UserAvatar { get; set; }
        public Guid PendingToken { get; set; }
        public DateTime PendingDateEnd { get; set; }
    }
}
