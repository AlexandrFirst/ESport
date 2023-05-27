using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models.Gym;
using UserWorkflow.Esport;
using UserWorkflow.Esport.Models;
using UserWorkflow.Infrastructure.Paging;

namespace UserWorkflow.Application.Services.Gym
{
    public class GymService : IGymService
    {
        private readonly EsportDataContext esportDataContext;
        private readonly IPaging<Esport.Models.Gym> gymPaging;

        public GymService(EsportDataContext esportDataContext, IPaging<Esport.Models.Gym> gymPaging)
        {
            this.esportDataContext = esportDataContext;
            this.gymPaging = gymPaging;
        }

        public async Task<GymInfoListing> GetGymInfoListing(GymFiltrattionModel gymFiltrattionModel)
        {
            var gymQuery = esportDataContext.Gyms.AsQueryable();
            if (gymFiltrattionModel.GymIds.Any())
            {
                var gymIds = gymFiltrattionModel.GymIds;
                gymQuery = gymQuery.Where(x => gymIds.Any(y => y == x.Id));
            }

            if (gymFiltrattionModel.OrganisationIds.Any())
            {
                var organisationIds = gymFiltrattionModel.OrganisationIds;
                gymQuery = gymQuery.Where(x => x.OrganisationId.HasValue && organisationIds.Contains(x.OrganisationId.Value));
            }

            if (gymFiltrattionModel.OpenHour.HasValue)
            {
                gymQuery = gymQuery.Where(x => x.OpenTime >= gymFiltrattionModel.OpenHour.Value);
            }

            if (gymFiltrattionModel.CloseHour.HasValue)
            {
                gymQuery = gymQuery.Where(x => x.CloseTime <= gymFiltrattionModel.CloseHour.Value);
            }

            if (!string.IsNullOrEmpty(gymFiltrattionModel.Name))
            {
                gymQuery = gymQuery.Where(x => x.Name.StartsWith(gymFiltrattionModel.Name));
            }

            var gymSearchResult = await gymPaging.ApplyPagingAsync(gymQuery);
            var gymSearchResultListing = gymSearchResult.Listing.Select(x => new GymReadInfo()
            {
                OrganisationId = x.OrganisationId ?? 0,
                Address = x.Address,
                CloseTime = x.CloseTime,
                OnenTime = x.OpenTime,
                GymId = x.Id,
                GymSports = x.GymShifts.SelectMany(p => p.TrainerShedules
                    .SelectMany(t => t.Trainer.TrainerSports.Where(j => j.IsConfirmed == true)
                    .Select(k => new GymSports() { Name = k.Sport.Name, Id = k.SportId })))
                    .DistinctBy(l => l.Id).ToList(),
                gymTrainerInfos = x.GymShifts.SelectMany(s => s.TrainerShedules.Select(t => new GymTrainerInfo()
                {
                    Id = t.TrainerId ?? 0,
                    Name = t.Trainer?.Name ?? "" + t.Trainer?.Surname ?? "",
                    TrainerSport = t.Trainer?.TrainerSports.Where(o => o.IsConfirmed == true).Select(l => new Models.Gym.TrainerSport()
                    {
                        Id = l.Id,
                        Level = l.Level,
                        Name = l.Sport.Name
                    }).ToList()
                })).ToList(),
            }).ToList();


            return new GymInfoListing()
            {
                GymReadInfos = gymSearchResultListing,
                Page = gymSearchResult.CurrentPage,
                TotalItems = gymSearchResult.Total,
                TotalPages = gymSearchResult.TotalPage
            };
        }
    }
}
