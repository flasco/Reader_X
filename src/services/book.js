import rest, { GET, POST, PUT } from '../utils/rest';

const ServerIp = 'https://book.whatakitty.com';

export async function list(key, pageIndex = 1) {
  return await GET(ServerIp + '/api/v1/books', {
    key,
    pageIndex,
  });
}

export async function history() {
  return await GET(ServerIp + '/api/v1/history');
}

export async function item(id) {
  return await GET(ServerIp + `/api/v1/books/${id}`);
}

export async function content(bookId, chapterId, source = 'bqg') {
  // console.log(`${bookId}   ${chapterId}`);
  return await GET(ServerIp + `/api/v1/books/${source}/${bookId}/${chapterId}`);
}

export async function chapterList(bookId, source = 'bqg') {
  return await GET(ServerIp + `/api/v1/books/${source}/${bookId}/chapters`);// api/v1/books/bqg/1009265821/chapters
}

export async function recommends() {
  let { data, err } = await GET(ServerIp + '/api/v1/books/recommends');
  let books = [];
  if (!err) {
    for (let i = 0, j = data.Group.length; i < j; i++) {
      books.push(...data.Group[i].Data)
    }
    data = books;
    // return { data };
  }

  return { data, err };


}

