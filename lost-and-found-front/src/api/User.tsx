import type { AxiosError, AxiosResponse } from "axios";
import { Campus, Category, type LostItem, type User } from "../types";
import axios, { isAxiosError } from "axios";

export async function getUser(email: string | null, password: string | null): Promise<User> {

    if (!email || email.trim().length === 0 || !password || password.trim().length === 0) {
        throw new Error("Email and/or password are incorrect");
    }

    const params: {
        username?: string;
        password?: string;
    } = {}; 

    params.username = email.trim();
    params.password = password.trim();

    const response: AxiosResponse<User> = await axios.get("http://localhost:8000/user/login", {
        params
    });

    return response.data;
}