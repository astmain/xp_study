

axios=require("axios")


;(

    async()=>{
        let config = {method: 'get', url: 'http://103.119.2.223:3000/index', data: {aaa: new Date()}}
        let res = await axios(config)
        
        console.log('res.data---', res.data)
    }
	
    

)();