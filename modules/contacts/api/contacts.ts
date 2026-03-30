import { apiFetch } from "@/core/lib/api";
import type { Tables } from "@/database.types";

type RecentContactsResponse = Tables<"emergency_contacts">[];

export async function getContacts(signal?: AbortSignal) {
  return await apiFetch<RecentContactsResponse>("/contacts", { signal });
}

export async function addContact(contact: any) {
  const response = await apiFetch("/contacts", {
    method: "POST",
    body: JSON.stringify(contact),
  });
  return response;
}
