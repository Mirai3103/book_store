import { PublisherDto } from "@appTypes/server-dto/publisherDto";
import axios from "axios";
import { camelCaseToPascalCase } from "@/utils";
import { PaginationDto } from "../types/server-dto/paginationDto";
class PublisherApiService {
    static async getAllPublishers(page: number, limit: number, search = "", orderBy = "id", isAscending = true) {
        const response = await axios.get<PaginationDto<PublisherDto>>(
            `Publisher?page=${page}&limit=${limit}&search=${search}&orderBy=${camelCaseToPascalCase(
                orderBy
            )}&isAscending=${isAscending}`
        );
        return response.data;
    }
    static async deletePublisher(id: number) {
        const response = await axios.delete(`Publisher/${id}`);
        return response.data;
    }
    static async getPublisherById(id: number) {
        const response = await axios.get(`Publisher/${id}`);
        return response.data;
    }
    static async createPublisher(createPublisherDto: Omit<PublisherDto, "id">) {
        const response = await axios.post("Publisher", createPublisherDto);
        return response.data;
    }
    static async updatePublisher(id: number | string, updatePublisherDto: PublisherDto) {
        const response = await axios.put(`Publisher/${id}`, updatePublisherDto);
        return response.data;
    }
}

export default PublisherApiService;
