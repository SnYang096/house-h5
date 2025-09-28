export const downloadFile = (url: string, filename: string) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename; // 设置下载的文件名
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};