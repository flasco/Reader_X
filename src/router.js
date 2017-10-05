
import { NavigationActions } from 'react-navigation';

// gets the current screen from navigation state
const getCurrentRoute = (navigationState) => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRoute(route);
  }
  return route;
}

const _routes = Symbol('routes');
const _current = Symbol('current');

class Router {
  constructor() {
    this[_routes] = [];
    this[_current] = 0;
  }

  get first() {
    return this[_current] === 0;
  }

  get prev() {
    if (this.first) return null;
    return this[_routes][this[_current] - 1];
  }

  navigate(navigation, routeName, params, action) {
    this[_routes].push({
      routeName,
      params,
      action,
    });
    this[_current]++;
    navigation.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
        action,
      })
    );
  }

  goBack(navigation, key) {
    this[_routes].pop();
    navigation.dispatch(
      NavigationActions.back({
        key: undefined,
      })
    )
  }

}

export default Router;
