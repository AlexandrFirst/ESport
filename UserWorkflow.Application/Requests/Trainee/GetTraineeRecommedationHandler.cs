using Castle.DynamicProxy.Generators.Emitters.SimpleAST;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models;
using UserWorkflow.Application.Models.Base;
using UserWorkflow.Application.Models.Lesson;
using UserWorkflow.Application.Models.TimeTable;
using UserWorkflow.Esport;
using UserWorkflow.Esport.Models;
using UserWorkflow.Infrastructure.Paging;
using UserWorkFlow.Infrastructure.Queries;

namespace UserWorkflow.Application.Requests.Trainee
{
    public class GetTraineeRecommedationHandler : IRequestHandler<GetTraineeRecommedation, GetTraineeRecommedationResult>
    {
        private readonly EsportDataContext esportDataContext;
        private readonly IPaging<Lesson> lessonPaging;

        public GetTraineeRecommedationHandler(EsportDataContext esportDataContext,
            IPaging<Lesson> lessonPaging)
        {
            this.esportDataContext = esportDataContext;
            this.lessonPaging = lessonPaging;

        }

        public async Task<RequestResult<GetTraineeRecommedationResult>> HandleQueryAsync(GetTraineeRecommedation request)
        {
            var lessonQuery = esportDataContext.Lessons.AsQueryable();
            if (request.TrainerIds.Any())
            {
                List<Expression<Func<Lesson, bool>>> trainersPredicates = new List<Expression<Func<Lesson, bool>>>();
                request.TrainerIds.ForEach(x =>
                {
                    trainersPredicates.Add((Lesson l) => l.TrainerShedule.TrainerId == x);
                });

                lessonQuery = lessonQuery.Or(trainersPredicates);
            }

            if (request.LessonSportFilter != null)
            {
                if (request.LessonSportFilter.SportIds.Any())
                {
                    switch (request.LessonSportFilter.LogicalOperation)
                    {
                        case LogicalOperation.OR:
                            var sportOrPredicates = new List<Expression<Func<Lesson, bool>>>();
                            request.LessonSportFilter.SportIds.ForEach(s =>
                            {
                                sportOrPredicates.Add(lessonQuery => lessonQuery.TraineeShedules
                                    .Any(p => p.TraineeSheduleExercises
                                    .Any(o => o.TraineeExercise.Exercise.ExerciseSports.Any(d => d.Id == s))));
                            });
                            lessonQuery = lessonQuery.Or(sportOrPredicates);
                            break;
                        case LogicalOperation.AND:
                            request.LessonSportFilter.SportIds.ForEach(s =>
                            {
                                lessonQuery = lessonQuery.Where(k => k.TraineeShedules
                                    .Any(p => p.TraineeSheduleExercises
                                    .Any(o => o.TraineeExercise.Exercise.ExerciseSports.Any(d => d.Id == s))));
                            });
                            break;
                        default:
                            throw new ApplicationException("Unknown logical condition");
                    }
                }
            }

            if (request.LessonTimeTableFilter.TimeTableFilterUnits.Any())
            {

                switch (request.LessonTimeTableFilter.LogicalOperation)
                {
                    case LogicalOperation.OR:
                        var timeOrPredicates = new List<Expression<Func<Lesson, bool>>>();
                        request.LessonTimeTableFilter.TimeTableFilterUnits.ForEach(s =>
                        {
                            timeOrPredicates.Add(x => x.OverrideTrainerShedule ? (x.FromTime <= s.From && x.ToTime >= s.To && (x.DayOfTheWeek & (int)s.DayOfTheWeek) > 0) :
                                 x.TrainerShedule.TimeOverride.Any() == true ? x.TrainerShedule.TimeOverride.Any(m => (m.From <= s.From && m.To >= s.To && (m.DayOfTheWeeks & (int)s.DayOfTheWeek) > 0)) :
                                 (x.TrainerShedule.GymShift.FromTime <= s.From && x.TrainerShedule.GymShift.ToTime >= s.To && (x.TrainerShedule.GymShift.DayOfTheWeeks & (int)s.DayOfTheWeek) > 0));
                        });
                        lessonQuery = lessonQuery.Or(timeOrPredicates);
                        break;
                    case LogicalOperation.AND:
                        request.LessonTimeTableFilter.TimeTableFilterUnits.ForEach(s =>
                        {
                            lessonQuery = lessonQuery.Where(x => x.OverrideTrainerShedule ? (x.FromTime <= s.From && x.ToTime >= s.To && (x.DayOfTheWeek & (int)s.DayOfTheWeek) > 0) :
                                 x.TrainerShedule.TimeOverride.Any() == true ? x.TrainerShedule.TimeOverride.Any(m => (m.From <= s.From && m.To >= s.To && (m.DayOfTheWeeks & (int)s.DayOfTheWeek) > 0)) :
                                 (x.TrainerShedule.GymShift.FromTime <= s.From && x.TrainerShedule.GymShift.ToTime >= s.To && (x.TrainerShedule.GymShift.DayOfTheWeeks & (int)s.DayOfTheWeek) > 0));
                        });
                        break;
                    default:
                        break;
                }
            }

            if (request.TrainerIds.Any())
            {
                var trainerIdsPredicates = new List<Expression<Func<Lesson, bool>>>();
                request.TrainerIds.ForEach(x =>
                {
                    trainerIdsPredicates.Add(t => t.TrainerShedule.TrainerId == x);
                });
                lessonQuery = lessonQuery.Or(trainerIdsPredicates);
            }


            var userCurrentTraumas = new List<int>();
            var userTraumas = request.TraumaHistoryRecords.GroupBy(x => x.TraumaId).Select(x =>
            new
            {
                TraumaId = x.Key,
                LatestDate = x.Max(x => x.From)
            }).ToList();


            var t = await esportDataContext.Traumas.Where(x => userTraumas.Select(l => l.TraumaId).Contains(x.Id)).ToListAsync();
            var avoidedSportIds = t.Where(k => userTraumas.Any(d => d.TraumaId == k.Id && (DateTime.Now - k.TimeToRecover < d.LatestDate)))
                .SelectMany(p => p.ExerciseTraumas.SelectMany(k => k.Exercise.ExerciseSports.Select(l => l.SportId))).Distinct().ToList();


            lessonQuery = lessonQuery.Where(x => !avoidedSportIds.Any(p => x.TraineeShedules
                .Any(f => f.TraineeSheduleExercises
                .Any(k => k.TraineeExercise.Exercise.ExerciseSports
                .Any(l => l.SportId == p)))));

            var result = await lessonPaging.ApplyPagingAsync(lessonQuery, request.Page, request.PageSize);

            return new RequestResult<GetTraineeRecommedationResult>(new GetTraineeRecommedationResult()
            {
                LessonRecomendations = result.Listing.Select(p => new Models.Lesson.LessonRecomendation()
                {
                    LessonId = p.Id,
                    SportInfo = p.TraineeShedules.SelectMany(z => z.TraineeSheduleExercises
                        .SelectMany(k => k.TraineeExercise.Exercise.ExerciseSports
                        .Select(k => new ReadSportInfo() { SportId = k.Id, SportName = k.Sport.Name }))).ToList(),
                    TrainerId = p.TrainerShedule.TrainerId ?? 0,
                    TrainerName = p.TrainerShedule.Trainer?.Name ?? String.Empty,
                    LessonTimeTable = p.OverrideTrainerShedule ? ParseDaysToList(p.FromTime.Value, p.ToTime.Value, p.DayOfTheWeek.Value) :
                        p.TrainerShedule.TimeOverride.SelectMany(b => ParseDaysToList(b.From, b.To, b.DayOfTheWeeks)).ToList().DefaultIfEmpty() ??
                        ParseDaysToList(p.TrainerShedule.GymShift.FromTime, p.TrainerShedule.GymShift.ToTime, p.TrainerShedule.GymShift.DayOfTheWeeks)
                }).ToList()
            });
        }

        private List<TimeTableFilterUnit> ParseDaysToList(TimeSpan from, TimeSpan to, int days)
        {
            var values = Enum.GetValues(typeof(DayOfTheWeek)).Cast<int>().Where(k => k != (int)DayOfTheWeek.ALL);
            return values.Where(l => (l & days) > 0).Select(x => new TimeTableFilterUnit()
            {
                DayOfTheWeek = (DayOfTheWeek)x,
                From = from,
                To = to,
            }).ToList();
        }
    }
}
