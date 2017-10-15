
import Realm, { SortDescriptor } from 'realm';

import Shelf from './Shelf.model';
import History from './History.model';

const realm = new Realm({schema: [Shelf, History]});
export default realm;
export {
  SortDescriptor
};
