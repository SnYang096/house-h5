/* eslint-disable @typescript-eslint/no-unused-vars */
import { getHouseDetail, HouseDetailResponse } from '@/services/house';
import { Box, Button, Heading, Text, Image, Flex } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'; // Import Swiper styles
import HouseRF from '@/assets/images/houserf.png'
import 'swiper/css/navigation';

import 'swiper/css';
import './index.scss'
import { useEffect, useMemo, useState } from 'react';
import { houseType, rentTypes } from '@/constants/house';
import { downloadVideo, replaceWhitespaceUnlessPhoneNumber } from '@/utils';
import { useSearchParams } from 'react-router';
import { downloadFile } from '@/utils/download';
import MapHouse from '@/components/MapHouse';
import toast from 'react-hot-toast';

export default function House() {

  const [houseDetail, setHouseDetail] = useState<HouseDetailResponse | null>(null);
  const [searchParams] = useSearchParams();
  const showFullInfo = searchParams.get('showFullInfo');


  useEffect(() => {

    (async () => {
      const id = searchParams.get('id');
      if (id) {
        const response = await fetchHouseDetail(id);
        setHouseDetail(response?.result || null);
      }
    })()
  }, [searchParams])

  const formatDescription = (desc: string) => {
    return desc.replace(/(看房电话|联系方式|联系电话)\s*[:：]?\s*\d{11}\s*|\b\d{11}\b/g, '').replace(/#小程序:\/\/[^\s]*/g, '').trim();
  }

  const room = useMemo(() => {
    const room = houseDetail?.houseRooms ? houseDetail?.houseRooms[0] : null;
    if (!room) return null
    room.description = replaceWhitespaceUnlessPhoneNumber(room.description);

    return room;
  }, [houseDetail]);

  const addressName = useMemo(() => {
    return houseDetail?.rentingType === rentTypes.ENTIRE_TENANCY
      ? houseDetail?.communityName + (houseDetail?.houseNoHide ? '' : houseDetail?.houseNo)
      : `${houseDetail?.communityName}${houseDetail?.houseNoHide ? '' : houseDetail?.houseNo}·${room?.roomNo != null ? room?.roomNo : ''}`;
  },
    [houseDetail, room]);

  const imageUrls = useMemo(() => {
    return houseDetail?.houseRooms[0]?.houseAttributes?.map(attr => attr.attrValue) || [];
  }, [houseDetail]);

  const videoUrl = useMemo(() => {
    return houseDetail?.houseRooms[0]?.videoInfo || '';
  }, [houseDetail]);

  const description = useMemo(() => {

    if (showFullInfo) return room?.description;
    return formatDescription(room?.description ?? '');
  }, [room, showFullInfo]);



  const fetchHouseDetail = async (id: string | number) => {
    try {
      const response = await getHouseDetail(id);
      return response;
      // console.log("response", response);
      // const response = JSON.parse(JSON.stringify(Mock));
      // setHouseDetail(response?.result || null);
    } catch (error) {
      console.log('Error fetching house houseDetail:', error);
    }
  }

  const handlePreview = (url: string) => {
    window.open(url, '_blank');
  }
  const handleDownloadAll = () => {
    let delay = 0;
    setTimeout(() => {
      downloadVideo(videoUrl);
      delay += 1000;
    }, delay);

    // 下载图片
    imageUrls.forEach((url, index) => {
      setTimeout(() => {
        downloadFile(url, `house-image-${index + 1}.jpg`);
      }, delay);
      delay += 1000; // 每张图片间隔 1 秒
    });
    
  };

  const handleCopy = () => { 
    if (!description) return;
    navigator.clipboard.writeText(description).then(() => {
      toast('复制成功');
    }).catch(err => {
      toast("复制失败!");
    });
  }

  const phoneNumbers = useMemo(() => {
    const phoneSet = new Set<string>();

    if (room?.description) {
      // 匹配连续 11 位数字
      const matches = room.description.match(/[0-9]{11}/g);
      if (matches) {
        matches.forEach((num) => phoneSet.add(num));
      }
    }

    const phones = Array.from(phoneSet);
    if (phones.length > 1) { 
      return phones; // 多个号码时排序返回
    }

    return []; // 转为数组返回
  }, [room?.description]); 


  return (
    <Box textAlign="center" bg="gray.50" minH="60vh">
      <Heading mb={4}>房源详情</Heading>
      <Swiper spaceBetween={0} slidesPerView={1} navigation height={208} modules={[Navigation]}>
        {houseDetail?.houseRooms[0]?.videoInfo && (
          <SwiperSlide>
            <video
              controls
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              src={houseDetail.houseRooms[0].videoInfo}
            />
          </SwiperSlide>
        )}
        {houseDetail?.houseRooms[0]?.houseAttributes?.map((attr, idx) => (
          <SwiperSlide key={idx}>
            <Image
              as="img"
              src={attr.attrValue}
              alt=""
              w="100%"
              h="300px"
              objectFit="cover"
              cursor="pointer"
            // onClick={() => handlePreview(attr.attrValue)}
            />
          </SwiperSlide>
        ))}

        {!houseDetail?.houseRooms[0]?.houseAttributes?.length && (
          <SwiperSlide>
            <Image
              as="img"
              src={HouseRF}
              alt=""
              w="100%"
              h="300px"
              objectFit="cover"
            />
          </SwiperSlide>
        )}
      </Swiper>
      <Button mt={1} onClick={handleDownloadAll}>一键下载图片</Button>
      {/* <Box
        display="flex"
        flexDirection="column"
        p={5}
        pt={3}
        pb={6}
        m={2}
        borderRadius="md"
        bg="white"
      >
        <Flex alignItems="center" mt={3}>
          <Text
            // color="#878a8f"
            fontSize="xl" // 24rpx
            fontWeight="500"
          >
            {addressName}
          </Text>
        </Flex>
         <Flex mt={2}>
          <Text
            fontSize="sm"
            fontWeight="normal"
            color="black"
            lineHeight="shorter"
            textAlign={"left"}
          >
            {houseDetail?.address}
          </Text>
        </Flex>

        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          mt={3}
        >
          {houseDetail?.houseStations.map((station, index) => (
            <Text
              key={`station-${index}`}
              fontSize="sm"
              bg="#eff3f5"
              color="#878a8f"
              borderRadius="sm"
              p={1}
              fontWeight="500"
            >
              {station.subway ? `${station.subway} · ` : ''}
              {station.stationName || ''}
            </Text>
          ))}

          {houseDetail?.houseRooms.map((room, roomIndex) =>
            room.houseRoomLabels.map((label, labelIndex) => (
              <Text
                key={`room-label-${roomIndex}-${labelIndex}`}
                fontSize="sm"
                bg="#eff3f5"
                color="#878a8f"
                borderRadius="sm"
                p={1}
                fontWeight="500"
              >
                {label.label || ''}
              </Text>
            ))
          )}
        </Box>

       
        <Flex justifyContent="space-between" mt={4}>
          <Flex flexDirection="column" alignItems="center">
            <Text
              fontSize="lg" // 32rpx
              fontWeight="500"
              color="gray.700"
            >
              {houseType[houseDetail?.rentingType ?? rentTypes.ENTIRE_TENANCY]}
            </Text>
            <Text fontSize="xs" color="gray.500">
              房型
            </Text>
          </Flex>
          <Flex flexDirection="column" alignItems="center">
            <Text
              fontSize="lg" // 32rpx
              fontWeight="500"
              color="rgba(244, 120, 61, 1)"
            >
              {houseDetail?.houseRooms[0]?.rental}
            </Text>
            <Text fontSize="xs" color="gray.500">
              租金
            </Text>
          </Flex>

          <Flex flexDirection="column" alignItems="center">
            <Text fontSize="lg" fontWeight="500">
              {room?.houseType}
            </Text>
            <Text fontSize="xs" color="gray.500">
              房型
            </Text>
          </Flex>

          <Flex flexDirection="column" alignItems="center">
            <Text fontSize="lg" fontWeight="500" color="gray.700">
              {room?.size}㎡
            </Text>
            <Text fontSize="xs" color="gray.500">
              大小
            </Text>
          </Flex>
        </Flex>
      </Box> */}
      <Box
        display="flex"
        flexDirection="column"
        p={5}
        pt={3}
        pb={6}
        m={2}
        borderRadius="md"
        bg="white"
      >
        <Flex alignItems="center" justify="space-between" mt={3} mb={5}>
          <Text fontSize="md" fontWeight="semibold" textAlign="left">房屋描述: </Text>
          <Button  border="" p={0} h="max-content" display="flex" alignItems="center" justifyContent="center" onClick={handleCopy}><Text  fontSize="sm" fontWeight="semibold" textAlign="left">复制</Text></Button>
        </Flex>
      
        <Text fontSize="sm" fontWeight="semibold" mb={2} textAlign="left">{description}</Text>
      </Box>
      <Box display="flex">
        {phoneNumbers.length > 0 && phoneNumbers.map(phone => {
          return <Button key={phone} m={2} onClick={() => {window.location.href = `tel:${phone}`}}>拨打: {phone}</Button> 
        })}
      </Box>

      {houseDetail?.lat && <Box
        display="flex"
        flexDirection="column"
        p={1}
        m={2}
        borderRadius="md"
        bg="white"
        // minH={"300px"}
      >
        <MapHouse lat={houseDetail?.lat} lng={houseDetail?.lng} />
      </Box>}
    </Box>
  )
}