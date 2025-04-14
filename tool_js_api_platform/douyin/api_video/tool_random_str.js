// 获取一个随机四位字符串
module.exports = function tool_random_str({len = 11}) {
    let str = '';
    const base_str = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const length = base_str.length - 1;
    for (let i = 0; i < len; i++) {
        const randomIndex = Math.floor(Math.random() * (length + 1));
        str += base_str[randomIndex];
    }
    return str;
}


