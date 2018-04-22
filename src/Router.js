import React from 'react';
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import MyCourses from './pages/myCourses';
import CourseDetails from './pages/courseDetails';
import DiscussionBoard from './pages/discussionBoard';
import MicroLearning from './pages/microLearning';
import CourseSideBar from './components/courseSideBar';
import GradeAchievement from './pages/gradeAchievement';
import PostList from './pages/postList';
import DiscussionPage from './pages/discussionPage';

const drawer = DrawerNavigator({
  CourseDetails: {
    screen: CourseDetails
  },
  DiscussionBoard: {
    screen: DiscussionBoard
  },
  MicroLearning: {
    screen: MicroLearning
  },
  GradeAchievement: {
    screen: GradeAchievement
  }
}, {
  contentOptions: {
    activeTintColor: '#FFFFFF',
    activeBackgroundColor: 'red'
  },
  contentComponent: props => <CourseSideBar {
    ...props
  } />
});

const RootStack = StackNavigator({
  Login: {
    screen: LoginPage
  },
  Home: {
    screen: HomePage
  },
  MyCourses: {
    screen: MyCourses
  },
  Drawer: {
    screen: drawer
  },
  Discussion:{
	  screen:DiscussionPage
	  },
  Posts:{
	  screen:PostList
	  }
}, {headerMode: 'none'});

export default RootStack;
