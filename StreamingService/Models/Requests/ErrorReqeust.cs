using System;

namespace StreamingService.Models.Requests
{
    public class StopRequest: BaseStreamReqeust
    {
        public string Message { get; set; }
    }
}
