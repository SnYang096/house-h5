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