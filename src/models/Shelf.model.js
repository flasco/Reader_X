
class Shelf {
}

Shelf.schema = {
  name: 'Shelf',
  primaryKey: 'BookId',
  properties: {
    BookId:                   'int',                                                      // 图书编号
    BookName:                 'string',                                                   // 图书名称
    AuthorId:                 'int',                                                      // 图书作者编号
    Author:                   'string',                                                   // 图书作者
    Description:              'string',                                                   // 图书描述
    Label:                    {type: 'string', optional: true},                           // 图书tag
    LastUpdateChapterName:    'string',                                                   // 最新更新章节名称
    LastReadedTime:           {type: 'int', optional: true, indexed: true},               // 上次阅读时间，时间戳
    LastChapter:              {type: 'string', optional: true},                           // 最近阅读章节
    Progress:                 {type: 'double', optional: true},                           // 阅读进度
  },
}

export default Shelf;
