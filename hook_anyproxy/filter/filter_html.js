let fs = require('fs')
let path = require('path')

function filter_html(req, res) {
  let body = textDecoder.decode(res.response.body)
  // if(  "".includes("https://passport.bilibili.com/register/pc_oauth2.html#/?client_id=f30c55ca0bd64c06&return_url=https%3A%2F%2Fcxe.duochuangkeji.cn%2Fbilibili&response_type=code&state=123")){
  // if(  req.url.includes("https://passport.bilibili.com/register/pc_oauth2.html#/?client_id=f30c55ca0bd64c06&return_url=https%3A%2F%2Fcxe.duochuangkeji.cn%2Fbilibili&response_type=code&state=123")){
  if (req.url.includes('https://passport.bilibili.com/register/pc_oauth2.html')) {
    // debugger
  }

  // if (req.url.includes('https://www.baidu.com/')) {
  //   let jq = jq_node(res.response.body.toString())
  //   console.log(`path_top---`, path_top)
  //   let html_vue_js = fs.readFileSync(path.join(path_top, `/dist/__html.js`))
  //   jq('head').prepend(
  //     `<script class="__html">   ${html_vue_js}      </script>`
  //   )
  //   res.response.body = jq('html').html()
  // }
  //
  // if (body.includes('gjbkzjolyicbGID7iaeK')) {
  //   console.log('filter_html---url:', req.url)
  //   console.log('filter_html---找到了---军事---req.url:')
  // }

  //// 响应返回html9
  // let html9 = jq("html").html()
  // res.response.body = html9

  return { req, res }
}

module.exports = filter_html
