using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace UserWorkflow.Infrastructure.Paging
{
    public class Paging<T> : IPaging<T>
    {
        public async Task<ListingResult<T>> ApplyPagingAsync(IQueryable<T> query, int page = 1, int pageSize = 10, CancellationToken token = default)
        {
            if (query == null)
            {
                throw new ArgumentNullException(nameof(query));
            }

            if (page < 1)
            {
                throw new ApplicationException("Page must be greater than 0");
            }

            if (pageSize < 1)
            {
                throw new ApplicationException("Page size must be greater than 0");
            }

            int totalItems = await query.CountAsync();
            if (token.IsCancellationRequested)
            {
                return new ListingResult<T>() { WasSuccessfull = false };
            }

            var result = new ListingResult<T>
            {
                CurrentPage = page,
                Total = totalItems,
                Listing = query,
                WasSuccessfull = true
            };
            pageSize = (pageSize > totalItems) ? totalItems : pageSize;
            result.TotalPage = (totalItems > 0) ? ((int)Math.Ceiling((double) totalItems / (double)pageSize)) : 0;

            if (page > result.TotalPage) 
            {
                page= result.TotalPage;
            }

            result.CurrentPage= page;
            if (totalItems > 0) 
            {
                ListingResult<T> listingResult = result;
                listingResult.Listing = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync(token);
            }

            if (token.IsCancellationRequested) 
            {
                return new ListingResult<T>() { WasSuccessfull = false };
            }

            return result;
        }
    }
}
