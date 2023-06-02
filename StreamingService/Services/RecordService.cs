using Microsoft.Extensions.DependencyInjection;
using StreamingService.DL;
using StreamingService.DL.Models;
using StreamingService.Models.Record;
using System;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace StreamingService.Services
{
    public class RecordService : IRecordService
    {
        private readonly IServiceProvider serviceProvider;

        private Channel<RecordUploadOption> channel;

        public RecordService(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
            channel = Channel.CreateUnbounded<RecordUploadOption>();
        }

        public ChannelReader<RecordUploadOption> GetUploadRecordQueueReader()
        {
            if (channel == null) {
                throw new ApplicationException("stream record channel is null");
            }
            return channel.Reader;
        }

        public ChannelWriter<RecordUploadOption> GetUploadRecordQueueWriter()
        {
            if (channel == null)
            {
                throw new ApplicationException("stream record channel is null");
            }
            return channel.Writer;
        }

        public async Task SendRecordForUploading(RecordUploadOption recordUploadingOptions)
        {
            using (var scope = serviceProvider.CreateScope()) 
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<StreamDataContext>();

                var streamRecord = new EsStreamRecords()
                {
                    AccessMode = AccessMode.All,
                    CreationDate = DateTime.Now,
                    RecordStatus = RecordStatus.Uploading,
                    EsStreamId = recordUploadingOptions.StreamId,
                };


                await dbContext.EsStreamRecords.AddAsync(streamRecord);
                await dbContext.SaveChangesAsync();

                recordUploadingOptions.RecordId = streamRecord.Id;
                var writer = GetUploadRecordQueueWriter();
                await writer.WriteAsync(recordUploadingOptions);
            }
        }
    }
}
