using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Text;
using UserWorkflow.Esport.Configuration;
using UserWorkflow.Esport.Models;

namespace UserWorkflow.Esport
{
    public class EsportDataContext: DbContext
    {
        public virtual DbSet<Administrators> Administrators { get; set; }
        public virtual DbSet<AnswerBodyParts> AnswerBodyParts { get; set; }
        public virtual DbSet<Answers> Answers { get; set; }
        public virtual DbSet<AnswerSport> AnswerSports { get; set; }
        public virtual DbSet<AnswerTraumas> AnswerTraumas { get; set; }
        public virtual DbSet<BodyParts> BodyParts { get; set; }
        public virtual DbSet<Exercise> Exercises { get; set; }
        public virtual DbSet<ExerciseBodyPart> ExerciseBodyParts { get; set; }
        public virtual DbSet<ExerciseSport> ExerciseSports { get; set; }
        public virtual DbSet<ExerciseTraumas> ExerciseTraumas { get; set; }
        public virtual DbSet<ExerciseTutorial> ExerciseTutorials { get; set; }
        public virtual DbSet<Food> Foods { get; set; }
        public virtual DbSet<Food_FoodDiet> Food_FoodDiets { get; set; }
        public virtual DbSet<FoodDiet> FoodDiets { get; set; }
        public virtual DbSet<Gym> Gyms { get; set; }
        public virtual DbSet<GymAdministrators> GymAdministrators { get; set; }
        public virtual DbSet<GymShift> GymShifts { get; set; }
        public virtual DbSet<Lesson> Lessons { get; set; }
        public virtual DbSet<Lesson_FoodDiet> Lesson_FoodsDiets { get; set; }
        public virtual DbSet<Organisation> Organisations { get; set; }
        public virtual DbSet<OrganisationAdministrators> OrganisationAdministrators { get; set; }
        public virtual DbSet<Question> Questions { get; set; }
        public virtual DbSet<Sport> Sports { get; set; }
        public virtual DbSet<Trainee> Trainees { get; set; }
        public virtual DbSet<TraineeAnswers> TraineeAnswers { get; set; }
        public virtual DbSet<TraineeExercise> TraineeExercises { get; set; }
        public virtual DbSet<TraineeShedule> TraineeShedules { get; set; }
        public virtual DbSet<TraineeSheduleTraineeExercise> TraineeSheduleTraineeExercises { get; set; }
        public virtual DbSet<Trainer> Trainers { get; set; }
        public virtual DbSet<TrainerShedule> TrainerShedules { get; set; }
        public virtual DbSet<TrainerSport> TrainerSports { get; set; }
        public virtual DbSet<Traumas> Traumas { get; set; }


        public EsportDataContext([NotNull] DbContextOptions<EsportDataContext> options) : base(options)
        {
            Database.Migrate();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new AnswerBodyPartConfiguration());
            modelBuilder.ApplyConfiguration(new AnswerConfiguration());
            modelBuilder.ApplyConfiguration(new AnswerSportConfiguration());
            modelBuilder.ApplyConfiguration(new AnswerTraumaConfiguration());
            modelBuilder.ApplyConfiguration(new ExerciseBodyPartConfiguration());
            modelBuilder.ApplyConfiguration(new ExerciseSportConfiguration());
            modelBuilder.ApplyConfiguration(new ExerciseTraumasConfiguration());
            modelBuilder.ApplyConfiguration(new ExerciseTutorialConfiguration());
            modelBuilder.ApplyConfiguration(new Food_FoodDietConfiguration());
            modelBuilder.ApplyConfiguration(new FoodDietConfiguration());
            modelBuilder.ApplyConfiguration(new GymAdministratorConfiguration());
            modelBuilder.ApplyConfiguration(new GymConfiguration());
            modelBuilder.ApplyConfiguration(new GymShiftConfiguration());
            modelBuilder.ApplyConfiguration(new LessonConfiguration());
            modelBuilder.ApplyConfiguration(new LessonFoodDietConfiguration());
            modelBuilder.ApplyConfiguration(new OrganisationAdministratorConfiguration());
            modelBuilder.ApplyConfiguration(new TraineeAnswersConfiguration());
            modelBuilder.ApplyConfiguration(new TraineeExerciseConfiguration());
            modelBuilder.ApplyConfiguration(new TraineeSheduleConfiguration());
            modelBuilder.ApplyConfiguration(new TraineeSheduleTraineeExerciseConfiguration());
            modelBuilder.ApplyConfiguration(new TrainerConfiguration());
            modelBuilder.ApplyConfiguration(new TrainerSheduleConfiguration());
            modelBuilder.ApplyConfiguration(new TrainerSheduleConfiguration());
            modelBuilder.ApplyConfiguration(new TrainerSportConfiguration());
            modelBuilder.ApplyConfiguration(new TrainerConfiguration());
            modelBuilder.ApplyConfiguration(new TraineeConfiguration());
            modelBuilder.ApplyConfiguration(new AdministratorConfiguration());
        }
    }
}
