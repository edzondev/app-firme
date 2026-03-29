import { Button } from "@/core/components/ui/button";

interface EndTripButtonProps {
  isEnding: boolean;
  onEndTrip: () => void;
}

export function EndTripButton({ isEnding, onEndTrip }: EndTripButtonProps) {
  return (
    <Button
      title={isEnding ? "Terminando..." : "Terminar viaje"}
      variant="outline"
      onPress={onEndTrip}
      disabled={isEnding}
      className="w-full"
    />
  );
}
