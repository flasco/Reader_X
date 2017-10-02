import React, { Component } from 'react';
import { View } from 'react-native';
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
    if (name !== 'default' || name !== 'black') {
      throw `no named ${name} theme could be foud.`;
    }
    this[_current] = name;
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
  }

  active(name = 'default') {
    this.theme.current = name;
    this.setState({
      active: name,
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.children}
      </View>
    );
  }
}

export default ThemeProvider;
export { globalTheme as theme };
export { width, height, colors, weight, size } from './default/variables';
