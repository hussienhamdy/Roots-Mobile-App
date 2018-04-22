import React, {Component} from 'react';
import {Text, Container, Content, View} from 'native-base';
import ToolBar from '../components/toolBar';
export default class MicroLearning extends Component {

    render() {
        return (
            <Container>
                <ToolBar navigation={this.props.navigation}/>
                <Content>
                    <View
                        style={{
                        alignSelf: 'center'
                    }}>
                        <Text>MicroLearning</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}
