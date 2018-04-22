import React, {Component} from 'react';
import {FlatList,TouchableOpacity,View,Image} from 'react-native';
import SinglePost from '../components/singlePost';
import {Content,List,ListItem,Container,Input, Item,Text,Icon,Button,Right,Left} from 'native-base';
import axios from 'axios';
import UrlUtils from '../components/UrlUtils';
import Discussion from '../components/discussion';
import ToolBar from '../components/toolBar';
import HTMLView from 'react-native-htmlview';

export default class PostList extends Component {
    state={posts:[],newPost:''};

    componentDidMount()
    {
      discussionID = this.props.navigation.state.params.discussion.discussion;
      axios.get(UrlUtils.getDiscussionPosts(discussionID))
        .then((response) => {
          var posts=response.data.posts;

          var associatedArray={};
          for(i=0;i<posts.length;i++)
          {
            associatedArray[posts[i].id]=posts[i];
          }

          var comments=[];
          for(i=0;i<posts[posts.length-1].children.length;i++)
          {
            comments.push(associatedArray[posts[posts.length-1].children[i]]);
          }
          comments.reverse();
          var arrayOfComments=[];
          for(i=0;i<comments.length;i++)
          {
                var list=[]//list of replies
            		var stack=[];
            		stack.push(comments[i].id);
            		while(stack.length>0)
            		{
                      var index = stack.pop();
                      if(index!=comments[i].id)
                      {
                			     list.push(associatedArray[index]);
                      }
                      var children = associatedArray[index].children;
                			//all json data
                			for(z=0;z<children.length;z++)
                			{
                					stack.push(children[z]);
                			}
                }
                var obj={comment:comments[i],replies:list};
                arrayOfComments.push(obj);
          }
          this.setState({posts:arrayOfComments});
        })
        .catch((error)=> {});
      }

      addPost()
      {
        arr=this.state.posts;
        arr.push(this.state.newPost);
        this.setState({posts:arr});
        temp=this.state.newPost;
        temp='';
        this.setState({newPost:temp});
      }
      render() {
        return (
          <Container>
          <ToolBar  type={'back'}  navigation={this.props.navigation}/>
          <Content style={{backgroundColor:'#FFFFFF'}} keyboardShouldPersistTaps={'handled'}>

          <View style ={{flex:1,flexDirection:'column'}}>
            <View style={{flexDirection:'row'}}>
            <Image
              source={{uri:this.props.navigation.state.params.discussion.userpictureurl}}
              style={{width:50 , height:50, justifyContent:'flex-start'}} />
            <Text style={{fontWeight:'bold',flexWrap:'wrap',alignSelf:'center',padding:10}}>
                {this.props.navigation.state.params.discussion.userfullname}
            </Text>
            </View>
          <HTMLView value={this.props.navigation.state.params.discussion.message}/>
          </View>

            <List dataArray={this.state.posts}
              renderRow={(item) =>
              <ListItem>
                <SinglePost item={item}/>
              </ListItem>
            }>
            </List>
              <Item rounded style={{backgroundColor:'#FFFFFF'}}>
                <Input multiline={true} style={{flexWrap:'wrap'}}
                onChangeText={text => this.setState({newPost:text})}
                value={this.state.newPost} placeholder='write a post' />
              </Item>
              <Text style={{padding:10,alignSelf:'center'}} onPress={()=>this.addPost()}>Add</Text>
            </Content>
            </Container>
        );
      }
  }
