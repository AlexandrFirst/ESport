using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models.Gym;
using UserWorkflow.Application.Models.Organisation;
using UserWorkflow.Application.Services.Gym;
using UserWorkflow.Esport;
using UserWorkflow.Esport.Models;
using UserWorkflow.Infrastructure.Paging;

namespace UserWorkflow.Application.Services.Organisation
{
    public class OrganisationService : IOrganisationService
    {
        private readonly IGymService gymService;
        private readonly EsportDataContext esportDataContext;
        private readonly IPaging<Esport.Models.Organisation> organisationPaging;

        public OrganisationService(IGymService gymService,
            EsportDataContext esportDataContext, IPaging<Esport.Models.Organisation> organisationPaging)
        {
            this.gymService = gymService;
            this.esportDataContext = esportDataContext;
            this.organisationPaging = organisationPaging;
        }

        public async Task<OrganisationInfoListing> GetOrganisationListing(OrganisationInfoFiltration organisationInfoFiltration)
        {
            var organisationQuery = esportDataContext.Organisations.AsQueryable();
            if (organisationInfoFiltration.OrganisationIds.Any())
            {
                organisationQuery = organisationQuery.Where(x => organisationInfoFiltration.OrganisationIds.Any(p => p == x.Id));
            }

            if (!string.IsNullOrEmpty(organisationInfoFiltration.Name))
            {
                organisationQuery = organisationQuery.Where(x => x.Name.StartsWith(organisationInfoFiltration.Name));
            }

            var organisationQueryResult = await organisationPaging.ApplyPagingAsync(organisationQuery);
            var gymInfoListings = new List<(int organisationId, GymInfoListing gymInfoListing)>();

            foreach (var organisationId in organisationQueryResult.Listing.Select(x => x.Id))
            {
                var gymOrganisation = await gymService.GetGymInfoListing(new GymFiltrattionModel()
                {
                    OrganisationIds = new List<int>() { organisationId },
                    Page = 1,
                    PageSize = 10
                });
                gymInfoListings.Add((organisationId, gymOrganisation));
            }

            var organisationQueryListing = organisationQueryResult.Listing.Select(x =>
            {
                var gymInfo = gymInfoListings.FirstOrDefault(d => d.organisationId == x.Id);

                return new OrganisationInfoReadModel()
                {
                    Name = x.Name,
                    Address = x.Description,
                    OrganisationId = x.Id,
                    OrganisationAdministartors = x.OrganisationAdministrators.Select(o => new OrganisationAdministartorReadModel()
                    {
                        Id = o.Id,
                        Name = o.Name,
                    }).ToList(),
                    OrganisationGymInfos = gymInfo == default((int organisationId, GymInfoListing gymInfoListing)) ?
                        new List<GymReadInfo>() :
                        gymInfo.gymInfoListing.GymReadInfos
                };
            }).ToList();

            return new OrganisationInfoListing()
            {
                OrganisatationInfoListing = organisationQueryListing,
                Page = organisationQueryResult.CurrentPage
            };

        }
    }
}
