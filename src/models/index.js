
import Realm, { SortDescriptor } from 'realm';

import Shelf from './Shelf.model';
import History from './History.model';
import Chapter from './Chapter.model';

const realm = new Realm({ schema: [Shelf, History, Chapter] });
export default realm;
export {
  SortDescriptor
};
