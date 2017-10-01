import rest, { GET, POST, PUT } from '../utils/rest';

export async function list() {
  return await GET('/api/v1/books');
}

export async function item(id) {
  return await GET(`/api/v1/books/${id}`);
}

