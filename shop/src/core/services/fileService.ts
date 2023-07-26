import axios from "axios";
class FileService {
    static async uploadFile(file: File, token: string) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post<string>(`File/Upload`, formData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    }
    static getAspNetCoreFileUrl(fileName: string) {
        if (fileName.startsWith("http")) return fileName;
        return `/asp-net/api/File/GetAspNetCoreFile/${fileName}`;
    }
}
export default FileService;
