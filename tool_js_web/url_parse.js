// const url =
//   "https://www.xiaohongshu.com/111/222/search_result/67caf377000000000d01584d?xsec_token=ABt01T2dLr6-SOX8L0sU6oROjq98hx39AyahrdrWACFfw=&xsec_source=";
// // const url ="https://www.xiaohongshu.com/111/222/search_result/67caf377000000000d01584d?xsec_token=ABt01T2dLr6-SOX8L0sU6oROjq98hx39AyahrdrWACFfw=&xsec_source=";
// // const url =  "https://www.xiaohongshu.com?xsec_token=ABt01T2dLr6-SOX8L0sU6oROjq98hx39AyahrdrWACFfw=&xsec_source=";
// console.log("分析url结果", url_parse(url));

globalThis.url_parse = url_parse;
function url_parse(url) {
  const parsedUrl = new URL(url);
  const result = {
    protocol: parsedUrl.protocol,
    hostname: parsedUrl.hostname,
    pathname: parsedUrl.pathname,
    params: {},
    _path_num: 0,
    _path_first: "", // 新增，用于存储第一级路径
    _path_last: "", // 新增，用于存储最后一级路径
  };

  // 解析查询参数
  parsedUrl.searchParams.forEach((value, key) => {
    result.params[key] = value;
  });

  // 解析路径层级
  const pathParts = parsedUrl.pathname.split("/").filter((part) => part);
  result._path_num = pathParts.length;
  for (let i = 0; i < pathParts.length; i++) {
    result[`_path${i + 1}`] = pathParts[i];
  }

  // 获取第一级路径和最后一级路径
  if (pathParts.length > 0) {
    result._path_first = pathParts[0];
    result._path_last = pathParts[pathParts.length - 1];
  }

  return result;
}
