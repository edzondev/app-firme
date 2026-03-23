import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/core/components/ui/field";
import { Controller } from "react-hook-form";
import useAddContact from "../hooks/use-add-contact";
import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

export default function AddContactForm() {
  const { form, handleSubmit } = useAddContact();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1">
        <FieldGroup>
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Nombre</FieldLabel>
                <Input
                  {...field}
                  onChangeText={field.onChange}
                  value={field.value}
                  ref={field.ref}
                  keyboardType="default"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Email</FieldLabel>
                <Input
                  {...field}
                  onChangeText={field.onChange}
                  value={field.value}
                  ref={field.ref}
                  keyboardType="email-address"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="phone"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Telefono</FieldLabel>
                <Input
                  {...field}
                  onChangeText={field.onChange}
                  value={field.value}
                  ref={field.ref}
                  keyboardType="phone-pad"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button
            title={form.formState.isSubmitting ? "Guardando..." : "Guardar"}
            variant="primary"
            onPress={handleSubmit}
            className="disabled:opacity-50"
            disabled={form.formState.isSubmitting}
          />
        </FieldGroup>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
