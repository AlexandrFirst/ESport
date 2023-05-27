using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models.Exercise;
using UserWorkflow.Esport;
using UserWorkflow.Esport.Models;
using UserWorkflow.Infrastructure.Paging;
using UserWorkFlow.Infrastructure.Queries;

namespace UserWorkflow.Application.Requests.Trainer
{
    public class GetExerciseTrainerListingHandler : IRequestHandler<GetExerciseTrainerListing, GetExerciseTrainerListingResult>
    {
        private readonly EsportDataContext esportDataContext;
        private readonly IPaging<Exercise> paging;

        public GetExerciseTrainerListingHandler(EsportDataContext esportDataContext, 
            IPaging<Exercise> paging)
        {
            this.esportDataContext = esportDataContext;
            this.paging = paging;
        }

        public async Task<RequestResult<GetExerciseTrainerListingResult>> HandleQueryAsync(GetExerciseTrainerListing request)
        {
            var exerciseQuery = esportDataContext.Exercises.AsQueryable();

            var userId = request.AuthenticatedBy.UserId;
            var trainer = await esportDataContext.Trainers.FirstOrDefaultAsync(x => x.UserId == userId);
            if (trainer == null) 
            {
                throw new ApplicationException("Unable to find trainer with id: " + userId);
            }

            if (request.Sports.Any()) 
            {
                exerciseQuery = exerciseQuery.Where(x => x.ExerciseSports.Any(p => request.Sports.Any(o => o == p.SportId)));
            }

            if (request.BodyParts.Any()) 
            {
                exerciseQuery = exerciseQuery.Where(x => x.BodyParts.Any(p => request.BodyParts.Any(o => o == p.BodyPartId)));
            }

            if (!string.IsNullOrEmpty(request.Name))
            {
                exerciseQuery = exerciseQuery.Where(x => x.Name.StartsWith(request.Name));
            }


            if (request.IsMine)
            {
                exerciseQuery = exerciseQuery.Where(x => x.ExerciseOwnerId == trainer.Id || x.IsPublic == true);
            }
            else 
            {
                exerciseQuery = exerciseQuery.Where(x => x.IsPublic == true);
            }

            var exerciseQueryResult = await paging.ApplyPagingAsync(exerciseQuery, request.Page, request.PageSize);

            var resultListing = exerciseQueryResult.Listing.Select(x => new ExerciseInfo()
            {
                BodypartRelation = x.BodyParts.Select(c => new ExerciseRelationModel() { Id = c.BodyPartId, Name = c.BodyParts.Name }).ToList(),
                Description = x.Description,
                Name = x.Name,
                ExerciseTutorialLinks = x.ExerciseTutorails.Select(x => x.Link).ToList(),
                SportRelations = x.ExerciseSports.Select(c => new ExerciseRelationModel() { Id = c.SportId, Name = c.Sport.Name }).ToList(),
                TraumaRelations = x.ExerciseTraumas.Select(c => new ExerciseRelationModel() { Id = c.TraumaId, Name = c.Traumas.Name }).ToList()
            }).ToList();

            return new RequestResult<GetExerciseTrainerListingResult>(new GetExerciseTrainerListingResult() 
            {
                ExerciseInfos = resultListing,
                Page= exerciseQueryResult.CurrentPage,
                TotalItems = exerciseQueryResult.Total,
                TotalPages = exerciseQueryResult.TotalPage
            });

        }
    }
}
