import type { AxiosResponse } from "axios";
import { Campus, Category, ReportType, type HistoryLostItem, type LostItem, type UploadedFile } from "../types";
import axios from "axios";

export async function getLostItems(category: Category | null, campus: Campus | null, description: string | null): Promise<Array<LostItem>> {

    const params: {
        category?: Category;
        campus?: Campus;
        description?: string;
    } = {};

    if (category) params.category = category;
    if (campus) params.campus = campus;
    if (description) params.description = description;

    const response: AxiosResponse<Array<LostItem>> = await axios.get("http://localhost:8000/item/all", {
        params
    });

    return response.data;
}

export async function saveItem(category: Category, campus: Campus, description: string, imageName: string): Promise<LostItem> {
    const body = {
        category: category,
        campus: campus,
        description: description,
        image: imageName
    };
    const response: AxiosResponse<LostItem> = await axios.post("http://localhost:8000/item/save", body);
    return response.data;
};

export async function reportItem(itemId: number, reportType: ReportType): Promise<void> {
    const body = {
        id: itemId,
        reportType: reportType
    };
    await axios.patch("http://localhost:8000/item/report", body);
};

export async function uploadFile(image: File): Promise<UploadedFile> {
    const formData = new FormData();
    formData.append("file", image);
    const response: AxiosResponse<UploadedFile> = await axios.post("http://localhost:8000/upload-file", formData, {});
    return response.data;
}

export async function getHistoryLostItems(category: Category | null, campus: Campus | null, description: string | null, reportType: ReportType | null): Promise<Array<HistoryLostItem>> {

    const params: {
        category?: Category;
        campus?: Campus;
        description?: string;
        reportType?: ReportType
    } = {};

    if (category) params.category = category;
    if (campus) params.campus = campus;
    if (description) params.description = description;
    if (reportType) params.reportType = reportType;

    const response: AxiosResponse<Array<HistoryLostItem>> = await axios.get("http://localhost:8000/item/history", {
        params
    });

    return response.data;
};