import api from '../api';
class FileService {
  getToken() {
    return localStorage.getItem('token');
  }
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await api.post<string>(`File/Upload`, formData, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
    return res.data;
  }
}
export default new FileService();
