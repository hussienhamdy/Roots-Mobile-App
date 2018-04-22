import React, {Component} from 'react';
import {FlatList,TouchableOpacity,View,WebView} from 'react-native';
import axios from 'axios';
import UrlUtils from '../components/UrlUtils';
import CourseListItem from '../components/courseListItem';
import {connect} from 'react-redux';
import Spinner from '../components/spinner';
import {Center,Container,H3} from 'native-base';


class MyCourses extends Component {

      goToCourseDetails(courseID)
      {
        this.props.navigation.navigate('Drawer',{id:courseID});
      }
      state = { courses:[] };

      renderSpinner()
      {
        if(this.state.courses.length==0)
        {
            return <Spinner/>;
        }
        else
        {
            return null;
        }
      }

      componentDidMount()
      {
        axios.get(UrlUtils.getUserCourses(this.props.user.userID))
          .then((response) => this.setState({courses :response.data}))
          .catch((error)=> {});
      }
      render() {
        return (
          <Container>
              <View style={{alignSelf:'center'}}>
              {this.renderSpinner()}
              </View>
              <H3 style={{justifyContent:'center',alignSelf:'center',marginTop:10}}>My Courses</H3>
              <FlatList style={{padding:10}}
                data = {this.state.courses}
                keyExtractor={(x,i)=>i.toString()}
                renderItem = { ({item}) =>
                <TouchableOpacity onPress={()=>this.goToCourseDetails(item.id)}>
                <CourseListItem item={item} />
                </TouchableOpacity>
              }/>
              </Container>
        );
      }
  }
  const mapStateToProps = state=>{
    return {
      user:state.auth.user
    };
  };
  export default connect(mapStateToProps)(MyCourses);
