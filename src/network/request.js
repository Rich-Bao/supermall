import axios from 'axios'

export function request(config) {

    //1.创建axios 实例
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:7878/api/m5',
      timeout: 500
    })
    //2.axios的拦截器
      instance.interceptors.request.use(config =>{
       // console.log(config);
        return config
      },err =>{
        //console.log(err);
      })
      instance.interceptors.response.use(res =>{
        return res.data
      },err => {
        //console.log(err);
      })
    //发送真正的网络请求
   return  instance(config)

}
