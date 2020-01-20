import React from 'react';
import {DatePicker} from 'antd';

const {MonthPicker, RangePicker, WeekPicker} = DatePicker;

function onChange(date, dateString) {
    console.log(date, dateString);
}

class DatePicker_1 extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div>
            <DatePicker onChange={onChange}/>
            <br/>
            <MonthPicker onChange={onChange} placeholder="Select month"/>
            <br/>
            <RangePicker onChange={onChange}/>
            <br/>
            <WeekPicker onChange={onChange} placeholder="Select week"/>
        </div>
    }
}

export default DatePicker_1;
