using IdentityServer4.Models;
using System.Collections.Generic;


namespace Identity.Helpers
{
    public static class IdentityConfig
    {
        public static IEnumerable<ApiResource> ApiResources =>
            new List<ApiResource>
            {
                new ApiResource("api1", "My API")
            };

        public static IEnumerable<Client> Clients => new List<Client>
        {
             new Client
            {
                ClientId = "client",
                AllowedGrantTypes = GrantTypes.ClientCredentials,
                ClientSecrets =
                {
                    new Secret("secret".Sha256())
                },
                AllowedScopes = { "api1" }
            }

        };

        public static IEnumerable<IdentityResource> IdentityResources =>
        new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };

    }
}
