import React from 'react';
import ReactDOM from 'react-dom';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import DatePicker from "./components/DatePicker/DatePicker.js"
import Lyb from "./pages/lyb/index.js"

ReactDOM.render(<ConfigProvider locale={zhCN}>
    <Lyb></Lyb>
</ConfigProvider>, document.getElementById('root'));
