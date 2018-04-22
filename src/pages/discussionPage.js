import React, {Component} from 'react';
import {FlatList,TouchableOpacity,View} from 'react-native';
import SinglePost from '../components/singlePost';
import {H3,Content,Container,Input, Item,Text,Icon,Button,Right,Left} from 'native-base';
import axios from 'axios';
import UrlUtils from '../components/UrlUtils';
import Discussion from '../components/discussion';
import ToolBar from '../components/toolBar';

export default class DiscussionPage extends Component {
      state={discussions:[]};

      componentDidMount()
      {
        forumID = this.props.navigation.state.params.id;
        axios.get(UrlUtils.getActivityDiscussions(forumID))
          .then((response) => this.setState({discussions :response.data.discussions}))
          .catch((error)=> {this.renderError()});
      }

      goToPosts(item)
      {
          this.props.navigation.navigate('Posts',{discussion:item});
      }

      render() {
        return (
              <View>
              <ToolBar  type={'back'}  navigation={this.props.navigation}/>
              <FlatList style={{padding:10}}
                data = {this.state.discussions}
                keyExtractor={(x,i)=>i}
                renderItem = { ({item}) =>
                <TouchableOpacity onPress={()=>this.goToPosts(item)}>
                  <Discussion item={item}/>
                </TouchableOpacity>
              }/>
              </View>
        );
      }
  }
