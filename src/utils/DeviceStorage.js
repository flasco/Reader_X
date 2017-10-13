import React, { Component } from 'react';
import {
  AsyncStorage,
} from 'react-native';

export default class DeviceStorage {
  static async get(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return ({data: JSON.parse(value)})
    } catch (err) {
      return ({err})
    }
  }

  static async getString(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return ({data: value})
    } catch (err) {
      return ({err})
    }
  }

  static async save(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return ({})
    } catch (err) {
      return ({err})
    }
  }

  static async saveString(key, value) {
    try {
      const value = await AsyncStorage.setItem(key, value);
      return ({})
    } catch (err) {
      return ({err})
    }
  }

  static async clear(key) {
    try {
      const value = await AsyncStorage.removeItem(key);
      return ({data: value})
    } catch (err) {
      return ({err})
    }
  }

  static async cleanAll() {
    try {
      await AsyncStorage.clear();
    } catch (err) {
      return ({err})
    }
  }

}