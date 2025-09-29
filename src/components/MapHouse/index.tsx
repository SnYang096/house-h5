/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState } from 'react';
import { MultiMarker, TMap } from 'tlbs-map-react';

const MapApiKey = import.meta.env.VITE_MAP_API_KEY;

interface MapHouseProps {
  lat?: number | null;
  lng?: number | null;
}

const MapHouse = ({ lat, lng }: MapHouseProps) => {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null); // 用于全屏的容器

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLandscape, setIsLandscape] = useState<boolean>(false);

  const styles = {
    multiMarkerStyle: {
      width: 20,
      height: 30,
      anchor: { x: 10, y: 30 },
    },
  };

  // 检查是否处于全屏状态
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // 进入全屏
  const enterFullscreen = async () => {
    if (!mapContainerRef.current) return;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    if (isIOS) { 
      setIsFullscreen(true);
      return;
    }

    try {
      // 可选：尝试锁定为横屏（移动端有效，需要用户手势触发）
      if (isLandscape && screen.orientation && (screen.orientation as any).lock) {
       await (screen.orientation as any).lock('landscape');// 或 'portrait'
      }

      await mapContainerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } catch (err) {
      console.error('进入全屏失败:', err);
    }
  };

  // 退出全屏
  const exitFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }

      // 恢复竖屏（可选）
      if (screen.orientation && screen.orientation.unlock) {
        await screen.orientation.unlock();
      }

      setIsFullscreen(false);
    } catch (err) {
      console.error('退出全屏失败:', err);
    }
  };

  // 切换横屏模式（用户手动选择是否横屏，比如通过 checkbox 或按钮）
  const toggleLandscape = () => {
    setIsLandscape((prev) => !prev);
  };

  // 如果没有经纬度，显示提示
  // if (lat == null || lng == null) {
  //   return (
  //     <div style={{ 
  //       width: '100%', 
  //       height: '200px', 
  //       background: '#f0f0f0', 
  //       display: 'flex', 
  //       alignItems: 'center', 
  //       justifyContent: 'center' 
  //     }}>
  //       📍 请传入有效的经纬度
  //     </div>
  //   );
  // }

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

  return (
    <div>
      {/* 控制栏：全屏 / 横屏 切换按钮（非全屏状态下显示） */}
      {!isFullscreen && (
        <div style={{ marginBottom: 8, display: 'flex', gap: 8 }}>
          <button
            onClick={enterFullscreen}
            style={{
              padding: '6px 12px',
              cursor: 'pointer',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: 4,
            }}
          >
            🖥️ 进入全屏
          </button>

          {/* <label style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={isLandscape}
              onChange={toggleLandscape}
            />
            🔄 进入横屏模式
          </label> */}
        </div>
      )}

      {/* 地图容器 —— 用于全屏 */}
      <div
        ref={mapContainerRef}
        style={{
          width: isFullscreen ? '100vw' : '100%',
          height: isFullscreen ? '100vh' : '400px', // 或其它默认高度
          position: isFullscreen ? 'fixed' : 'relative',
          top: isFullscreen ? 0 : undefined,
          left: isFullscreen ? 0 : undefined,
          zIndex: isFullscreen ? 9999 : undefined,
          backgroundColor: isFullscreen ? '#fff' : undefined,
        }}
      >
        <TMap
          ref={mapRef}
          apiKey={MapApiKey}
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

        {/* 全屏状态下显示退出按钮 */}
        {isFullscreen && (
          <div
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 1000,
            }}
          >
            <button
              onClick={exitFullscreen}
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: 4,
              }}
            >
              ❌ 退出全屏
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapHouse;