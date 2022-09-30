using Microsoft.Extensions.Hosting;
using System.Threading;
using System.Threading.Tasks;

namespace MessageService.Workers
{
    public class EmailWorker : BackgroundService
    {
        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            throw new System.NotImplementedException();
        }
    }
}
