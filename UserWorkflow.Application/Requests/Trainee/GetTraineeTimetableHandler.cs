using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models.Lesson;
using UserWorkflow.Application.Models.TimeTable;
using UserWorkflow.Application.Services.Lesson;
using UserWorkflow.Esport;
using UserWorkflow.Esport.Models;
using UserWorkFlow.Infrastructure.Queries;

namespace UserWorkflow.Application.Requests.Trainee
{
    public class GetTraineeTimetableHandler : IRequestHandler<GetTraineeTimetable, GetTraineeTimetableResult>
    {
        private readonly EsportDataContext esportDataContext;

        public GetTraineeTimetableHandler(EsportDataContext esportDataContext, ILessonService lessonService)
        {
            this.esportDataContext = esportDataContext;
        }

        public async Task<RequestResult<GetTraineeTimetableResult>> HandleQueryAsync(GetTraineeTimetable request)
        {
            var userId = request.AuthenticatedBy.UserId;
            var trainee = await esportDataContext.Trainees.FirstOrDefaultAsync(x => x.UserId == userId);

            if (trainee == null)
            {
                throw new ApplicationException("Trainee with user id: " + userId + " is not found");
            }

            var traineeTimeTables = await esportDataContext.TraineeShedules.Where(x => x.TraineeId == trainee.Id).ToListAsync();

            var lessonInfos = traineeTimeTables.SelectMany(x =>
            {
                var lessonTimeTable = x.Lesson.OverrideTrainerShedule ? ParseDaysToList(x.Lesson.FromTime.Value, x.Lesson.ToTime.Value, x.Lesson.DayOfTheWeek.Value) :
                        x.Lesson.TrainerShedule.TimeOverride.SelectMany(b => ParseDaysToList(b.From, b.To, b.DayOfTheWeeks)).ToList().DefaultIfEmpty() ??
                        ParseDaysToList(x.Lesson.TrainerShedule.GymShift.FromTime, x.Lesson.TrainerShedule.GymShift.ToTime, x.Lesson.TrainerShedule.GymShift.DayOfTheWeeks);

                var lessonTraineeInfos = x.Lesson.TraineeShedules.Select(b => new LessonTraineeInfo()
                {
                    Me = b.TraineeId == x.TraineeId,
                    TraineeId = b.TraineeId ?? 0,
                    TraineeName = b.Trainee?.Name ?? string.Empty
                }).ToList();

                var traineeLessonInfo = lessonTimeTable.Select(v => new LessonInfo()
                {
                    DayOfTheWeek = v.DayOfTheWeek,
                    From = v.From,
                    To = v.To,
                    LessonId = x.LessonId,
                    LessonTraineeInfo = lessonTraineeInfos,
                    TrainerId = x.Lesson?.TrainerShedule?.TrainerId ?? 0,
                    TrainerName = x.Lesson?.TrainerShedule?.Trainer?.Name ?? string.Empty,
                });

                return traineeLessonInfo;
            }).OrderBy(x => x.DayOfTheWeek).ThenBy(o => o.From).ToList();

            return new RequestResult<GetTraineeTimetableResult>(new GetTraineeTimetableResult()
            {
                lessonInfos = lessonInfos,
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
