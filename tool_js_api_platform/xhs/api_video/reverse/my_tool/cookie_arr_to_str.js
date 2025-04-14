// 将 cookie数组转成cookie字符串
function cookie_arr_to_str(arr) {
    let my_cookies_str = ""
    if (Object.prototype.toString.call(arr) === '[object Array]') {

        for (let i = 0; i < arr.length; i++) {
            let ele = arr[i]
            my_cookies_str += ele.name + "=" + ele.value + "; "
        }
    } else {
        new Error("数据错误")
    }


    return my_cookies_str;
}

module.exports = cookie_arr_to_str






