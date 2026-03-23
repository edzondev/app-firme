import { apiFetch } from "@/core/lib/api";
import type { Tables } from "@/database.types";

type RecentContactsResponse = Tables<"emergency_contacts">[];

export async function getContacts() {
  try {
    const response = await apiFetch<RecentContactsResponse>("/contacts");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addContact(contact: any) {
  try {
    const response = await apiFetch("/contacts", {
      method: "POST",
      body: JSON.stringify(contact),
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
