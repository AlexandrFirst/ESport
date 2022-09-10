using IdentityServer4.Models;
using IdentityServer4.Test;
using System.Collections.Generic;

namespace Authority.Utility
{
    public static class Config
    {
        public static IEnumerable<Client> Clients =>
        new Client[]
        {
            new Client
             {
                 ClientId = "userFlowClient",
                 AllowedGrantTypes = GrantTypes.ClientCredentials,
                 ClientSecrets =
                     {
                     new Secret("secret".Sha256())
                     },
                 AllowedScopes = { "userFlow" }
             }
        };
        public static IEnumerable<ApiScope> ApiScopes =>
         new ApiScope[]
         {
             new ApiScope("userFlow", "user Flow")
         };
        public static IEnumerable<ApiResource> ApiResources =>
         new ApiResource[]
         {
         };
        public static IEnumerable<IdentityResource> IdentityResources =>
         new IdentityResource[]
         {
         };
        public static List<TestUser> TestUsers =>
         new List<TestUser>
         {
         };
    }
}
