import { ProviderDto } from "@appTypes/server-dto/providerDto";
import axios from "axios";
import { camelCaseToPascalCase } from "@/utils";
class ProviderApiService {
    static async getAllProviders(page: number, limit: number, search = "", orderBy = "id", isAscending = true) {
        const response = await axios.get(
            `Provider?page=${page}&limit=${limit}&search=${search}&orderBy=${camelCaseToPascalCase(
                orderBy
            )}&isAscending=${isAscending}`
        );
        return response.data;
    }
    static async deleteProvider(id: number) {
        const response = await axios.delete(`Provider/${id}`);
        return response.data;
    }
    static async getProviderById(id: number) {
        const response = await axios.get(`Provider/${id}`);
        return response.data;
    }
    static async createProvider(createProviderDto: Omit<ProviderDto, "id">) {
        const response = await axios.post("Provider", createProviderDto);
        return response.data;
    }
    static async updateProvider(id: number | string, updateProviderDto: ProviderDto) {
        const response = await axios.put(`Provider/${id}`, updateProviderDto);
        return response.data;
    }
}

export default ProviderApiService;
