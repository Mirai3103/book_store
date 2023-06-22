export function randomUniqueString(): string {
  return Math.random().toString(36).substring(2);
}

export function camelCaseToPascalCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function getDiffTimeStr(date: Date | string): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const diffMinutes = Math.floor(diff / 60000);
  const diffHours = Math.floor(diff / 3600000);
  const diffDays = Math.floor(diff / 86400000);
  const diffMonths = Math.floor(diff / 2592000000);
  const diffYears = Math.floor(diff / 31536000000);
  if (diffMinutes < 60) {
    return `${diffMinutes} phút trước`;
  }
  if (diffHours < 24) {
    return `${diffHours} giờ trước`;
  }
  if (diffDays < 30) {
    return `${diffDays} ngày trước`;
  }
  if (diffMonths < 12) {
    return `${diffMonths} tháng trước`;
  }
  return `${diffYears} năm trước`;
}

export function toCurrencyFormat(price: number): string {
  return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export function toFullTimeFormat(date: Date | string): string {
  return new Date(date).toLocaleString('vi-VN');
}

export function imageURLToBlob(url: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onerror = reject;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        resolve(xhr.response);
      }
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  });
}

export function getServerImageURL(fileName: string | undefined | null): string {
  if (!fileName) {
    return '';
  }
  if (fileName.startsWith('http') || fileName.startsWith('blob')) {
    return fileName;
  }
  return `api/File/${fileName}`;
}
