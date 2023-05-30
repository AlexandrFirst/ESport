using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Esport;
using UserWorkflow.Esport.Models;
using UserWorkFlow.Infrastructure.Commands;

namespace UserWorkflow.Application.Commands.Trainer
{
    public class CreateLessonHandler : ICommandHandler<CreateLesson>
    {
        private readonly EsportDataContext esportDataContext;

        public CreateLessonHandler(EsportDataContext esportDataContext)
        {
            this.esportDataContext = esportDataContext;
        }

        public async Task<CommandResult> HandleCommandAsync(CreateLesson command)
        {
            var userId = command.AuthenticatedBy.UserId;
            var trainer = await esportDataContext.Trainers.FirstOrDefaultAsync(x => x.UserId == userId);
            if (trainer == null)
            {
                throw new ApplicationException("Unable to find trainer with userId: " + userId);
            }

            var trainerSchedule = trainer.TraineeShedules.FirstOrDefault(x => x.Id == command.TrainerScheduleId);
            if (trainerSchedule == null)
            {
                throw new ApplicationException("No trainerSchedule with id: " + command.TrainerScheduleId + " is found");
            }

            var lesson = new Lesson()
            {
                DayOfTheWeek = command.LessonTimeOverride == null ? null : command.LessonTimeOverride?.DayOfTheWeek,
                FromTime = command.LessonTimeOverride == null ? null : command.LessonTimeOverride?.FromTime,
                ToTime = command.LessonTimeOverride == null ? null : command.LessonTimeOverride?.ToTime,
                LessonType = command.LessonType,
                OverrideTrainerShedule = command.LessonTimeOverride != null,
                TrainerSheduleId = command.TrainerScheduleId
            };

            var existingLessonQuery = trainerSchedule.Lessons.AsQueryable();
            if (lesson.DayOfTheWeek != null)
            {
                existingLessonQuery = existingLessonQuery.Where(x => x.DayOfTheWeek.HasValue && (x.DayOfTheWeek.Value & lesson.DayOfTheWeek.Value) > 1);
            }

            var existingLessons = existingLessonQuery.ToList();

            var lessonFromTime = lesson.FromTime != null ? new List<TimeSpan>() { lesson.FromTime.Value } : trainerSchedule.TimeOverride?.Where(x => lesson.DayOfTheWeek.HasValue &&
                    (x.DayOfTheWeeks & lesson.DayOfTheWeek.Value) > 1).Select(v => v.From).ToList().DefaultIfEmpty() ?? trainerSchedule.TimeOverride?.Where(x => x.DayOfTheWeeks == (int)DayOfTheWeek.ALL).Select(x => x.From).ToList().DefaultIfEmpty() ?? new List<TimeSpan>()
                    {
                           trainerSchedule.GymShift.FromTime
                    };

            var lessonToTime = lesson.ToTime != null ? new List<TimeSpan>() { lesson.ToTime.Value } : trainerSchedule.TimeOverride?.Where(x => lesson.DayOfTheWeek.HasValue &&
                    (x.DayOfTheWeeks & lesson.DayOfTheWeek.Value) > 1).Select(v => v.To).ToList().DefaultIfEmpty() ?? trainerSchedule.TimeOverride?.Where(x => x.DayOfTheWeeks == (int)DayOfTheWeek.ALL).Select(x => x.To).ToList().DefaultIfEmpty() ?? new List<TimeSpan>()
                    {
                           trainerSchedule.GymShift.ToTime
                    };

            bool overlapWithLessons = existingLessons.Any(x =>
            {
                var trainerFrameTime = x.OverrideTrainerShedule ? new List<TimeOverride>()
                {
                    new()
                    {
                        DayOfTheWeeks = x.DayOfTheWeek.Value,
                        From = x.FromTime.Value,
                        To = x.ToTime.Value
                    }
                } : x.TrainerShedule.TimeOverride?.Where(o => lesson.DayOfTheWeek.HasValue &&
                        (o.DayOfTheWeeks & lesson.DayOfTheWeek.Value) > 1).ToList().DefaultIfEmpty() ?? x.TrainerShedule.TimeOverride?.Where(x => x.DayOfTheWeeks == (int)DayOfTheWeek.ALL).DefaultIfEmpty() ??
                        new List<TimeOverride>()
                        {
                            new()
                            {
                                DayOfTheWeeks = x.TrainerShedule.GymShift.DayOfTheWeeks,
                                From = x.TrainerShedule.GymShift.FromTime,
                                To = x.TrainerShedule.GymShift.ToTime
                            }
                        };

                bool overlapFrom = lessonFromTime.Any(_lessonFromTime => trainerFrameTime.Any(c => _lessonFromTime <= c.To));
                bool overlapTo = lessonToTime.Any(_lessonToTime => trainerFrameTime.Any(c => c.From <= _lessonToTime));

                return overlapFrom && overlapFrom;
            });

            if (overlapWithLessons)
            {
                throw new ApplicationException("Unable to add curernt lesson as time it is overlapping with others");
            }


            var trainerFrameTime = trainerSchedule.TimeOverride.Where(o => lesson.DayOfTheWeek.HasValue &&
                   (o.DayOfTheWeeks & lesson.DayOfTheWeek.Value) > 1).ToList();
            if (!trainerFrameTime.Any()) 
            {
                trainerFrameTime = trainerSchedule.TimeOverride.Where(x => x.DayOfTheWeeks == (int)DayOfTheWeek.ALL).ToList();
            }
            if (!trainerFrameTime.Any()) 
            {
                trainerFrameTime = new List<TimeOverride>()
                   {
                        new()
                        {
                            DayOfTheWeeks = trainerSchedule.GymShift.DayOfTheWeeks,
                            From = trainerSchedule.GymShift.FromTime,
                            To = trainerSchedule.GymShift.ToTime
                        }
                   };
            };

            if (trainerFrameTime == null)
            {
                throw new ApplicationException("Trainer timetable is not correct; Trainer id: " + trainer.Id);
            }

            bool overlapFrom = lessonFromTime.Any(_lessonFromTime => !trainerFrameTime.All(k => _lessonFromTime >= k.From));
            bool overlapTo = lessonToTime.Any(_lessonToTime => !trainerFrameTime.All(k => _lessonToTime <= k.To));

            var extendTrainerTime = overlapFrom || overlapTo;
            if (extendTrainerTime)
            {
                throw new ApplicationException("Lesson time extend trainer shedule time");
            }

            await esportDataContext.Lessons.AddAsync(lesson);
            await esportDataContext.SaveChangesAsync();

            return new CommandResult(lesson.Id);
        }
    }
}
