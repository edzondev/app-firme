import * as Contacts from "expo-contacts";
import { useCallback, useEffect, useRef, useState } from "react";

type ContactsStatus = "idle" | "loading" | "granted" | "denied" | "error";

interface UseContactsReturn {
  contacts: Contacts.Contact[];
  status: ContactsStatus;
  error: Error | null;
  refetch: () => Promise<void>;
}

export default function useContacts(): UseContactsReturn {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [status, setStatus] = useState<ContactsStatus>("idle");
  const [error, setError] = useState<Error | null>(null);

  // advanced-init-once: evita doble ejecución en StrictMode y remounts
  const didFetch = useRef(false);

  const getContacts = useCallback(async () => {
    setStatus("loading");
    setError(null);

    try {
      const { status: permissionStatus } =
        await Contacts.requestPermissionsAsync();

      if (permissionStatus !== "granted") {
        setStatus("denied");
        return;
      }

      const { data } = await Contacts.getContactsAsync();
      setContacts(data);
      setStatus("granted");
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch contacts"),
      );
      setStatus("error");
    }
  }, []); // estable: no depende de estado externo

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    getContacts();
  }, [getContacts]); // dep completa, sin warnings

  return { contacts, status, error, refetch: getContacts };
}
