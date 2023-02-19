﻿using Castle.Core.Logging;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using UserWorkflow.Application.Models.User;

namespace UserWorkflow.Application.Clients
{
    public class IdentityClient
    {
        private readonly HttpClient client;
        private readonly ILogger<IdentityClient> logger;

        public IdentityClient(HttpClient client, ILogger<IdentityClient> logger)
        {
            this.client = client;
            this.logger = logger;
        }

        public async Task<UserIdentityInfo> GetIdentityUserInfoAsync(int userId)
        {
            var identitytUserResponse = await client.GetAsync($"/user/{userId}");

            if (identitytUserResponse.IsSuccessStatusCode)
            {
                var content = await identitytUserResponse.Content.ReadAsStringAsync();
                var userIdentityInfo = JsonConvert.DeserializeObject<UserIdentityInfo>(content);
                return userIdentityInfo;
            }
            string message = $"Error identity request: {identitytUserResponse.StatusCode} {identitytUserResponse.ReasonPhrase}";
            logger.LogCritical(message);
            throw new Exception(message);

        }
    }
}
