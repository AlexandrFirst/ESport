using RMQEsportClient.Models;
using System.Collections.Generic;
using System.Linq;

namespace RMQEsportClient.QueueConfigs
{

    public class QueueConfigName 
    {
        public static readonly QueueConfigName MessageConfig = new QueueConfigName("Message");
        public static readonly QueueConfigName IdentityConfig = new QueueConfigName("UserIdentity");
        public static readonly QueueConfigName ESportCompetitionConfig = new QueueConfigName("ESportCompetition");

        public string Value { get; private set; }

        private QueueConfigName(string configName)
        {
            this.Value = configName;
        }
    }

    public class QueueConfigFactory
    {
        public QueueConfigModel[] QueueConfigModels { get; set; }

        public QueueConfigModel GetMessageModel(QueueConfigName configName) 
        {
            var modelToReturn = QueueConfigModels.FirstOrDefault(x => x.ConfigName == configName.Value);
            if (modelToReturn == null) { throw new System.Exception("Message queue config is not found"); }
            return modelToReturn;
        }
    }
}
