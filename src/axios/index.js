import axios from 'axios';
import qs from 'qs';

var env = process.env.NODE_ENV || 'production';
env = env.toLowerCase();
axios.defaults.baseURL = env == 'development' ? 'http://192.168.100.51:8998/' : 'http://aqgl.ddbb.jpl56.com/';//服务器或者你项目的后台接口地址
axios.defaults.withCredentials = true;//=>允许跨域(并且允许携带COOKIE)
axios.defaults.transformRequest = (data = {}) => qs.stringify(data);//=>把POST/PUT，通过请求主体传递给服务器的内容，统一处理为X-WWW-URL-ENCODED格式
axios.interceptors.response.use(result => result.data);//=>响应拦截器:把服务返回的信息中响应主体内容拦截返回，以后在THEN中获取的结果就是主体内容
export default axios;
