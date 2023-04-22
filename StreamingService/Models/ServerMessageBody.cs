using Newtonsoft.Json;

namespace StreamingService.Models
{
    public enum MessageType { Presenter = 1, Viewer = 2, Stop = 3, onIceCandidate = 4, StartRecording = 5, StopRecording = 6, ChatMessage = 7 }

    public class ServerMessageBody
    {
        public string Body { get; set; }

        public T GetMessageBody<T>()
        {
            if (string.IsNullOrEmpty(Body))
            {
                throw new System.Exception("Can not transform empty body");
            }

            return JsonConvert.DeserializeObject<T>(Body);
        }

        public string GetMessageBody()
        {
            if (string.IsNullOrEmpty(Body))
            {
                throw new System.Exception("Can not transform empty body");
            }
            return Body;
        }
    }
}
