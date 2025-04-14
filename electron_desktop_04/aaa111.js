const queryString = require('query-string'); // Node.js 环境
// 在浏览器环境中可以通过 <script src="https://cdn.jsdelivr.net/npm/query-string@7.1.1/dist/query-string.min.js"></script> 引入

const url = "https://www.xiaohongshu.com/search_result/67caf377000000000d01584d?xsec_token=ABt01T2dLr6-SOX8L0sU6oROjq98hx39AyahrdrWACFfw=&xsec_source=";
const { url: parsedUrl, query } = queryString.parseUrl(url);

console.log('解析后的 URL:', parsedUrl);
console.log('查询参数:', query);