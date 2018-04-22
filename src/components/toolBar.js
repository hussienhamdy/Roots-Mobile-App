import React, {Component} from 'react';
import {Header,Body,Right,Button,Icon,Title} from 'native-base';
import {Text, View} from 'react-native';
import {Menu,MenuOptions,MenuOption,MenuTrigger,renderers} from 'react-native-popup-menu';
import { NavigationActions } from 'react-navigation';
import {deleteUser} from '../actions/index';
import {connect} from 'react-redux';
const { Popover } = renderers;

class ToolBar extends Component {
  openDrawer()
  {
    this.props.navigation.navigate('DrawerOpen');
  }

  goBack()
  {
    const backAction = NavigationActions.back({
    });
    this.props.navigation.dispatch(backAction);
  }


  logOut()
  {
    this.props.deleteUser()
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Login' })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  goToMyCourses()
  {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'MyCourses' })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  renderLeftButton()
  {
    if(this.props.type=='back')
    {
      return(
          <Button
            onPress={()=>this.goBack()}
            transparent
            style={{
            justifyContent: 'flex-start'
          }}>
            <Icon name='arrow-back' style ={{
              color: '#1A237E'
            }}/>
          </Button>
        );
    }
    else if (this.props.type=='menu')
    {
          return(
              <Button
                onPress={()=>this.openDrawer()}
                transparent
                style={{
                justifyContent: 'flex-start'
              }}>
                <Icon name='menu' style ={{
                  color: '#1A237E'
                }}/>
              </Button>
        );
    }
  }

  render() {
    return (
      <Header
        style={{
        backgroundColor: '#FDD835',
        flexDirection: 'row'
      }}>
      {this.renderLeftButton()}
        <Body>
          <Title style ={{color: '#1A237E'}} >ROOTS</Title>
        </Body>
        <Right>
        <Button transparent onPress={()=>this.goToMyCourses()}>
            <Icon name='home' style ={{color: '#1A237E'}}/>
        </Button>
        <Menu ref={(r)=>this.menu=r} renderer={Popover} rendererProps={{ placement: 'bottom' }}>
          <MenuTrigger triggerOuterWrapper>
          <Button transparent onPress={()=>{this.menu.open()}} >
            <Icon name='person' style ={{color: '#1A237E'}}/>
          </Button>
          </MenuTrigger>
          <MenuOptions>
            <MenuOption value={1}>
              <Text>My Profile</Text>
            </MenuOption>
            <MenuOption value={2}>
              <Text onPress={()=>this.logOut()}>Log Out</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
        </Right>
      </Header>
    );
  }
}
const mapStateToProps = state=>{
  return {
    user:state.auth.user
  };
};
export default connect(mapStateToProps,{deleteUser})(ToolBar);
