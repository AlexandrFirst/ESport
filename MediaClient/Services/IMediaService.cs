using MediaClient.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediaClient.Services
{
    public interface IMediaService
    {
        public Task<UploadResult> UploadFile(string bucketName, byte[] fileToUpload, string contentType);
        public Task<byte[]> DownloadFile(string bucketname, string fileId);
        Task<UploadResult> UploadFile(string bucketName, IFormFile fileToUpload);
    }
}
