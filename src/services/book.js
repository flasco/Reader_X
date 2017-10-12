import rest, { GET, POST, PUT } from '../utils/rest';

const ServerIp = 'http://120.27.35.223:3000';

export async function list() {
  return await GET(ServerIp + '/api/v1/books');
}

export async function history() {
  return await GET('/api/v1/history');
}

export async function item(id) {
  return await GET(`/api/v1/books/${id}`);
}

export async function content(bookId,chapterId) {
  return await GET(`/api/v1/books/${bookId}/${chapterId}/content`);
}

export async function chapterList(bookId) {
  return await GET(`/api/v1/books/${bookId}/chapterList`);
}

