using IdentityV2.Dto.User;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;

namespace IdentityV2.Data.Utils
{
    public class DbSeedIfo
    {
        public List<CreateUserDto> Users { get; set; }
    }
    public static class DBSeed
    {
        public static List<CreateUserDto> GetSeedUser(string filePath)
        {

            var jsonData = System.IO.File.ReadAllText(filePath);

            if (string.IsNullOrWhiteSpace(jsonData)) return null;

            var users = JsonConvert.DeserializeObject<DbSeedIfo>(jsonData);

            if (users.Users == null || users.Users.Count == 0) return null;
            return users.Users;
        }
    }
}
