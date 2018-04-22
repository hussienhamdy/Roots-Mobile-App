import React, {Component} from 'react';
import {Content, Icon, Text, List, ListItem} from 'native-base';
import {View, TouchableOpacity} from 'react-native';
import {NavigationActions} from 'react-navigation';

class CourseSideBar extends Component {
  goToDiscussionBoard()
  {
    const navigateAction = NavigationActions.navigate({routeName: 'DiscussionBoard'});
    this
      .props
      .navigation
      .dispatch(navigateAction);
  }

  goToCourseDetails()
  {
    const navigateAction = NavigationActions.navigate({routeName: 'CourseDetails'});
    this
      .props
      .navigation
      .dispatch(navigateAction);
  }

  goToMicroLearning() {
    const navigateAction = NavigationActions.navigate({routeName: 'MicroLearning'});
    this
      .props
      .navigation
      .dispatch(navigateAction);
  }

  goToGradeAchievement() {
    const navigateAction = NavigationActions.navigate({routeName: 'GradeAchievement'});
    this
      .props
      .navigation
      .dispatch(navigateAction);
  }

  render() {
    return (
      <Content style={{
        backgroundColor: 'white'
      }}>
        <List>
          <ListItem>
            <TouchableOpacity
              style={{
              flexDirection: 'row',
              padding: 3
            }}
              onPress={() => this.goToCourseDetails()}>
              <Text
                style={{
                paddingStart: 10,
                fontSize: 20
              }}>Course Home</Text>
            </TouchableOpacity>
          </ListItem>

          <ListItem>
            <TouchableOpacity
              style={{
              flexDirection: 'row',
              padding: 3
            }}
              onPress={() => this.goToMicroLearning()}>
              <Text
                style={{
                paddingStart: 10,
                fontSize: 20
              }}>Micro Learnings</Text>
            </TouchableOpacity>
          </ListItem>

          <ListItem>
            <TouchableOpacity
              style={{
              flexDirection: 'row',
              padding: 3
            }}
              onPress={() => this.goToDiscussionBoard()}>
              <Text
                style={{
                paddingStart: 10,
                fontSize: 20
              }}>Discussion Board</Text>
            </TouchableOpacity>
          </ListItem>

          <ListItem>
            <TouchableOpacity
              style={{
              flexDirection: 'row',
              padding: 3
            }}>
              <Text
                style={{
                paddingStart: 10,
                fontSize: 20
              }}>Video Submission</Text>
            </TouchableOpacity>
          </ListItem>

          <ListItem>
            <TouchableOpacity
              style={{
              flexDirection: 'row',
              padding: 3
            }}>
              <Text
                style={{
                paddingStart: 10,
                fontSize: 20
              }}>Quizzes & Surveys</Text>
            </TouchableOpacity>
          </ListItem>

          <ListItem>
            <TouchableOpacity
              style={{
              flexDirection: 'row',
              padding: 3
            }}
              onPress={() => this.goToGradeAchievement()}>
              <Text
                style={{
                paddingStart: 10,
                fontSize: 20
              }}>Grades & achievements</Text>
            </TouchableOpacity>
          </ListItem>

          <ListItem>
            <TouchableOpacity
              style={{
              flexDirection: 'row',
              padding: 3
            }}>
              <Text
                style={{
                paddingStart: 10,
                fontSize: 20
              }}>Course Material & Info</Text>
            </TouchableOpacity>
          </ListItem>
        </List>
      </Content>
    );
  }
}
export default CourseSideBar;
