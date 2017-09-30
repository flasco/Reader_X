
export default class getNet {
    static refreshChapter(booklist, callback) {
        for (let i = 0, j = booklist.length; i < j; i++) {
            let bookChapterLst = `${booklist[i].bookName}_${booklist[i].plantformId}_list`;
            let latech = booklist[i].latestChapter;
            let url = 'https://testdb.leanapp.cn/Analy_x?action=1&url=' + booklist[i].url;
            // console.log(url);
            this.get(url, bookChapterLst, latech, (latechap) => {
                if(latechap === -1){
                    callback(`[${booklist[i].bookName}]抓取章节失败......`);
                    return;
                }
                booklist[i].latestChapter = latechap;
                callback(0);
            });
        }
    }

    /**
     * 
     * @static
     * @param {any} book 
     * @param {any} callback 需要一个回调函数来通知主界面的toast提示。
     * @memberof getNet
     */
    static refreshSingleChapter(book,callback) {
        let bookChapterLst = `${book.bookName}_${book.plantformId}_list`;
        let latech = book.latestChapter;
        let url = 'https://testdb.leanapp.cn/Analy_x?action=1&url=' + book.url;
        this.get(url, bookChapterLst, latech, (latechap) => {
            if(latechap === -1){
                callback(`[${book.bookName}]抓取章节失败......`);
                return;
            }
            book.latestChapter = latechap;
        });
    }

    static get(url, bookChapterLst, latech, callback) {
        axios.get(url, { timeout: 5000 }).then(Response => {
            let data = Response.data.reverse();
            let tit = data[0].title.length > 25 ? data[0].title.substr(0, 18) + '...' : data[0].title;
            callback(tit);
            if (tit === latech) {
                return;
            } else {
                let n = [];
                let i = 0;

                while (i < data.length) {
                    n.push({
                        key: data[i].url,
                        title: (data[i].title.length > 25 ? data[i].title.substr(0, 18) + '...' : data[i].title)
                    });
                    i++;
                }
            }
        }).catch(Error=>{
            callback(-1)
            return ;
        })
    }

}