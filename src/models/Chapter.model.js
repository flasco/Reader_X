
class Chapter {
}

Chapter.schema = {
  name: 'Chapter',
  properties: {
    BookId:            {type: 'int'},                         // 章节所属Book
    ChapterId:         {type: 'int',indexed: true},           // 章节编号
    Title:             {type: 'string'},                      // 章节名称
    Content:           {type: 'string',default:''},           // 章节内容
  },
}

export default Chapter;
