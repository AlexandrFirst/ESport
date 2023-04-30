﻿using Microsoft.EntityFrameworkCore;
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
            var gymInfo = await context.Gyms.FirstOrDefaultAsync(x => x.Id == request.GymId);
            if (gymInfo == null)
            {
                throw new ApplicationException($"Unable to find gym with id: {request.GymId}");
            }

            var gymShifts = gymInfo.GymShifts;
            if (request.DayOfTheWeek != null && request.DayOfTheWeek > 0)
            {
                gymShifts = gymInfo.GymShifts.Where(x => (x.DayOfTheWeeks & request.DayOfTheWeek) != 0).ToList();
            }

            var result = new List<GymTimeTable>();
            foreach (var dow in Enum.GetValues(typeof(DayOfTheWeek)))
            {
                var currentDay = (DayOfTheWeek)dow;
                if (currentDay == DayOfTheWeek.ALL) { continue; }
                var dayShifts = gymShifts.Where(x => (x.DayOfTheWeeks & (int)currentDay) == (int)currentDay);
                result.Add(new GymTimeTable()
                {
                    DayOfTheWeek = currentDay,
                    GymId = request.GymId,
                    DayTimeTable = dayShifts.Select(k =>
                    {
                        return new DayTimeTable()
                        {
                            From = k.FromTime,
                            ShiftId = k.Id,
                            To = k.ToTime,
                            TimeTableLessons = k.TrainerShedules.SelectMany(l => l.Lessons.Select(j => new TimeTableLesson()
                            {
                                LessonId = j.Id,
                                From = j.FromTime ?? k.FromTime,
                                To = j.ToTime ?? k.ToTime,
                                LessonType = j.LessonType,
                                TrainerId = l.TrainerId.Value,
                                TrainerName = l.Trainer.Name
                            })).OrderBy(i => i.From).ToList(),
                        };
                    }).OrderBy(a => a.From).ToList(),
                });
            }
            var orderedResult = result.OrderBy(p => p.DayOfTheWeek).ToList();

            return new RequestResult<GetGymTimeTableResponse>(new GetGymTimeTableResponse()
            {
                GymTimeTable = orderedResult
            });
        }
    }
}