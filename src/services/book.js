import rest, { GET, POST, PUT } from '../utils/rest';

export async function list() {
  return await GET('/api/v1/books');
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

