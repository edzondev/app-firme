import { useForm } from "react-hook-form";
import {
  AddContactFormData,
  addContactSchema,
} from "../schemas/add-contact.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiAddContact } from "@/modules/contacts/hooks/use-api-contacts";

export default function useAddContact() {
  const { mutateAsync: addContact } = useApiAddContact();
  const form = useForm<AddContactFormData>({
    resolver: zodResolver(addContactSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      relationShip: "madre",
    },
  });

  const handleSubmit = async () => {
    const values = form.getValues();
    await addContact(values);
  };

  return {
    form,
    handleSubmit,
  };
}
