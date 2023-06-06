using IdentityV2.Controllers;
using IdentityV2.Data;
using IdentityV2.Data.Domain;
using IdentityV2.Models.UserModels;
using System.Web.Http.Results;
using NUnit.Framework;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Moq;
using IdentityV2.Infrastructure.Implementation;
using IdentityV2.Models;
using Microsoft.Extensions.Logging;
using IdentityV2.Models.AccountModels;
using IdentityV2.Dto.User;
using Microsoft.AspNetCore.Http;
using RabbitMQ.Client;

namespace IdentityTests
{
    [TestFixture]
    public class AccountTest
    {
        private IdentityDataContext _identityDataContext;

        [SetUp]
        public void SetUp()
        {
            var roles = new List<Role>
            {
                new Role(){ Title = "Trainee"}
            };

            var users = new List<User>
            {
                new User()
                {
                    Email = "test@gmail.com",
                    HashedPassword="1234",
                    IsPending = false,
                    Name="test",
                    Surname = "test 12",
                    TelephoneNumber = "0955664534",
                }
            };

            var userRoles = new List<UserRoles>()
            {
                new UserRoles()
                {
                    Role = roles.First(),
                    User = users.First(),
                }
            };

            var options = new DbContextOptionsBuilder<IdentityDataContext>()
                      .UseInMemoryDatabase(databaseName: "MovieListDatabase")
                      .Options;

            _identityDataContext = new IdentityDataContext(options);
            _identityDataContext.UserRoles.AddRange(userRoles);
            _identityDataContext.SaveChanges();

        }

        public static HttpStatusCode GetHttpStatusCode(IActionResult functionResult)
        {
            try
            {
                return (HttpStatusCode)functionResult
                    .GetType()
                    .GetProperty("StatusCode")
                    .GetValue(functionResult, null);
            }
            catch
            {
                return HttpStatusCode.InternalServerError;
            }
        }

        [Test]
        public async Task GetUserInfoTest()
        {
            var controller = new UserController(_identityDataContext);
            var userInfo = await controller.GetUserInfo(1);

            var statusCode = GetHttpStatusCode(userInfo);

            Assert.IsTrue(statusCode == HttpStatusCode.OK);

            var content = (OkObjectResult)userInfo;

            var expectedResult = new UserIdentityInfo()
            {
                Email = "test@gmail.com",
                Name = "test",
                Surname = "test 12",
                TelephoneNumber = "0955664534",
                UserId = 1
            };

            Assert.IsNotNull(content);
            Assert.That(content.Value, Is.EqualTo(expectedResult));
        }

        [Test]
        public async Task LoginServiceTest() 
        {
            var mockAccountService = new Mock<IAccountService>();

            var loginModel = new UserLoginDto()
            {
                Mail = "test",
                Password = "12234"
            };

            mockAccountService.Setup(x => x.Login(loginModel)).ReturnsAsync(new Tokens() { Token = "test2345", UserId = 1 });

            var accountController = new AccountController(mockAccountService.Object, 
                Mock.Of<ILogger<AccountController>>(MockBehavior.Loose));
            accountController.ControllerContext.HttpContext = new DefaultHttpContext();

            var result = await accountController.ApiLogin(new LoginModel() 
            {
                Mail = "test", 
                Password = "12234" 
            });

            var statusCode = GetHttpStatusCode(result);

            Assert.IsTrue(statusCode == HttpStatusCode.OK);

            var content = (OkObjectResult)result;

            var expectedResult = new Tokens()
            {
                RefreshToken = null,
                Token = "test2345",
                UserId = 1
            };

            Assert.IsNotNull(content);
            Assert.That(content.Value, Is.EqualTo(expectedResult));

            var actualHeaders = accountController.ControllerContext.HttpContext
                .Response.Headers.Select(x => (x.Key, x.Value)).ToList();
            
            var expectedHeaders = new List<(string, string)>() {
                ("access-control-expose-headers", "Set-Cookie"),
                ("Access-Control-Allow-Credentials", "true")
            };

            var presenteHeaders = actualHeaders.Where(x => expectedHeaders.Any(p => p.Item1 == x.Key && p.Item2 == x.Value));
            Assert.IsTrue(presenteHeaders.Count() == expectedHeaders.Count);
        }

        [TearDown]
        public void TearFown() 
        {
            if (_identityDataContext != null) 
            {
                _identityDataContext.Dispose();
            }
        }
    }
}