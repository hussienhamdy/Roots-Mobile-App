import React, {Component} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';

import {Text, Container, Content, H2} from 'native-base';
import ToolBar from '../components/toolBar';
import UrlUtils from '../components/UrlUtils';
import Spinner from '../components/spinner';
import axios from 'axios';
import GradeItem from '../components/gradeItem';
import BadgeItem from '../components/badgeItem';
import {connect} from 'react-redux';
import AnimatedBar from "react-native-animated-bar";

class GradeAchievement extends Component {

    state = {
        grades: [],
        badges: [],
        courses: [],
        json: "",
        error: "",
        courseID: this.props.navigation.state.params.id
    };

    componentDidMount() {
        userID = this.props.user.userID;

        console.log("user id is " + userID);
        axios.all([
            axios.get(UrlUtils.getActivitiesGrades(this.state.courseID, userID)),
            axios.get(UrlUtils.getUserBadges(userID)),
            axios.get(UrlUtils.getAllCourses())
        ]).then(axios.spread((gradeRes, badgeRes, coursesRes) => {
            this.setGrades(gradeRes);
            this.setBadges(badgeRes);
            this.setCourses(coursesRes);
        }));

    }

    setCourses(newCourses) {
        this.setState({courses: newCourses.data});
    }

    setBadges(newBadges) {
        this.setState({badges: newBadges.data.badges});
    }

    setGrades(newGrades) {

        console.log(newGrades);
        this.setState({grades: newGrades.data.usergrades[0].gradeitems});
        /* newGrades.forEach( => {

        });*/
    }

    renderGrades()
    {
        gradesLen = this.state.grades.length;
        coursesLen = this.state.courses.length;
        courses = this.state.courses;
        console.log(gradesLen);

        console.log(coursesLen);

        if (gradesLen === 0 || coursesLen === 0) {
            return <Spinner/>;
        } else {

            arr = [];

            this
                .state
                .grades
                .forEach(function (grade) {
                    console.log(grade);
                    arr.push(grade);
                });

            return (
                <FlatList
                    contentContainerStyle={{
                    padding: 10
                }}
                    data={this.state.grades}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem=
                    { ({item}) => <GradeItem item={item}/>}/>
            );
        }
    }

    renderBadges()
    {
        if (this.state.badges.length === 0) {
            return <Spinner/>;
        } else {

            arr = [];
            this
                .state
                .badges
                .forEach(function (badge) {
                    console.log(badge);
                    arr.push(badge);
                });

            return (
                <FlatList
                    contentContainerStyle={{
                    padding: 10
                }}
                    data={this.state.badges}
                    keyExtractor={(item, index) => index}
                    renderItem=
                    { ({item}) => <BadgeItem item={item}/>}/>
            );
        }
    }

    renderProgress()
    {
        if (this.state.grades.length != 0) {
            return (
                <View style={{
                    padding: 10
                }}>
                    <Text
                        style={{
                        fontWeight: 'bold'
                    }}>Your progress:</Text>
                    <AnimatedBar
                        progress={1}
                        height={null}
                        borderColor="#FFFFFF"
                        barColor="#03A9F4"
                        borderRadius={5}
                        borderWidth={3}>
                        <Text
                            style={{
                            textAlign: 'center',
                            color: '#FFFFFF'
                        }}>100%</Text>
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
                    <H2
                        style={{
                        textAlign: 'center',
                        paddingTop: 10
                    }}>Your Grades</H2>

                    {this.renderGrades()}

                    <H2
                        style={{
                        textAlign: 'center',
                        paddingTop: 10
                    }}>Your Badges</H2>

                    {this.renderBadges()}
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {user: state.auth.user};
};

export default connect(mapStateToProps, null)(GradeAchievement);
