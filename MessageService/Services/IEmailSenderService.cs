﻿using MessageService.Models;
using System.Threading.Tasks;

namespace MessageService.Services
{
    public interface IEmailSenderService
    {
        Task<int> SendMessagesAsync(SendMessageRequest sendMessageRequest);
    }
}
