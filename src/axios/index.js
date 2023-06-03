import axios from "axios";

//创建应对不同服务的axios实例
const cashAxios = axios.create();

function initialInstance (instance, ip, port){
    //设置默认url
    instance.defaults.baseURL =  'http://' + ip + ':' + port + '/process-sale-service/';
}

const ip = "192.168.137.179";
initialInstance(cashAxios, ip, 8080);

export {cashAxios};

