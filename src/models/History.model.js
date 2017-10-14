
class History {
}

History.schema = {
  name: 'History',
  properties: {
    BookId:               'int',          // 图书编号
    BookName:             'string',       // 图书名称
    Author:               'string',       // 图书作者
    Description:          'string',       // 图书描述
    Label:                'string',       // 图书tag
    LastReadedTime:       'int',          // 上次阅读时间，时间戳
  },
}

export default History;
