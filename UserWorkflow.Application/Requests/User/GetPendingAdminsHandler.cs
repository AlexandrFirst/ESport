using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models.User;
using UserWorkflow.Esport;
using UserWorkflow.Esport.Models;
using UserWorkflow.Infrastructure.Paging;
using UserWorkFlow.Infrastructure.Queries;

namespace UserWorkflow.Application.Requests.User
{
    public class GetPendingAdminsHandler : IRequestHandler<GetPendingAdmins, GetPendingAdminsResult>
    {
        private readonly EsportDataContext context;
        private readonly IPaging<OrganisationAdministrators> organisationAdministartorPaging;
        private readonly IPaging<GymAdministrators> gymAdministartorPaging;

        public GetPendingAdminsHandler(EsportDataContext context,
            IPaging<OrganisationAdministrators> organisationAdministartorPaging,
            IPaging<GymAdministrators> gymAdministartorPaging)
        {
            this.context = context;
            this.organisationAdministartorPaging = organisationAdministartorPaging;
            this.gymAdministartorPaging = gymAdministartorPaging;
        }

        public async Task<RequestResult<GetPendingAdminsResult>> HandleQueryAsync(GetPendingAdmins request)
        {
            var userId = request.AuthenticatedBy?.UserId;
            if (userId == null)
            {
                throw new ApplicationException("Unknown request user");
            }
            var currentOrganisationAdministrator = await context.OrganisationAdministrators.FirstOrDefaultAsync(x => x.UserId == userId);
            if (currentOrganisationAdministrator == null)
            {
                throw new ApplicationException("No organisation administrator with id: " + userId + " is found");
            }

            if (request.AdminType == AdminType.OrgAdmin)
            {
                var pendingOrganisationAdministartorsQuery = context.OrganisationAdministrators
                    .Where(x => x.OrganisationId == currentOrganisationAdministrator.OrganisationId && x.IsConfirmed == false);
                var result = await organisationAdministartorPaging.ApplyPagingAsync(pendingOrganisationAdministartorsQuery, request.Page, request.PageSize);

                var adminListing = result.Listing.Select(x => new PendingAdminModel()
                {
                    AdminId = x.Id,
                    UserId = x.UserId,
                    Description = x.Email,
                    Username = x.Name + " " + x.Surname
                }).ToList();

                return new RequestResult<GetPendingAdminsResult>(new GetPendingAdminsResult()
                {
                    Page = result.CurrentPage,
                    PendingAdminModels = adminListing,
                    TotalItems = result.Total,
                    TotalPages = result.TotalPage
                });
            }
            else if (request.AdminType == AdminType.GymAdmin)
            {
                var pendingGymOrganistors = context.GymAdministrators
                    .Where(x => x.Gym.OrganisationId == currentOrganisationAdministrator.OrganisationId && x.IsConfirmed == false);
                if (request.GymId.HasValue) 
                {
                    pendingGymOrganistors = pendingGymOrganistors.Where(x => x.GymId == request.GymId);
                }
                var result = await gymAdministartorPaging.ApplyPagingAsync(pendingGymOrganistors, request.Page, request.PageSize);


                var adminListing = result.Listing.Select(x => new PendingAdminModel()
                {
                    AdminId = x.Id,
                    UserId = x.Administrators.UserId,
                    Description = x.Administrators.Email,
                    Username = x.Administrators.Name + " " + x.Administrators.Surname
                }).ToList();

                return new RequestResult<GetPendingAdminsResult>(new GetPendingAdminsResult()
                {
                    Page = result.CurrentPage,
                    PendingAdminModels = adminListing,
                    TotalItems = result.Total,
                    TotalPages = result.TotalPage
                });
            }
            else {
                throw new ApplicationException("Wrong admin type is passed: " + request.AdminType);
            }
        }
    }
}
