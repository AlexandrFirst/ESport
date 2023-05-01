using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace StreamingService.Utils.Paging
{
    public interface IPaging<T>
    {
        Task<ListingResult<T>> ApplyPagingAsync(IQueryable<T> listing, int page = 1, int pageSize = 10, CancellationToken token = default(CancellationToken));
    }
}
