import React, { useState, useEffect } from 'react';
import './index.scss';
import { getWeChatUrl } from '@/services/wechat';
import { useSearchParams } from 'react-router-dom';

const HomeIndex: React.FC = () => {
  const [hrefUrl, setHrefUrl] = useState<string>('');

   const [searchParams] = useSearchParams();

  useEffect(() => {
    // 获取 URL 参数
    (async () => {
      const id = searchParams.get('id');
      if (id) {
        const res = await getUrl(id);
        setHrefUrl(res?.data.result?.url)
      }
    })()
  }, [searchParams])

  const getUrl = async (param: string) => {
    try {
      const res = await getWeChatUrl(param);
      return res;
    } catch (error) {
      console.log('error', error);
    }
  }


  return (
    <div className="home-index">
      <div className="banner">
        <div className="welcome">租房、找房,就用妙房源</div>
        <div className="desc">海量房源,尽在妙房源</div>
      </div>
      <div className="home-button">
      {hrefUrl && <a href={hrefUrl} target="_blank" rel="noopener noreferrer">
        点击跳转小程序签署合同
      </a>}
      </div>
    </div>
  );
};

export default HomeIndex;