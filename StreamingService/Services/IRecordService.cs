using StreamingService.Models.Record;
using System;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace StreamingService.Services
{
    public interface IRecordService
    {
        public Task SendRecordForUploading(RecordUploadOption recordUploadingOptions);
        public ChannelReader<RecordUploadOption> GetUploadRecordQueueReader();
        public ChannelWriter<RecordUploadOption> GetUploadRecordQueueWriter();
    }
}
