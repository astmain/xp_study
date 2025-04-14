globalThis.url_decode = function url_decode(str) {
  //扣取 FeHelper(前端助手)  中 Unicode解码（u开头）的代码            使用 dom点击断点,搜索代码片段  EncodeUtils.uniDecode(this.sourceContent.replace
  let e = str
  e = e = e.replace(/(\\)?\\u/gi, '%u').replace('%u0025', '%25')
  let r = (e = unescape(e.toString().replace(/%2B/g, '+'))).match(/(%u00([0-9A-F]{2}))/gi)
  if (r)
    for (let t = 0; t < r.length; t++) {
      let n = r[t].substring(1, 3)
      Number('0x' + n) >= 128 && (e = e.replace(r[t], n))
    }
  return (e = unescape(e.toString().replace(/%2B/g, '+')))
}