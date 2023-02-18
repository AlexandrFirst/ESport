using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace UserWorkflow.Esport.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Administrators",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: false),
                    PhotoId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Administrators", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BodyParts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    ImageId = table.Column<Guid>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BodyParts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Exercises",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    AgeLimit = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exercises", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Foods",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Proteins = table.Column<float>(nullable: false),
                    Fats = table.Column<float>(nullable: false),
                    Carbohydrates = table.Column<float>(nullable: false),
                    Caloric = table.Column<float>(nullable: false),
                    Water = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Foods", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Organisations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organisations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuestionText = table.Column<string>(nullable: true),
                    QuestionType = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Sports",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sports", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Trainees",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: false),
                    Info = table.Column<string>(nullable: true),
                    PhotoId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trainees", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Trainers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(nullable: true),
                    Status = table.Column<int>(nullable: false),
                    PhotoId = table.Column<Guid>(nullable: true),
                    Info = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trainers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Traumas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BodyPart = table.Column<int>(nullable: false),
                    Name = table.Column<int>(nullable: false),
                    Description = table.Column<int>(nullable: false),
                    HealDescription = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Traumas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ExerciseBodyParts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExerciseId = table.Column<int>(nullable: false),
                    BodyPartId = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExerciseBodyParts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExerciseBodyParts_BodyParts_BodyPartId",
                        column: x => x.BodyPartId,
                        principalTable: "BodyParts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExerciseBodyParts_Exercises_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExerciseTutorials",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExerciseId = table.Column<int>(nullable: true),
                    Link = table.Column<string>(nullable: true),
                    PublicId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExerciseTutorials", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExerciseTutorials_Exercises_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "TraineeExercises",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExerciseId = table.Column<int>(nullable: false),
                    DescriptionOverride = table.Column<string>(nullable: true),
                    ExerciseType = table.Column<int>(nullable: false),
                    IsRecommended = table.Column<bool>(nullable: false),
                    ExerciseStatus = table.Column<int>(nullable: false),
                    StatusReason = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TraineeExercises", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TraineeExercises_Exercises_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Gyms",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    OpenTime = table.Column<TimeSpan>(nullable: false),
                    CloseTime = table.Column<TimeSpan>(nullable: false),
                    OrganisationId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gyms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Gyms_Organisations_OrganisationId",
                        column: x => x.OrganisationId,
                        principalTable: "Organisations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "OrganisationAdministrators",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: false),
                    OrganisationId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganisationAdministrators", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrganisationAdministrators_Organisations_OrganisationId",
                        column: x => x.OrganisationId,
                        principalTable: "Organisations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Answers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Answer = table.Column<string>(nullable: true),
                    QuestionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Answers_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExerciseSports",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SportId = table.Column<int>(nullable: false),
                    ExerciseId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExerciseSports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExerciseSports_Exercises_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExerciseSports_Sports_SportId",
                        column: x => x.SportId,
                        principalTable: "Sports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FoodDiets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TrainerId = table.Column<int>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FoodDiets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FoodDiets_Trainers_TrainerId",
                        column: x => x.TrainerId,
                        principalTable: "Trainers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "TrainerSports",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TrainerId = table.Column<int>(nullable: false),
                    SportId = table.Column<int>(nullable: false),
                    IsConfirmed = table.Column<bool>(nullable: false),
                    FromDate = table.Column<DateTime>(nullable: false),
                    ToDate = table.Column<DateTime>(nullable: true),
                    Level = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainerSports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrainerSports_Sports_SportId",
                        column: x => x.SportId,
                        principalTable: "Sports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TrainerSports_Trainers_TrainerId",
                        column: x => x.TrainerId,
                        principalTable: "Trainers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExerciseTraumas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TraumaId = table.Column<int>(nullable: false),
                    ExerciseId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExerciseTraumas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExerciseTraumas_Exercises_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExerciseTraumas_Traumas_TraumaId",
                        column: x => x.TraumaId,
                        principalTable: "Traumas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GymAdministrators",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GymId = table.Column<int>(nullable: false),
                    AdministratorId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GymAdministrators", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GymAdministrators_Administrators_AdministratorId",
                        column: x => x.AdministratorId,
                        principalTable: "Administrators",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GymAdministrators_Gyms_GymId",
                        column: x => x.GymId,
                        principalTable: "Gyms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GymShifts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GymId = table.Column<int>(nullable: false),
                    FromTime = table.Column<TimeSpan>(nullable: false),
                    ToTime = table.Column<TimeSpan>(nullable: false),
                    DayOfTheWeeks = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GymShifts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GymShifts_Gyms_GymId",
                        column: x => x.GymId,
                        principalTable: "Gyms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AnswerBodyParts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BodyPartId = table.Column<int>(nullable: false),
                    AnswerId = table.Column<int>(nullable: false),
                    IsPositive = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnswerBodyParts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AnswerBodyParts_Answers_AnswerId",
                        column: x => x.AnswerId,
                        principalTable: "Answers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AnswerBodyParts_BodyParts_BodyPartId",
                        column: x => x.BodyPartId,
                        principalTable: "BodyParts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AnswerSports",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AnswerId = table.Column<int>(nullable: false),
                    SportId = table.Column<int>(nullable: false),
                    IsPositive = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnswerSports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AnswerSports_Answers_AnswerId",
                        column: x => x.AnswerId,
                        principalTable: "Answers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AnswerSports_Sports_SportId",
                        column: x => x.SportId,
                        principalTable: "Sports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AnswerTraumas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TraumaId = table.Column<int>(nullable: false),
                    AnswerId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnswerTraumas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AnswerTraumas_Answers_AnswerId",
                        column: x => x.AnswerId,
                        principalTable: "Answers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AnswerTraumas_Traumas_TraumaId",
                        column: x => x.TraumaId,
                        principalTable: "Traumas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TraineeAnswers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AnswerId = table.Column<int>(nullable: false),
                    TraineeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TraineeAnswers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TraineeAnswers_Answers_AnswerId",
                        column: x => x.AnswerId,
                        principalTable: "Answers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TraineeAnswers_Trainees_TraineeId",
                        column: x => x.TraineeId,
                        principalTable: "Trainees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GetFood_FoodDiets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FoodId = table.Column<int>(nullable: false),
                    DietId = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Amount = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GetFood_FoodDiets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GetFood_FoodDiets_FoodDiets_DietId",
                        column: x => x.DietId,
                        principalTable: "FoodDiets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GetFood_FoodDiets_Foods_FoodId",
                        column: x => x.FoodId,
                        principalTable: "Foods",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TrainerShedules",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ShiftId = table.Column<int>(nullable: false),
                    TrainerId = table.Column<int>(nullable: false),
                    TimeOverride = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainerShedules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrainerShedules_GymShifts_ShiftId",
                        column: x => x.ShiftId,
                        principalTable: "GymShifts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TrainerShedules_Trainers_TrainerId",
                        column: x => x.TrainerId,
                        principalTable: "Trainers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Lessons",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LessonType = table.Column<int>(nullable: false),
                    TrainerSheduleId = table.Column<int>(nullable: false),
                    OverrideTrainerShedule = table.Column<bool>(nullable: false),
                    FromTime = table.Column<TimeSpan>(nullable: true),
                    ToTime = table.Column<TimeSpan>(nullable: true),
                    DayOfTheWeek = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lessons", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Lessons_TrainerShedules_TrainerSheduleId",
                        column: x => x.TrainerSheduleId,
                        principalTable: "TrainerShedules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Lesson_FoodsDiets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LessonId = table.Column<int>(nullable: false),
                    FoodDietId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lesson_FoodsDiets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Lesson_FoodsDiets_FoodDiets_FoodDietId",
                        column: x => x.FoodDietId,
                        principalTable: "FoodDiets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Lesson_FoodsDiets_Lessons_LessonId",
                        column: x => x.LessonId,
                        principalTable: "Lessons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TraineeShedules",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TraineeId = table.Column<int>(nullable: false),
                    LessonId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TraineeShedules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TraineeShedules_Lessons_LessonId",
                        column: x => x.LessonId,
                        principalTable: "Lessons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TraineeShedules_Trainees_TraineeId",
                        column: x => x.TraineeId,
                        principalTable: "Trainees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TraineeSheduleTraineeExercises",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TraineeSheduleId = table.Column<int>(nullable: false),
                    TraineeExerciseId = table.Column<int>(nullable: false),
                    Order = table.Column<int>(nullable: false),
                    Notes = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TraineeSheduleTraineeExercises", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TraineeSheduleTraineeExercises_TraineeExercises_TraineeExerciseId",
                        column: x => x.TraineeExerciseId,
                        principalTable: "TraineeExercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TraineeSheduleTraineeExercises_TraineeShedules_TraineeSheduleId",
                        column: x => x.TraineeSheduleId,
                        principalTable: "TraineeShedules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AnswerBodyParts_AnswerId",
                table: "AnswerBodyParts",
                column: "AnswerId");

            migrationBuilder.CreateIndex(
                name: "IX_AnswerBodyParts_BodyPartId",
                table: "AnswerBodyParts",
                column: "BodyPartId");

            migrationBuilder.CreateIndex(
                name: "IX_Answers_QuestionId",
                table: "Answers",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_AnswerSports_AnswerId",
                table: "AnswerSports",
                column: "AnswerId");

            migrationBuilder.CreateIndex(
                name: "IX_AnswerSports_SportId",
                table: "AnswerSports",
                column: "SportId");

            migrationBuilder.CreateIndex(
                name: "IX_AnswerTraumas_AnswerId",
                table: "AnswerTraumas",
                column: "AnswerId");

            migrationBuilder.CreateIndex(
                name: "IX_AnswerTraumas_TraumaId",
                table: "AnswerTraumas",
                column: "TraumaId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseBodyParts_BodyPartId",
                table: "ExerciseBodyParts",
                column: "BodyPartId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseBodyParts_ExerciseId",
                table: "ExerciseBodyParts",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseSports_ExerciseId",
                table: "ExerciseSports",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseSports_SportId",
                table: "ExerciseSports",
                column: "SportId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseTraumas_ExerciseId",
                table: "ExerciseTraumas",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseTraumas_TraumaId",
                table: "ExerciseTraumas",
                column: "TraumaId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseTutorials_ExerciseId",
                table: "ExerciseTutorials",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_FoodDiets_TrainerId",
                table: "FoodDiets",
                column: "TrainerId");

            migrationBuilder.CreateIndex(
                name: "IX_GetFood_FoodDiets_DietId",
                table: "GetFood_FoodDiets",
                column: "DietId");

            migrationBuilder.CreateIndex(
                name: "IX_GetFood_FoodDiets_FoodId",
                table: "GetFood_FoodDiets",
                column: "FoodId");

            migrationBuilder.CreateIndex(
                name: "IX_GymAdministrators_AdministratorId",
                table: "GymAdministrators",
                column: "AdministratorId");

            migrationBuilder.CreateIndex(
                name: "IX_GymAdministrators_GymId",
                table: "GymAdministrators",
                column: "GymId");

            migrationBuilder.CreateIndex(
                name: "IX_Gyms_OrganisationId",
                table: "Gyms",
                column: "OrganisationId");

            migrationBuilder.CreateIndex(
                name: "IX_GymShifts_GymId",
                table: "GymShifts",
                column: "GymId");

            migrationBuilder.CreateIndex(
                name: "IX_Lesson_FoodsDiets_FoodDietId",
                table: "Lesson_FoodsDiets",
                column: "FoodDietId");

            migrationBuilder.CreateIndex(
                name: "IX_Lesson_FoodsDiets_LessonId",
                table: "Lesson_FoodsDiets",
                column: "LessonId");

            migrationBuilder.CreateIndex(
                name: "IX_Lessons_TrainerSheduleId",
                table: "Lessons",
                column: "TrainerSheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_OrganisationAdministrators_OrganisationId",
                table: "OrganisationAdministrators",
                column: "OrganisationId");

            migrationBuilder.CreateIndex(
                name: "IX_TraineeAnswers_AnswerId",
                table: "TraineeAnswers",
                column: "AnswerId");

            migrationBuilder.CreateIndex(
                name: "IX_TraineeAnswers_TraineeId",
                table: "TraineeAnswers",
                column: "TraineeId");

            migrationBuilder.CreateIndex(
                name: "IX_TraineeExercises_ExerciseId",
                table: "TraineeExercises",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_TraineeShedules_LessonId",
                table: "TraineeShedules",
                column: "LessonId");

            migrationBuilder.CreateIndex(
                name: "IX_TraineeShedules_TraineeId",
                table: "TraineeShedules",
                column: "TraineeId");

            migrationBuilder.CreateIndex(
                name: "IX_TraineeSheduleTraineeExercises_TraineeExerciseId",
                table: "TraineeSheduleTraineeExercises",
                column: "TraineeExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_TraineeSheduleTraineeExercises_TraineeSheduleId",
                table: "TraineeSheduleTraineeExercises",
                column: "TraineeSheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainerShedules_ShiftId",
                table: "TrainerShedules",
                column: "ShiftId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainerShedules_TrainerId",
                table: "TrainerShedules",
                column: "TrainerId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainerSports_SportId",
                table: "TrainerSports",
                column: "SportId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainerSports_TrainerId",
                table: "TrainerSports",
                column: "TrainerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AnswerBodyParts");

            migrationBuilder.DropTable(
                name: "AnswerSports");

            migrationBuilder.DropTable(
                name: "AnswerTraumas");

            migrationBuilder.DropTable(
                name: "ExerciseBodyParts");

            migrationBuilder.DropTable(
                name: "ExerciseSports");

            migrationBuilder.DropTable(
                name: "ExerciseTraumas");

            migrationBuilder.DropTable(
                name: "ExerciseTutorials");

            migrationBuilder.DropTable(
                name: "GetFood_FoodDiets");

            migrationBuilder.DropTable(
                name: "GymAdministrators");

            migrationBuilder.DropTable(
                name: "Lesson_FoodsDiets");

            migrationBuilder.DropTable(
                name: "OrganisationAdministrators");

            migrationBuilder.DropTable(
                name: "TraineeAnswers");

            migrationBuilder.DropTable(
                name: "TraineeSheduleTraineeExercises");

            migrationBuilder.DropTable(
                name: "TrainerSports");

            migrationBuilder.DropTable(
                name: "BodyParts");

            migrationBuilder.DropTable(
                name: "Traumas");

            migrationBuilder.DropTable(
                name: "Foods");

            migrationBuilder.DropTable(
                name: "Administrators");

            migrationBuilder.DropTable(
                name: "FoodDiets");

            migrationBuilder.DropTable(
                name: "Answers");

            migrationBuilder.DropTable(
                name: "TraineeExercises");

            migrationBuilder.DropTable(
                name: "TraineeShedules");

            migrationBuilder.DropTable(
                name: "Sports");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "Exercises");

            migrationBuilder.DropTable(
                name: "Lessons");

            migrationBuilder.DropTable(
                name: "Trainees");

            migrationBuilder.DropTable(
                name: "TrainerShedules");

            migrationBuilder.DropTable(
                name: "GymShifts");

            migrationBuilder.DropTable(
                name: "Trainers");

            migrationBuilder.DropTable(
                name: "Gyms");

            migrationBuilder.DropTable(
                name: "Organisations");
        }
    }
}
