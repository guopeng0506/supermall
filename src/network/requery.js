
import axios from 'axios';

//export function request(config,success,failure){
    //1.创建axios实例 instance
    // const instance =axios.create({
    //     baseURL:'http://152.136.185.210:8000/api/z8',
    //     timeout:5000
    // })

    // //发送真正的网络请求
    // instance(config).then(res =>{
    //     success(res)
    // }).catch(err =>{
    //     failure(err)
    // })
    export function request(config){
            //1.创建axios实例
            const instance =axios.create({  //axios.create返回的就是一个promise
                baseURL:'http://152.136.185.210:8000/api/z8',
                timeout:5000
            })

            //2.设置拦截器
            //请求拦截
            instance.interceptors.request.use(config =>{
               // console.log(config)
                return config //放开拦截
            },err =>{
                console.log('进来了request请求失败拦截器' +err)
            })
            //响应拦截
            instance.interceptors.response.use(res =>{
                //console.log(res)
                return res  //放开拦截
            },err =>{
                console.log('进来了response响应失败拦截器' +err)
            })

            //3.发送真正的网络请求
            return  instance(config)

}