using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Esport.Configuration
{
    public class QuestionConfiguration : IEntityTypeConfiguration<Question>
    {
        public void Configure(EntityTypeBuilder<Question> builder)
        {
            builder.HasMany(x => x.SubQuestion)
                .WithOne(x => x.ParentQuestion)
                .HasForeignKey(x => x.ParentQuestionId)
                .OnDelete(DeleteBehavior.NoAction);

            //builder.HasData(new Question()
            //{
            //    Id = 1,
            //    QuestionText = "Last experienced traumas?",
            //    AnswerType = AnswerType.DateRange,
            //    QuestionType = QuestionType.Single,
            //    QuestionStage = QuestionStage.HistoryTraumas,
            //    SubQuestion = new List<Question>()
            //    {
            //        new Question()
            //        {
            //            Id= 2,
            //            QuestionText = "List traumas that you had",
            //            QuestionStage= QuestionStage.SubQuestion,
            //            QuestionType = QuestionType.Multiple,
            //            AnswerType = AnswerType.Quality,
            //            ParentQuestionId = 1
            //        }
            //    }
            //});
        }
    }
}
