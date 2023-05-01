using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Infrastructure.Paging
{
    public class ListingResult<T>
    {
        public IEnumerable<T> Listing { get; set; }
        public int CurrentPage { get; set; }
        public int TotalPage { get; set; }
        public int Total { get; set; }
        public bool WasSuccessfull { get; set; }
    }
}
