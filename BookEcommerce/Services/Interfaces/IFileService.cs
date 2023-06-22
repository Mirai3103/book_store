namespace BookStore.Services.Interfaces
{
    public interface IFileService
    {
        string SaveFile(IFormFile file);
        Task<string> SaveFileAsync(IFormFile file);
        ICollection<string> SaveFiles(IFormFileCollection files);
        Task<ICollection<string>> SaveFilesAsync(IFormFileCollection files);
        public Stream GetFile(string fileName);
        public Task DeleteFileAsync(string fileName);
        public Task DeleteFilesAsync(ICollection<string> fileNames);
    }
}
