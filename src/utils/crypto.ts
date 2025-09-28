/* eslint-disable @typescript-eslint/no-explicit-any */

import CryptoJS from 'crypto-js';

// 🔐 设置一个密钥（请保管好，不要泄露。正式环境建议从环境变量读取！）
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY; // 可以改成任意字符串，但要保密！

/**
 * 加密数据
 * @param data 要加密的对象，如 { id: 41339, showFullInfo: 1 }
 * @returns 加密后的 Base64 字符串
 */
export const encryptParams = (data: Record<string, any>): string => {
  const str = JSON.stringify(data);
  return CryptoJS.AES.encrypt(str, SECRET_KEY).toString(); // 返回加密后的密文
};

/**
 * 解密数据
 * @param encryptedStr 加密的字符串
 * @returns 解密后的对象，如 { id: "41339", showFullInfo: "1" }
 */
export const decryptParams = (encryptedStr: string): Record<string, any> | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedStr, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted); // 解析为对象
  } catch (error) {
    console.error('解密失败:', error);
    return null; // 解密失败，返回 null
  }
};