const url =
  "https://www.xiaohongshu.com/111/222/search_result/67caf377000000000d01584d?xsec_token=ABt01T2dLr6-SOX8L0sU6oROjq98hx39AyahrdrWACFfw=&xsec_source=";

function parse_url(url) {
  const parsedUrl = new URL(url);
  const result = {
    protocol: parsedUrl.protocol,
    hostname: parsedUrl.hostname,
    pathname: parsedUrl.pathname,
    query: {},
    pathLevels: 0,
  };

  // 解析查询参数
  parsedUrl.searchParams.forEach((value, key) => {
    result.query[key] = value;
  });

  // 解析路径层级
  const pathParts = parsedUrl.pathname.split('/').filter(part => part);
  result.pathLevels = pathParts.length;
  for (let i = 0; i < pathParts.length; i++) {
    result[`__path${i + 1}`] = pathParts[i];
  }

  return result;
}

console.log(111, parse_url(url));

帮我优化代码,得到第一路径,最后路径  ,path_first ,path_last