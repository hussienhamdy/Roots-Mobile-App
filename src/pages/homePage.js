import React, {Component} from 'react';
import {
  Drawer,
  Container,
  Center,
  Content,
  Text,
  Button,
  Root
} from 'native-base';
import {View, StatusBar,ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import SideBar from '../components/sideBar';
import ToolBar from '../components/toolBar';
import {deleteUser} from '../actions/index';

class HomePage extends Component {
  static navigationOptions = {
    };

  openDrawer = () => {
    this
      .drawer
      ._root
      .open()
  };
  closeDrawer = () => {
    this
      .drawer
      ._root
      .close()
  };
  render() {
    return (
      <Root>
      <Drawer
        ref={(ref) => {
        this.drawer = ref;
      }}
        content={<SideBar navigation={this.props.navigation} closeDrawer={()=>this.closeDrawer()}/>}
        onClose={() => this.closeDrawer()}>
        
      </Drawer>
      </Root>
    );
  }
}
const mapStateToProps = state=>{
  return {
    error:state.auth.error,
    loading:state.auth.loading,
    user:state.auth.user
  };
};
export default connect(mapStateToProps,{deleteUser})(HomePage);
