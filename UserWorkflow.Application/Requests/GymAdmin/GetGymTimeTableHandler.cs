using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models.Gym;
using UserWorkflow.Esport;
using UserWorkflow.Esport.Models;
using UserWorkFlow.Infrastructure.Queries;

namespace UserWorkflow.Application.Requests.GymAdmin
{
    public class GetGymTimeTableHandler : IRequestHandler<GetGymTimeTable, GetGymTimeTableResponse>
    {
        private readonly EsportDataContext context;

        public GetGymTimeTableHandler(EsportDataContext context)
        {
            this.context = context;
        }

        public async Task<RequestResult<GetGymTimeTableResponse>> HandleQueryAsync(GetGymTimeTable request)
        {
            var gymInfo = await context.Gyms.Where(x => request.GymId.Any(p => p == x.Id)).ToListAsync();
            if (gymInfo == null)
            {
                throw new ApplicationException($"Unable to find gym with id: {request.GymId}");
            }

            var gymShifts = gymInfo.SelectMany(x => x.GymShifts);
            if (request.DayOfTheWeek != null && request.DayOfTheWeek > 0)
            {
                gymShifts = gymInfo.SelectMany(x => x.GymShifts).Where(x => (x.DayOfTheWeeks & request.DayOfTheWeek) != 0).ToList();
            }

            var result = new List<GymTimeTable>();
            var gymWokingHours = gymShifts.DistinctBy(x => x.GymId)
                .Select(x => new GymWorkingHours() { GymId = x.GymId, From = x.Gym.OpenTime, To = x.Gym.CloseTime})
                .ToList();

            foreach (var dow in Enum.GetValues(typeof(DayOfTheWeek)))
            {
                var currentDay = (DayOfTheWeek)dow;
                if ((DayOfTheWeek)dow == DayOfTheWeek.ALL) { continue; }

                if (request.DayOfTheWeek != null && ((int)currentDay & (int)request.DayOfTheWeek) == 0) { continue; }

                var dayShifts = gymShifts.Where(x => (x.DayOfTheWeeks & (int)currentDay) == (int)currentDay);

                foreach (var dayShift in dayShifts.DistinctBy(x => x.GymId))
                {
                    result.Add(new GymTimeTable()
                    {
                        DayOfTheWeek = currentDay,
                        GymId = dayShift.GymId,
                        DayTimeTable = dayShifts.Where(g => g.GymId == dayShift.GymId).Select(k =>
                        {
                            var timeTableLessonsQuery = k.TrainerShedules.AsQueryable();
                            if (request.TrainerId.HasValue)
                            {
                                timeTableLessonsQuery = timeTableLessonsQuery.Where(u => request.TrainerId.HasValue && u.TrainerId == request.TrainerId);
                            }

                            return new DayTimeTable()
                            {
                                From = k.FromTime,
                                ShiftId = k.Id,
                                To = k.ToTime,
                                TimeTableLessons = timeTableLessonsQuery.SelectMany(l => l.Lessons.Select(j => new TimeTableLesson()
                                {
                                    LessonId = j.Id,
                                    From = j.FromTime ?? k.FromTime,
                                    To = j.ToTime ?? k.ToTime,
                                    LessonType = j.LessonType,
                                    TrainerId = l.TrainerId.Value,
                                    TrainerSheduleId = l.Id,
                                    TrainerName = l.Trainer.Name
                                })).OrderBy(i => i.From).ToList(),
                                TrainerShitIds = timeTableLessonsQuery.Select(x => x.Id).ToList(),
                            };
                        }).OrderBy(a => a.From).ToList(),
                    });
                }

                
            }
            var orderedResult = result.OrderBy(p => p.DayOfTheWeek).ToList();

            return new RequestResult<GetGymTimeTableResponse>(new GetGymTimeTableResponse()
            {
                GymTimeTable = orderedResult,
                GymWorkingHours = gymWokingHours
            });
        }
    }
}
