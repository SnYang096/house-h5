import React from 'react';
import { downloadFile } from '@/utils/download'; // 上面的工具函数

// 假设这是你从接口获取到的图片和视频 URL 列表
const imageUrls = [
  'https://via.placeholder.com/300x200.png?text=Image+1',
  'https://via.placeholder.com/300x200.png?text=Image+2',
];

const videoUrls = [
  'https://www.w3schools.com/html/mov_bbb.mp4', // 示例视频 URL（请换成你自己的）
];

export const HouseMediaDownload: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>📸 房源媒体下载</h2>

      <section>
        <h3>🖼️ 图片下载</h3>
        {imageUrls.map((url, index) => (
          <button
            key={`img-${index}`}
            onClick={() => downloadFile(url, `house-image-${index + 1}.jpg`)}
            style={{
              margin: '5px',
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            下载图片 {index + 1}
          </button>
        ))}
      </section>

      <section>
        <h3>🎥 视频下载</h3>
        {videoUrls.map((url, index) => (
          <button
            key={`vid-${index}`}
            onClick={() => downloadFile(url, `house-video-${index + 1}.mp4`)}
            style={{
              margin: '5px',
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            下载视频 {index + 1}
          </button>
        ))}
      </section>
    </div>
  );
};