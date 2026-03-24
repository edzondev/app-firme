import { Field, FieldError } from "@/core/components/ui/field";
import { cn } from "@/core/lib/utils";
import { Car } from "lucide-react-native";
import { Controller, useFormContext } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { SosSchemaOutput } from "../../schemas/sos.schema";

export type AppId = "indrive" | "uber" | "didi" | "yango" | "cabify" | "otro";

const APPS: { id: AppId; name: string; color: string }[] = [
  { id: "indrive", name: "inDrive", color: "#2BC44F" },
  { id: "uber", name: "Uber", color: "#000000" },
  { id: "didi", name: "DiDi", color: "#FF7A28" },
  { id: "yango", name: "Yango", color: "#FF3E3E" },
  { id: "cabify", name: "Cabify", color: "#7B61FF" },
  { id: "otro", name: "Otro", color: "#9CA3AF" },
];

function AppCard({
  app,
  selected,
  onSelect,
}: {
  app: (typeof APPS)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <Pressable onPress={onSelect} className="flex-1">
      <View
        className={cn(
          "border-2 rounded-2xl p-4 items-center gap-2",
          selected
            ? "border-green-600 bg-green-50"
            : "border-transparent bg-white",
        )}
      >
        <View
          className="rounded-xl p-3"
          style={{
            backgroundColor: `${app.color}10`, // 10 = 6% opacity
          }}
        >
          <Car size={22} color={app.color} />
        </View>
        <Text className="text-sm font-semibold text-gray-800 text-center">
          {app.name}
        </Text>
      </View>
    </Pressable>
  );
}

export default function AppSelectorStep() {
  const { control, getValues, setValue } = useFormContext<SosSchemaOutput>();

  return (
    <Controller
      control={control}
      name="appName"
      render={({ fieldState }) => (
        <Field>
          <View className="gap-3">
            <View className="flex-row gap-3">
              {APPS.slice(0, 3).map((app) => (
                <AppCard
                  key={app.id}
                  app={app}
                  selected={getValues("appName") === app.id}
                  onSelect={() =>
                    setValue("appName", app.id, { shouldDirty: true })
                  }
                />
              ))}
            </View>
            <View className="flex-row gap-3">
              {APPS.slice(3, 6).map((app) => (
                <AppCard
                  key={app.id}
                  app={app}
                  selected={getValues("appName") === app.id}
                  onSelect={() =>
                    setValue("appName", app.id, { shouldDirty: true })
                  }
                />
              ))}
            </View>
          </View>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
