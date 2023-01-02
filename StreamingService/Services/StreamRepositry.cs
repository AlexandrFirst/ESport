using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using StreamingService.DL;
using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;

namespace StreamingService.Services
{
    public class StreamRepositry
    {
        private readonly IServiceProvider serviceProvider;
        private ConcurrentDictionary<int, StreamProvider> streamProviders = new ConcurrentDictionary<int, StreamProvider>();

        public StreamRepositry(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        public async Task StartStream(Guid streamId, int organiserId) 
        {
            using var context = serviceProvider.GetRequiredService<StreamDataContext>();
            var stream = await context.EsStreams.FirstOrDefaultAsync(x => x.Id.Equals(streamId));
            if (stream == null) {
                throw new Exception("No stream is found");
            }

            var streamProviderExists = streamProviders.ContainsKey(stream.EventId);
            if (streamProviderExists) {
                throw new Exception("The stream for this event is already exists");
            }
        }

        // start new stream (organiser)
        // join stream (viewer)
        // record stream (organiser)
        // end stream (organiser, viewer)
    }
}
