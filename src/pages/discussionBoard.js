import React, {Component} from 'react';
import UrlUtils from '../components/UrlUtils';
import axios from 'axios';
import {Content,H2,H3,Container} from 'native-base';
import {Text,View,FlatList,TouchableOpacity} from 'react-native';
import ToolBar from '../components/toolBar';
import DiscussionBoardItem from '../components/discussionBoardItem';
import Spinner from '../components/spinner';
import { NavigationActions } from 'react-navigation';
import {connect} from 'react-redux';
import AnimatedBar from "react-native-animated-bar";

class DiscussionBoard extends Component {
  state = {courseID:this.props.navigation.state.params.id,contents:[]}
  static navigationOptions = {
     header:null
  };

  setContents(contentsData,activitiesData)
  {
    var arr=[];
    var content = contentsData[2];
    for( j = 0 ; j < content.modules.length ; j ++ )
    {
        var module = content.modules[j];
        if(module.visible==0)
        {
          continue;
        }
        var state = -1; // for activities like announcements that have no progress
        for( z = 0 ; z < activitiesData.length ; z ++ )
        {
          var status = activitiesData[z];
          if(module.id==status.cmid)
          {
              state=status.state;
              break;
          }
        }
        var obj = {name:module.name,completed:state,id:module.id,modName:module.modname,modInstance:module.instance};
        arr.push(obj)
    }
    this.setState({contents:arr})
  }


  componentDidMount()
  {
    courseID = this.props.navigation.state.params.id;
    userID=this.props.user.userID;
    axios.all([
    axios.get(UrlUtils.getCourseContents(courseID)),
    axios.get(UrlUtils.getActivitiesCompletionStatus(courseID,userID))
  ])
  .then(axios.spread((contentsRes,activitiesRes) => {
    this.setContents(contentsRes.data,activitiesRes.data.statuses);
  }));
  }

  renderSpinner()
  {
    if(this.state.contents.length==0)
    {
        return <Spinner/>;
    }
    else
    {
        return null;
    }
  }


    renderProgress()
    {
      var contents = this.state.contents;
      if(contents.length!=0)
      {
          var count = 0 ;
          for( i = 0 ; i < contents.length; i ++)
          {
            if (contents[i].completed!=0)
            {
              count++;
            }
          }
          var progress = Math.round( (count/contents.length) * 10 ) / 10;
          return(
            <View style={{padding:10}}>
            <Text style={{fontWeight:'bold'}}>Your progress:</Text>
               <AnimatedBar
               progress={progress}
               height={null}
               borderColor="#FFFFFF"
               barColor="#03A9F4"
               borderRadius={5}
               borderWidth={3}>
                 <Text style={{textAlign:'center',color:'#FFFFFF'}}>{(progress*100)+'%'}</Text>
             </AnimatedBar>
             </View>
           );
      }
    }

      render() {
        return (
          <Container>
          <ToolBar type={'menu'} navigation={this.props.navigation}/>
          <Content>
          <View style={{alignSelf:'center'}}>
          {this.renderSpinner()}
          </View>
          {this.renderProgress()}
          <FlatList contentContainerStyle={{padding:10}}
            data = {this.state.contents}
            keyExtractor={(x,i)=>i}
            renderItem = { ({item}) =>
            <TouchableOpacity>
            <DiscussionBoardItem item={item} />
            </TouchableOpacity>
          }/>
          </Content>
          </Container>
        );
      }
  }
  const mapStateToProps = state=>{
    return {
      user:state.auth.user
    };
  };
  export default connect(mapStateToProps)(DiscussionBoard);
