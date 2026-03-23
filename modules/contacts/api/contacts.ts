import { apiFetch } from "@/core/lib/api";

export async function getContacts() {
    const response = await apiFetch("/contacts");
    return response;
}