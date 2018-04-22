import React, { Component } from 'react';
import { Card, Icon,CardItem,Right,Left,H3} from 'native-base';
export default class DiscussionBoardItem extends Component {
    renderImage()
    {
        if(this.props.item.completed==1){
          return(
              <Icon style= {{color:'green'}} name='checkmark-circle' />
          );
        }
        else if (this.props.item.completed==0){
          return(
              <Icon style= {{color:'red'}} name='close-circle' />
          );
        }
        else{
          return null;
        }
    }

  render() {
    return (
      <Card>
        <CardItem>
          <Left>
            <H3 style={{flexWrap:'wrap'}}>{this.props.item.name}</H3>
          </Left>
          <Right>
            {this.renderImage()}
          </Right>
        </CardItem>
      </Card>
    );
  }
}
