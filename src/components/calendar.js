import React, {Component} from 'react';
import {Image, StyleSheet,Text,View,FlatList,Modal,TouchableHighlight,Alert} from 'react-native';
import {Calendar} from 'react-native-calendars';

export default class CalendarComponent extends Component {
  state={events:[],markedDates:{}};

  componentWillReceiveProps(newProps)
  {
      eventsArr=[];
      arr = newProps.events;
      var md = {};
      for(i=0;i<arr.length;i++)
      {
        name = arr[i].name;
        timeStamp = arr[i].timestart;
        var date = new Date(timeStamp*1000);
        var month = date.getUTCMonth() + 1;
        var year = date.getUTCFullYear();
        var day = date.getUTCDate();
        var temp =year+'-'+(10-month<=0?month:'0'+month)+'-'+(10-day<=0?day:'0'+day);
        var obj = {eventDate:temp,eventName:name};
        md[temp]={selected:true};
        eventsArr.push(obj);
      }
      this.setState({markedDates:md});
      this.setState({events:eventsArr});
  }

  findEvent(date)
  {
    events = this.state.events;
    for(i=0;i<events.length;i++)
    {
      if(events[i].eventDate==date)
      {
        return events[i].eventName;
      }
    }
    return 'none';
  }

  showAlert(date)
  {
    event = this.findEvent(date);
    if(event!='none')
    {
      Alert.alert(
      date,
      event,
      [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable:true }
    )
    }
  }

  render() {
    return (
      <Calendar
        monthFormat={'MMMM yyyy'}
        onDayPress={(day)=>this.showAlert(day.dateString)}
        onMonthChange={(month) => {console.log('month changed', month)}}
        hideArrows={false}
        hideExtraDays={true}
        disableMonthChange={true}
        firstDay={1}
        hideDayNames={false}
        showWeekNumbers={false}
        markedDates={this.state.markedDates}
        theme={{textSectionTitleColor: '#000000',monthTextColor: 'blue',selectedDayBackgroundColor:'#FDD835'}}
      />
    );
  }
}
