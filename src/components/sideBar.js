import React, {Component} from 'react';
import {
  Content,
  Icon,
  Text,
  List,
  ListItem,
} from 'native-base';
import SideBarHeader from '../components/sideBarHeader';
import {View, TouchableOpacity} from 'react-native';
import { NavigationActions } from 'react-navigation';
import {connect} from 'react-redux';
import {deleteUser} from '../actions/index';

class SideBar extends Component {
  goToMyCourses()
  {
    this.props.closeDrawer();
    this.props.navigation.navigate('MyCourses');
  }

  goToLogin()
  {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Login' })],
    });
    this.props.navigation.dispatch(resetAction);
    this.props.deleteUser();
  }

  render() {
    return (
      <Content style={{backgroundColor: 'white'}}>
        <SideBarHeader user={this.props.user} />
          <List>
            <ListItem>
            <TouchableOpacity style={{flexDirection:'row',padding:3}} onPress={()=>this.goToMyCourses()}>
                <Icon name='paper'/>
                <Text style={{paddingStart:10,fontSize:20}}>My Courses</Text>
                </TouchableOpacity>
            </ListItem>

            <ListItem>
            <TouchableOpacity style={{flexDirection:'row',padding:3}} onPress={()=>this.goToLogin()}>
                <Icon name='close-circle'/>
                <Text style={{paddingStart:10,fontSize:20}}>Log Out</Text>
                </TouchableOpacity>
            </ListItem>
          </List>
      </Content>
    );
  }
}
const mapStateToProps = state=>{
  return {
    user:state.auth.user
  };
};
export default connect(mapStateToProps,{deleteUser})(SideBar);
