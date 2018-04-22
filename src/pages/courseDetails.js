import React, {Component} from 'react';
import UrlUtils from '../components/UrlUtils';
import axios from 'axios';
import {Content,H2,H3,Container} from 'native-base';
import {Text,View,FlatList,TouchableOpacity} from 'react-native';
import ToolBar from '../components/toolBar';
import CourseHomeActivity from '../components/courseHomeActivity';
import AnimatedBar from "react-native-animated-bar";
import Spinner from '../components/spinner';
import { NavigationActions } from 'react-navigation';
import CalendarComponent from '../components/calendar';
import {connect} from 'react-redux';

class CourseDetails extends Component {
  state = {courseID:this.props.navigation.state.params.id,contents:[],events:{}};
  static navigationOptions = {
     header:null
  };

  goToDiscussionPage(item)
  {
      if(item.modName=='forum')
      {
          var forumID = item.modInstance;
          this.props.navigation.navigate('Discussion',{id:forumID});
      }
  }

  setContents(contentsData,activitiesData)
  {
        var arr=[];
        var content = contentsData[0];
        for( j = 0 ; j < content.modules.length ; j ++ )
        {
            var module = content.modules[j];
            //if this activity is hidden from users
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
            //modInstance is forum id
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
    axios.get(UrlUtils.getCalendarEvents(courseID)),
    axios.get(UrlUtils.getActivitiesCompletionStatus(courseID,userID))
  ])
  .then(axios.spread((contentsRes, calendarRes,activitiesRes) => {
    this.setContents(contentsRes.data,activitiesRes.data.statuses);
    this.setState({events:calendarRes.data.events});
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
        var progress = Math.round( (count/contents.length) * 100 ) / 100;
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
          <ToolBar  type={'menu'}  navigation={this.props.navigation}/>
          <Content>
          <H2 style={{textAlign: 'center',paddingTop:10}}>This Week Activities</H2>
          <View style={{alignSelf:'center'}}>
          {this.renderSpinner()}
          </View>
          {this.renderProgress()}
          <FlatList contentContainerStyle={{padding:10}}
            data = {this.state.contents}
            keyExtractor={(x,i)=>i}
            renderItem = { ({item}) =>
            <TouchableOpacity   onPress={()=>this.goToDiscussionPage(item)}>
            <CourseHomeActivity item={item} />
            </TouchableOpacity>
          }/>
          <CalendarComponent events = {this.state.events}/>
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
  export default connect(mapStateToProps)(CourseDetails);
