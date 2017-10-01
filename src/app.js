import AppNavigator from './screens';
import FetchMock from 'react-native-fetch-mock';

// mock data
const fetch = new FetchMock(require('../__mocks__')).fetch;
global.fetch = fetch;

export default AppNavigator;
