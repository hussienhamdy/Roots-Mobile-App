import React, { Component } from 'react';
import {View,Image,ScrollView,FlatList,TouchableOpacity,StyleSheet,WebView} from 'react-native';
import { List,ListItem,Text,Item,Input,Card,Container,Content,CardItem,Right,Left,H3} from 'native-base';
import SingleReply from '../components/singleReply';
import HTMLView from 'react-native-htmlview';

export default class SinglePost extends Component {
state={replies:[],newReply:'',flag:false,flag2:false,text:'view replies'};

componentDidMount()
{
  this.setState({replies:this.props.item.replies});
}

addReply()
{
  arr=this.state.replies;
  arr.push(this.state.newReply);
  this.setState({replies:arr});
  temp=this.state.newReply;
  temp='';
  this.setState({newReply:temp});
}

setFlag()
{
  if(this.state.flag==true)
  {
    var f=false;
    this.setState({flag:f});
    this.setState({text:'view replies'});
  }
  else
  {
    var f=true;
    this.setState({flag:f});
    this.setState({text:'hide replies'});
  }
}

setFlag2()
{
  if(this.state.flag2==true)
  {
    var f=false;
    this.setState({flag2:f});
  }
  else
  {
    var f=true;
    this.setState({flag2:f});
  }
}

renderReplyButton()
{
      if(this.state.replies.length>0)
      {
        return(
          <Text onPress={()=>this.setFlag()}>{this.state.text}</Text>
        );
      }
      else{
        return null;
      }
}

renderReplies()
{
  if(this.state.flag==true)
  {
    return(
      <View>
        <List dataArray={this.state.replies}
        renderRow={(item) =>
        <ListItem>
          <SingleReply item={item} />
          <View style={{alignSelf:'flex-end'}}>
          <Text onPress={()=>this.setFlag2()} >reply</Text>
          </View>
        </ListItem>
      }>
      </List>
        <Item rounded style={{backgroundColor:'#FFFFFF'}}>
          <Input multiline={true} style={{flexWrap:'wrap',width:50}}
          onChangeText={text => this.setState({newReply:text})}
          autoFocus={this.state.flag2}
          value={this.state.newReply} placeholder='write a Reply' />
        </Item>
        <Text style={{padding:10,alignSelf:'center'}} onPress={()=>this.addReply()}>Add</Text>
      </View>
    );
  }
  else {
    return null;
  }
}

  render() {
    return (
            <View style ={{flex:1,flexDirection:'column'}}>
              <View style={{flexDirection:'row'}}>
              <Image
                source={{uri:this.props.item.comment.userpictureurl}}
                style={{width:80 , height:80, justifyContent:'flex-start'}} />
              <Text style={{fontWeight:'bold',flexWrap:'wrap',alignSelf:'center',padding:10}}>
              {this.props.item.comment.userfullname}
              </Text>
              </View>
              <HTMLView value={this.props.item.comment.message}/>
            <View style={{alignSelf: 'flex-end'}}>
            {this.renderReplyButton()}
            </View>
            {this.renderReplies()}
            </View>
    );
  }
  }
