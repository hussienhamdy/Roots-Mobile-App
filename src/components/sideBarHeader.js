import React, { Component } from 'react';
import { Thumbnail,Container,Center,Content, Text, Button } from 'native-base';
import {View} from 'react-native';

export default class SideBarHeader extends Component {
  render() {
    return (
        <View style={{flex:1,backgroundColor:'#FDD835',padding:10}}>
            <View style={{justifyContent:'center',alignItems:'center'}}>
            <Thumbnail large source={require('../images/logo.png')} style={{width:300 , height:200}} />
            </View>
        </View>
    );
  }
}
