// 将cookie数组转成字符
globalThis.cookie_arr_to_str = function (arr) {
    let cookies_str = ""
    if (Object.prototype.toString.call(arr) === '[object Array]') {
        for (let i = 0; i < arr.length; i++) {
            let ele = arr[i]
            cookies_str += ele.name + "=" + ele.value + "; "
        }
    } else {
        throw  new Error('函数cookie_arr_to_str的参数必须是数组对象');
    }

    return cookies_str;
}






