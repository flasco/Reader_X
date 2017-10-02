import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import defaultTheme from './default';
import blackTheme from './black';

const _themes = Symbol('themes');
const _current = Symbol('current');

class Theme {
  constructor() {
    this[_themes] = {};
    this[_themes]['default'] = defaultTheme;
    this[_themes]['black'] = blackTheme;

    this[_current] = 'default';
  }

  get styles() {
    return this[_themes][this[_current]];
  }

  set current(name) {
    if (name !== 'default' && name !== 'black') {
      throw `no named ${name} theme could be foud.`;
    }
    this[_current] = name;
  }

  get current() {
    return this[_current];
  }

}

let globalTheme = new Theme();

class ThemeProvider extends Component {
  constructor(props) {
    super(props);

    this.theme = globalTheme;

    this.state = {
      active: 'default',
    };

    this.active = this.active.bind(this);
    this.load = this.load.bind(this);
    
    this.load();
  }

  async load() {
    try {
      const value = await AsyncStorage.getItem('@Reader_X:theme');
      if (value !== null){
        this.active(value);
      }
    } catch (error) {
      console.error(`change theme error ${JSON.stringify(error)}`);
    }
  }

  active(name = 'default') {
    this.theme.current = name;
    this.setState({
      active: name,
    }, async () => {
      // save to localstorage
      try {
        await AsyncStorage.setItem('@Reader_X:theme', name);
      } catch (error) {
        console.error(`set theme ${name} error ${JSON.stringify(error)}`);
      }
    });
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        screenProps: {
          activeTheme: this.active,
        },
      })
    );

    return (
      <View style={{ flex: 1 }}>
        {childrenWithProps}
      </View>
    );
  }
}

export default ThemeProvider;
export { globalTheme as theme };
export const {width, height, colors, weight, size} = globalTheme.styles.variables;
