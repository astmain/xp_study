// 将cookie字符转成对象
globalThis.cookie_str_to_obj = function cookie_str_to_obj(cookie_str) {
    //判断是否有参数
    cookie_str = cookie_str ? cookie_str : document.cookie
    const cookie_obj = {};
    if (cookie_str) {
        const cookie_arr = cookie_str.split(';');
        for (const cookie of cookie_arr) {
            const [key, value] = cookie.trim().split('=');
            cookie_obj[key] = value;
        }
    }
    return cookie_obj;
}

