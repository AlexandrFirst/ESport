﻿using StreamingService.Extensions;
using StreamingService.Models.FileUpload;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace StreamingService.Services
{
    public class UploadFileService
    {
        private readonly string _uploadPath;
        private readonly MultipartFormDataStreamProvider _streamProvider;

        public UploadFileService()
        {
            _uploadPath = UserLocalPath;
            _streamProvider = new MultipartFormDataStreamProvider(_uploadPath);
        }

        public async Task<UploadProcessingResult> HandleRequest(HttpRequestMessage request)
        {
            await request.Content.ReadAsMultipartAsync(_streamProvider);
            return await ProcessFile(request);
        }

        private async Task<UploadProcessingResult> ProcessFile(HttpRequestMessage request)
        {
            if (request.IsChunkUpload())
            {
                return await ProcessChunk(request);
            }

            return new UploadProcessingResult()
            {
                IsComplete = true,
                FileName = OriginalFileName,
                LocalFilePath = LocalFileName,
                FileMetadata = _streamProvider.FormData
            };
        }

        private async Task<UploadProcessingResult> ProcessChunk(HttpRequestMessage request)
        {
            //use the unique identifier sent from client to identify the file
            FileChunkMetaData chunkMetaData = request.GetChunkMetaData();
            string filePath = Path.Combine(_uploadPath, string.Format("{0}.temp", chunkMetaData.ChunkIdentifier));

            //append chunks to construct original file
            using (FileStream fileStream = new FileStream(filePath, FileMode.OpenOrCreate | FileMode.Append))
            {
                var localFileInfo = new FileInfo(LocalFileName);
                var localFileStream = localFileInfo.OpenRead();

                await localFileStream.CopyToAsync(fileStream);
                await fileStream.FlushAsync();

                fileStream.Close();
                localFileStream.Close();

                //delete chunk
                localFileInfo.Delete();
            }

            return new UploadProcessingResult()
            {
                IsComplete = chunkMetaData.IsLastChunk,
                FileName = OriginalFileName,
                LocalFilePath = chunkMetaData.IsLastChunk ? filePath : null,
                FileMetadata = _streamProvider.FormData
            };

        }

        private string UserLocalPath
        {
            get
            {
                return "./";           
            }
        }

        private string LocalFileName
        {
            get
            {
                MultipartFileData fileData = _streamProvider.FileData.FirstOrDefault();
                return fileData.LocalFileName;
            }
        }

        private string OriginalFileName
        {
            get
            {
                MultipartFileData fileData = _streamProvider.FileData.FirstOrDefault();
                return fileData.Headers.ContentDisposition.FileName.Replace("\"", string.Empty);
            }
        }
    }
}
