using Google.Apis.Logging;
using Google.Cloud.Storage.V1;
using MediaClient.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.AccessControl;
using System.Text;
using System.Threading.Tasks;

namespace MediaClient.Services
{
    public class MediaService : IMediaService
    {
        private readonly GoogleAuthOptions googleOptions;
        private readonly ILogger<MediaService> logger;

        public MediaService(IOptions<GoogleAuthOptions> googleOptions, ILogger<MediaService> logger)
        {
            this.googleOptions = googleOptions.Value;
            this.logger = logger;
        }

        public async Task<UploadResult> UploadFile(string bucketName, IFormFile fileToUpload)
        {
            var byteFile = getBytesFormIFile(fileToUpload);
            return await UploadFile(bucketName, byteFile, fileToUpload.ContentType ?? string.Empty);
        }

        public async Task<UploadResult> UploadFile(string bucketName, byte[] fileToUpload, string contentType)
        {
            var fileId = Guid.NewGuid();

            var storage = StorageClient.Create();
            await checkBucket(bucketName, googleOptions.GoogleId);

            using var source = new MemoryStream(fileToUpload);
            var result = await storage.UploadObjectAsync(bucketName, fileId.ToString(), contentType, source);

            return new UploadResult()
            {
                FileId = fileId.ToString(),
                FileName = result.Name,
                Size = result.Size,
                Id = result.Id
            };
        }

        public async Task<byte[]> DownloadFile(string bucketname, string fileId)
        {
            var storage = StorageClient.Create();
            using var source = new MemoryStream();

            var result = await storage.DownloadObjectAsync(bucketname, fileId, source);
            return source.ToArray();
        }

        private byte[] getBytesFormIFile(IFormFile formFile)
        {
            long length = formFile.Length;
            if (length < 0)
                throw new ApplicationException("file is empty");

            var fileStream = formFile.OpenReadStream();
            byte[] bytes = new byte[length];
            fileStream.Read(bytes, 0, (int)formFile.Length);

            return bytes;
        }

        private async Task checkBucket(string bucketName, string projectId)
        {
            var storage = StorageClient.Create();
            try
            {
                var bucketInfo = await storage.GetBucketAsync(bucketName);
                if (bucketInfo == null)
                {
                    await storage.CreateBucketAsync(projectId, bucketName);
                }
            }
            catch
            {
                logger.LogError("bucket with name: " + bucketName + " is not found; creating new one");
                await storage.CreateBucketAsync(projectId, bucketName);
            }
        }

        public async Task RemoveFile(string bucketName, string Link)
        {
            var storage = StorageClient.Create();
            try
            {
                await storage.DeleteObjectAsync(bucketName, Link);
            }
            catch
            {
                logger.LogError($"unable to delete object: {Link} in bucket: {bucketName}");
            }
        }
    }
}
