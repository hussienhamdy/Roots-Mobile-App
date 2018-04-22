import React, {Component} from 'react';
import {
    Card,
    CardItem,
    Right,
    Left,
    H3,
    Body
} from 'native-base';
import {Image} from 'react-native';

export default class GradeItem extends Component {

    render() {
        grade = this.props.item;
        return (
            <Card>
                <CardItem>
                    <Left>
                        <H3>{(grade.itemname)
                                ? grade.itemname
                                : "Final"}</H3>
                    </Left>
                    <Right>
                        <H3
                            style={{
                            flexWrap: 'wrap'
                        }}>{(!grade.graderaw
                                ? '-'
                                : grade.graderaw) + " / " + grade.grademax}</H3>

                    </Right>
                </CardItem>
            </Card>
        );
    }
}
