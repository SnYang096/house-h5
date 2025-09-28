/* eslint-disable @typescript-eslint/no-explicit-any */

import http, { ApiResponse } from './http';
import { prefix } from '.';
import { rentTypes } from '@/constants/house';

export interface HouseDetailResponse {
  source: number
  userId: number
  companyId: any
  communityName: string
  houseNo: string
  houseNoHide: boolean
  address: string
  houseType: string
  rentingType: rentTypes
  id: number
  parentId: any
  parentCommunityName: any
  parentUser: ParentUser
  province: string
  city: string
  district: string
  adcode: string
  geoId: string
  geoTitle: string
  lng: number
  lat: number
  distance: any
  houseRooms: HouseRoom[]
  houseStations: HouseStation[]
  isCollect: boolean
  collectionRemark: any
}

export interface ParentUser {
  id: number
  unionId: any
  openId: any
  type: number
  nickname: string
  sex: any
  weiNo: string
  identity: string
  province: any
  city: any
  headImgUrl: any
  invitationCode: string
  weiQrCodePath: any
  phone: string
  inviterId: number
  signature: any
  createTime: string
  updateTime: string
  del: number
  creator: any
  updator: any
  companyId: any
  managerUserId: any
  identityCard: any
  realName: any
  defaultContractTemplateShow: boolean
  source: number
  lastLoginTime: any
}

export interface HouseRoom {
  id: number
  houseId: number
  roomNo: string
  houseType: string
  size: number
  rental: number
  downTime: any
  launchTime: string
  star: number
  permissionType: string
  videoInfo: any
  copyContent: any
  description: string
  descriptionAgent: string
  status: string
  memo: any
  houseAttributes: any[]
  createTime: string
  updateTime: string
  del: number
  creator: string
  updator: string
  renterAddressBookReCommendId: any
  houseRoomLabels: any[]
  collectRemark: any
}

export interface HouseStation {
  id: number
  houseId: number
  stationId: number
  subwayId: number
  cityCode: string
  cityName: string
  subway: string
  stationName: string
}

export const getHouseDetail = (id: string | number): Promise<ApiResponse<HouseDetailResponse>> => {
  return http.get(`${prefix}/house/room/${id}`, {});
}

