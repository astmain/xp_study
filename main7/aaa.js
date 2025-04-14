import axios from "axios"
ax2_test()

// console.log(`axios---:`,     axios        )
//
//
async function ax2_test() {

    let config = {method: 'get', url: 'http://103.119.2.223:3000/index', data: {aaa: 111}}


    let res = await axios(config)
    console.log('res.data---', res.data)
}