import { camelCaseToPascalCase } from "@/utils";
import axios from "axios";
import { CreateSeriesDto, SeriesDto, UpdateSeriesDto } from "@appTypes/server-dto/seriesDto";

class SeriesApiService {
    static async createSeries(createSeriesDto: CreateSeriesDto): Promise<SeriesDto> {
        const res = await axios.post("Series", createSeriesDto);
        return res.data;
    }
    static async getAllSeries(page: number, limit: number, search = "", orderBy = "id", isAscending = true) {
        const response = await axios.get(
            `Series?page=${page}&limit=${limit}&search=${search}&orderBy=${camelCaseToPascalCase(
                orderBy
            )}&isAscending=${isAscending}`
        );
        return response.data;
    }
    public static async getSeriesById(id: number | string): Promise<SeriesDto> {
        const res = await axios.get(`Series/${id}`);
        return res.data;
    }
    public static async updateSeries(id: number, updateSeriesDto: UpdateSeriesDto): Promise<SeriesDto> {
        const res = await axios.put(`Series/${id}`, updateSeriesDto);
        return res.data;
    }

    public static async deleteSeries(id: number): Promise<void> {
        const res = await axios.delete(`Series/${id}`);
        return res.data;
    }
}

export default SeriesApiService;
