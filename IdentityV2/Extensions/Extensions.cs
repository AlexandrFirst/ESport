using AutoMapper;
using IdentityV2.Data;
using IdentityV2.Data.Domain;
using IdentityV2.Data.Utils;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.IO;
using System.Linq;

namespace IdentityV2.Extensions
{
    public static class Extensions
    {
        public static IHost SeedData(this IHost host)
        {
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var context = services.GetService<IdentityDataContext>();
                var configurations = services.GetService<IConfiguration>();
                var hostingEnvironment = services.GetService<IWebHostEnvironment>();
                var mapper = services.GetService<IMapper>();

                var isUsersExists = context.Users.Any();
                if (isUsersExists) { return host; }

                var passwordSecretKey = configurations.GetSection("User")["Key"];

                PasswordHelper passwordHelper = new PasswordHelper(passwordSecretKey);

                var path = Path.Combine(hostingEnvironment.ContentRootPath, "Data/Utils/dbseed.json");
                var seedUsers = DBSeed.GetSeedUser(path);
                if (seedUsers != null)
                {
                    using (var transaction = context.Database.BeginTransaction())
                    {
                        var adminRole = context.Roles.FirstOrDefault(x => x.Title == "OrgAdmin");
                        if (adminRole != null)
                        {
                            foreach (var user in seedUsers)
                            {
                                var userToInsert = mapper.Map<User>(user);
                                userToInsert.HashedPassword = passwordHelper.Hash(user.Password);


                                var userRole = new UserRoles() { Role = adminRole, User = userToInsert };
                                context.UserRoles.Add(userRole);
                                context.Users.Add(userToInsert);

                            }
                            context.SaveChanges();
                        }
                        transaction.Commit();

                    }

                }
            }
            return host;
        }
    }
}
