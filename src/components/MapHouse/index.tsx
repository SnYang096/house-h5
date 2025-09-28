/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useRef } from 'react';
import { MultiMarker, TMap } from 'tlbs-map-react';

const MapApiKey = import.meta.env.VITE_MAP_API_KEY;

// 3. 定义组件 Props
interface MapHouseProps {
  lat?: number;
  lng?: number;
}

const MapHouse = ({ lat, lng }: MapHouseProps) => {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  
  const styles = {
    multiMarkerStyle: {
      width: 20,
      height: 30,
      anchor: { x: 10, y: 30 },
    },
  };

  const geometries = useMemo(() => {
    if (!lat || !lng) {
      return [];
    }
    console.log("经纬度信息", { lat, lng });

    return [
      {
        styleId: 'multiMarkerStyle',
        position: { lat, lng },
      },
    ];
  }, [lat, lng]);

  if (!lat || !lng) {
    return (
      <div style={{ width: '100%', height: '200px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        📍 请传入有效的经纬度
      </div>
    );
  }

  return (
    <div>
      <TMap
        ref={mapRef}
        apiKey={MapApiKey}
        center={{ lat, lng }}
        options={{
          zoom: 15,
          center: { lat, lng },
        }}
      >
        <MultiMarker
          ref={markerRef}
          styles={styles}
          geometries={geometries}
        />
      </TMap>
    </div>
  );
};

export default MapHouse;