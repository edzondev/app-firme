import useLocation from "@/core/hooks/use-location";
import MapBox, { Camera, LocationPuck } from "@rnmapbox/maps";
import { memo, useEffect, useRef } from "react";
import { Platform } from "react-native";

MapBox.setAccessToken(process.env.EXPO_PUBLIC_REACT_NATIVE_MAPBOX_TOKEN ?? "");

function MapView() {
  const { location } = useLocation();
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    if (location?.coords.longitude && location?.coords.latitude) {
      cameraRef.current?.setCamera({
        centerCoordinate: [
          location?.coords.longitude,
          location?.coords.latitude,
        ],
      });
    }
  }, [location]);

  return (
    <MapBox.MapView
      styleURL={MapBox.StyleURL.Street}
      style={{
        flex: 1,
      }}
      projection="mercator"
      scaleBarEnabled={false}
      surfaceView={false}
      compassEnabled={false}
      logoPosition={
        Platform.OS === "android" ? { bottom: 5, left: 5 } : undefined
      }
      attributionPosition={
        Platform.OS === "android" ? { bottom: 5, right: 5 } : undefined
      }
    >
      <Camera
        ref={cameraRef}
        defaultSettings={{
          zoomLevel: 15,
          pitch: 0,
        }}
      />

      <LocationPuck
        puckBearingEnabled
        puckBearing="heading"
        pulsing={{ isEnabled: true }}
      />
    </MapBox.MapView>
  );
}

export default memo(MapView);
