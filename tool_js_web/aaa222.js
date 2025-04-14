const url = require('url');

const inputUrl = "https://www.xiaohongshu.com/search_result/67caf377000000000d01584d?xsec_token=ABt01T2dLr6-SOX8L0sU6oROjq98hx39AyahrdrWACFfw=&xsec_source=";
const parsed = url.parse(inputUrl, true);

console.log('协议:', parsed.protocol);
console.log('主机名:', parsed.hostname);
console.log('路径名:', parsed.pathname);
console.log('查询参数:', parsed.query);
console.log('xsec_token:', parsed.query.xsec_token);