export const replaceWhitespaceUnlessPhoneNumber = (description: string) => {
  const phoneNumberPattern = /^\d{11}$/;
  
  // 分割字符串为单词数组，考虑任意数量的空格
  const words = description.split(/\s+/);

  // 处理每个部分
  const processedWords = words.map(word => {
    // 如果是11位数字的手机号，保持原样
    if (phoneNumberPattern.test(word)) {
      return word;
    }
    // 否则，去除所有空格
    return word.replace(/\s+/g, '');
  });

  // 将处理后的部分重新拼接成字符串
  return processedWords.join(' ');
}

export async function downloadVideo(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('网络请求失败');
    }

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'video.mp4'; // 自定义文件名
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // 释放内存
    setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
  } catch (error) {
    console.error('下载失败:', error);
  }
}

export async function downloadFile(url: string, filename: string = 'file') {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`网络请求失败: ${response.status}`);
    }

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename; // 例如：'image.png'、'video.mp4'
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // 延迟释放 Blob URL，确保下载完成
    setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
  } catch (error) {
    console.error('下载失败:', error);
    // 可以在这里加用户提示，比如 Toast 或 Alert
  }
}
