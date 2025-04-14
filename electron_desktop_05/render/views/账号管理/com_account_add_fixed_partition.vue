<template>
  <!--  <el-dialog title="账号选择" width="800px" v-model="show_com_add_platform_account" draggable :close-on-click-modal="false" :destroy-on-close="true">-->
  <el-dialog v-if="show" title="账号选择" width="1200px" v-model="show" draggable :close-on-click-modal="false" :destroy-on-close="true">


    <div>
      <el-button @click="test_douyin_img()">test_douyin_img</el-button>
      <el-button @click="test_douyin_img_10()">test_douyin_img_10</el-button>
      <el-button @click="get_loadURL()">get_loadURL</el-button>
      <el-button @click="get_env_data()">get_env_data</el-button>
    </div>

    <div>
      <el-button @click="localStorage_get()">localStorage_get</el-button>
      <el-button @click="localStorage_set()">localStorage_set</el-button>
    </div>


    <div>
      <el-button @click="cookies_get()">cookies_get</el-button>
      <el-button @click="cookies_set()">cookies_set</el-button>
    </div>

    <div>
      <el-select v-model="opt_curr" placeholder="请选择" value-key="id">
        <el-option
            v-for="item in opt_list"
            :key="opt_key"
            :label="opt_callback(item)"
            :value="item"
            @click.native="handleOptionClick(item)"
        >
        </el-option>
      </el-select>
      <p>当前选中的值: {{ opt_curr }}</p>
      <div>https://douyin.com</div>
      <div>https://creator.douyin.com</div>
    </div>


    <div class="container_webview">
      <div style="display: flex;flex-direction: row;gap:16px;">
        <el-button @click="控制台()">控制台</el-button>
        <el-input style="width: 100%;" v-model="curr_url" placeholder="请输入回车" spellcheck="false" @keyup.enter.native="导航栏输入框"/>
      </div>
    </div>


  </el-dialog>
</template>
<script>


export default {
  data() {
    return {
      show: false,
      curr_url: "",
      // vue的局限性
      opt_callback: (item) => {
        return item.name + "---" + item.webview_name
      },
      opt_key: "id",
      opt_curr: {id: 1, name: "盾牌", partition: "persist:douyin_1844606013", webview_name: "douyin_1844606013"},
      opt_list: [
        {id: 1, name: "盾牌", partition: "persist:douyin_1844606013", webview_name: "douyin_1844606013", url: "https://douyin.com"},
        {id: 2, name: "衣服2", partition: "persist:douyin_94667114450", webview_name: "douyin_94667114450", url: "https://douyin.com"},
      ],


    }
  },

  methods: {
    async open() {
      this.show = true
    },//


    async handleOptionClick(item) {
      console.log('option 被点击:', item)
      console.log(`选择账号---item:`, JSON.parse(JSON.stringify(item)))
      let webview_name = item.webview_name
      let partition = item.partition
      let url = item.url
      let config = {webview_name, partition, url, "container": '.container_webview', "preload": preload.PATH.preload, "style": `width: 100%; height: 500px; z-index: 100`,}
      window["WEBVIEW"] = await webview_start(config)
      window["WEBVIEW"].didStartNavigation((event) => {
        if (event.isMainFrame && event.url) {
          this.url = decodeURIComponent(event.url)
          console.log(`event.url---:`, event.url)
          this.curr_url = event.url
        }
      })

    },//


    async 导航栏输入框() {
      if (window["WEBVIEW"]) window["WEBVIEW"].loadURL(this.curr_url)
    },//


    async test_douyin_img() {
      await this.get_loadURL()
      await this.get_env_data()

      // let  env_data={
      //   "prvkey": "-----BEGIN PRIVATE KEY-----\r\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQg1hpZLJglXaM6vUfQ\r\nCRdZlgp7MQThyYMtO+Qggt9kJb+hRANCAASOtVEjBk819/rsSvOff2ECdaSUMyJ4\r\nbkdJh6dvNYV8Img5QOSw3Og7OzA6vT8et2F+yMU5wrC+QHzpxo1Jhs4+\r\n-----END PRIVATE KEY-----\r\n",
      //   "ticket": "hash.jyYeT6UzHW9AViZOqsJz4R840memQwv/xb/v4eAyHRQ=",
      //   "ts_sign": "ts.2.c7c5a2dec4d252d7f8128b27235bd5c1aedb1985736478e0e4b4bbd0691e23a2c4fbe87d2319cf05318624ceda14911ca406dedbebeddb2e30fce8d4fa02575d",
      //   "csr": "-----BEGIN CERTIFICATE-----\nMIIEfTCCBCKgAwIBAgIUXWdS2tzmSoewCWfKFyiWMrJqs/0wCgYIKoZIzj0EAwIw\nMTELMAkGA1UEBhMCQ04xIjAgBgNVBAMMGXRpY2tldF9ndWFyZF9jYV9lY2RzYV8y\nNTYwIBcNMjIxMTE4MDUyMDA2WhgPMjA2OTEyMzExNjAwMDBaMCQxCzAJBgNVBAYT\nAkNOMRUwEwYDVQQDEwxlY2llcy1zZXJ2ZXIwWTATBgcqhkjOPQIBBggqhkjOPQMB\nBwNCAASE2llDPlfc8Rq+5J5HXhg4edFjPnCF3Ua7JBoiE/foP9m7L5ELIcvxCgEx\naRCHbQ8kCCK/ArZ4FX/qCobZAkToo4IDITCCAx0wDgYDVR0PAQH/BAQDAgWgMDEG\nA1UdJQQqMCgGCCsGAQUFBwMBBggrBgEFBQcDAgYIKwYBBQUHAwMGCCsGAQUFBwME\nMCkGA1UdDgQiBCABydxqGrVEHhtkCWTb/vicGpDZPFPDxv82wiuywUlkBDArBgNV\nHSMEJDAigCAypWfqjmRIEo3MTk1Ae3MUm0dtU3qk0YDXeZSXeyJHgzCCAZQGCCsG\nAQUFBwEBBIIBhjCCAYIwRgYIKwYBBQUHMAGGOmh0dHA6Ly9uZXh1cy1wcm9kdWN0\naW9uLmJ5dGVkYW5jZS5jb20vYXBpL2NlcnRpZmljYXRlL29jc3AwRgYIKwYBBQUH\nMAGGOmh0dHA6Ly9uZXh1cy1wcm9kdWN0aW9uLmJ5dGVkYW5jZS5uZXQvYXBpL2Nl\ncnRpZmljYXRlL29jc3AwdwYIKwYBBQUHMAKGa2h0dHA6Ly9uZXh1cy1wcm9kdWN0\naW9uLmJ5dGVkYW5jZS5jb20vYXBpL2NlcnRpZmljYXRlL2Rvd25sb2FkLzQ4RjlD\nMEU3QjBDNUE3MDVCOTgyQkU1NTE3MDVGNjQ1QzhDODc4QTguY3J0MHcGCCsGAQUF\nBzAChmtodHRwOi8vbmV4dXMtcHJvZHVjdGlvbi5ieXRlZGFuY2UubmV0L2FwaS9j\nZXJ0aWZpY2F0ZS9kb3dubG9hZC80OEY5QzBFN0IwQzVBNzA1Qjk4MkJFNTUxNzA1\nRjY0NUM4Qzg3OEE4LmNydDCB5wYDVR0fBIHfMIHcMGygaqBohmZodHRwOi8vbmV4\ndXMtcHJvZHVjdGlvbi5ieXRlZGFuY2UuY29tL2FwaS9jZXJ0aWZpY2F0ZS9jcmwv\nNDhGOUMwRTdCMEM1QTcwNUI5ODJCRTU1MTcwNUY2NDVDOEM4NzhBOC5jcmwwbKBq\noGiGZmh0dHA6Ly9uZXh1cy1wcm9kdWN0aW9uLmJ5dGVkYW5jZS5uZXQvYXBpL2Nl\ncnRpZmljYXRlL2NybC80OEY5QzBFN0IwQzVBNzA1Qjk4MkJFNTUxNzA1RjY0NUM4\nQzg3OEE4LmNybDAKBggqhkjOPQQDAgNJADBGAiEAqMjT5ADMdGMeaImoJK4J9jzE\nLqZ573rNjsT3k14pK50CIQCLpWHVKWi71qqqrMjiSDvUhpyO1DpTPRHlavPRuaNm\nww==\n-----END CERTIFICATE-----",
      //   "cookie": "UIFID_TEMP=4dcf94af82ac0fef720a2d8219d3b55c620704ce678b8fb5e9b4b9df31cb630ad7202154f82413ac311b39b79996ef6ec2f62109a22682b1e8e5d14736b6ca8d6ad31257f79a3804ade288400737e428847ef5fc7908ad244ddf1b54594949105b8b938bea93cfb1ccbbc6bebbda8942; hevc_supported=true; home_can_add_dy_2_desktop=%220%22; stream_recommend_feed_params=%22%7B%5C%22cookie_enabled%5C%22%3Atrue%2C%5C%22screen_width%5C%22%3A1920%2C%5C%22screen_height%5C%22%3A1080%2C%5C%22browser_online%5C%22%3Atrue%2C%5C%22cpu_core_num%5C%22%3A12%2C%5C%22device_memory%5C%22%3A8%2C%5C%22downlink%5C%22%3A10%2C%5C%22effective_type%5C%22%3A%5C%224g%5C%22%2C%5C%22round_trip_time%5C%22%3A50%7D%22; strategyABtestKey=%221743475322.695%22; passport_csrf_token=ae553735ea45bbe771de0883a7dc8877; passport_csrf_token_default=ae553735ea45bbe771de0883a7dc8877; biz_trace_id=f0a78cb5; __security_mc_1_s_sdk_crypt_sdk=854c897b-4334-87b5; bd_ticket_guard_client_web_domain=2; sdk_source_info=7e276470716a68645a606960273f276364697660272927676c715a6d6069756077273f276364697660272927666d776a68605a607d71606b766c6a6b5a7666776c7571273f275e58272927666a6b766a69605a696c6061273f27636469766027292762696a6764695a7364776c6467696076273f275e5827292771273f2731373531373630323136313234272927676c715a75776a716a666a69273f2763646976602778; bit_env=Ra6yq1PGA9aIhgohQzF4RTdB80Pn4vE8YSkTqBLZC3yXS2XHahP4VvUxfAjiCcCG6FAA7wwSBfegosWOio-Zp6myViII3xX-hmBYyNLq_KxIqaqAqhCBiwMNImM2kH5ZNUV5nJ545HsyGU2_FA-g3ggEpBciT-v8VFaQ7BPs_2ACYEhdj8uu-X84B7rRwpQcEY00BbL9ZD-xNXWlnKLEWBnNNd8d48OVg2LWxMejQ5Zbrvo56S-NagHYLXH0vZGWMKxW7UjbFecBBvKrWwa5zOlI3Z_pfOM9Q5FK6JQlRYByr6GjzzS1GWhVhbeifgp3WY_zAU77_XOSGkauYhjy9utbVDEl0YXdog_rkENXyuFxQc9e5lWyyF2nhKAF5g9K6uIspMNYx2TUytoVgVl0yXHnaR3RiNQiNK1AsqJukIKGMsUhQWE0-PEiWoG5xkiFNlcLJGPQVZeUWgRMEOLE-nHnl06KzyBaurhZcNJJmHtSqg8SUcDkN9mZTqk7YP_YbNg63-j9mpX8eBNOfH5y6jxHXAtv6XRlyabLIk5GGeY%3D; gulu_source_res=eyJwX2luIjoiNThkYTc5OGM0MmRjZGQzNmQzNmFkYTA0MzhjZDNkZmZiMDM1ODdmNmEwZDg5NzkyNDFmZDcyN2QxYTViODkwYSJ9; passport_auth_mix_state=wokhqtvt3khdh363tka3aezovzxwa7m3; FORCE_LOGIN=%7B%22videoConsumedRemainSeconds%22%3A180%7D; passport_assist_user=Cj0qu0ntGg0LKdrj-CEh-4YohXpbpWkpEXuuvnFu3ZtJkloahpTnnRc9UuSXpXP_63gsaEmLL4GnxlHBbR6-GkoKPAAAAAAAAAAAAABO0xBCpJdD4BTBge9r39ki8bK64D1oOs7n4VcXpvzD6cKRZDhciy7rIU7Xwl9dvIJP2RD3xe0NGImv1lQgASIBA9tDKhM%3D; n_mh=e0Ld3GtSJrunZoCDTpguvTaFlb_jRiJkrgn0OmXNx3g; sid_guard=63e4a44892e1b0a1bbaadefaae843e7d%7C1743475356%7C5184000%7CSat%2C+31-May-2025+02%3A42%3A36+GMT; uid_tt=9d3fa0c04ca0dc285d8bcb8ffcadb028; uid_tt_ss=9d3fa0c04ca0dc285d8bcb8ffcadb028; sid_tt=63e4a44892e1b0a1bbaadefaae843e7d; sessionid=63e4a44892e1b0a1bbaadefaae843e7d; sessionid_ss=63e4a44892e1b0a1bbaadefaae843e7d; is_staff_user=false; sid_ucp_v1=1.0.0-KGM5YjY5NDcwZTQzMGRlN2Q5NjI2MzcxZjcwMjkyYzdkMzEzOTQxMmIKHwiNhZ61lgMQnKWtvwYY7zEgDDCwju3gBTgHQPQHSAQaAmxxIiA2M2U0YTQ0ODkyZTFiMGExYmJhYWRlZmFhZTg0M2U3ZA; ssid_ucp_v1=1.0.0-KGM5YjY5NDcwZTQzMGRlN2Q5NjI2MzcxZjcwMjkyYzdkMzEzOTQxMmIKHwiNhZ61lgMQnKWtvwYY7zEgDDCwju3gBTgHQPQHSAQaAmxxIiA2M2U0YTQ0ODkyZTFiMGExYmJhYWRlZmFhZTg0M2U3ZA; login_time=1743475355522; SelfTabRedDotControl=%5B%5D; FOLLOW_LIVE_POINT_INFO=%22MS4wLjABAAAAz8lykIJ7932wV6fWcTKJHyQ1AigN1ZhslfyPxfZuKQo%2F1743523200000%2F0%2F1743475358258%2F0%22; _bd_ticket_crypt_cookie=09f5e7e59aef1e4ac2646aebbbd3a822; __security_mc_1_s_sdk_sign_data_key_web_protect=a6195246-4945-bbbd; __security_mc_1_s_sdk_cert_key=2b45f8a4-4da4-bc87; __security_server_data_status=1; publish_badge_show_info=%220%2C0%2C0%2C1743475363033%22; odin_tt=83a21b5dedb85cf4df28add00843b0d18f80d5e1cde0ee0db9d4e9ef41b19540cb30cb3330d2495d1abe55b9feff2af649a6e1f682520e8c790afea6ce1bb8a9; IsDouyinActive=false; ttwid=1%7CdEJar0G12APfhCJDH40PutQnNmhDzT3AgKehB0CY254%7C1743475368%7Ccaaa74bdab7d42600574d87a837c4a22b1c8ab82b9d0db83d3dbeef3115455b8; bd_ticket_guard_client_data=eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtcmVlLXB1YmxpYy1rZXkiOiJCSTYxVVNNR1R6WDMrdXhLODU5L1lRSjFwSlF6SW5odVIwbUhwMjgxaFh3aWFEbEE1TERjNkRzN01EcTlQeDYzWVg3SXhUbkNzTDVBZk9uR2pVbUd6ajQ9IiwiYmQtdGlja2V0LWd1YXJkLXdlYi12ZXJzaW9uIjoyfQ%3D%3D; "
      // }
      let result = await axios_api({method: 'post', url: "douyin/api_img/main", data: {env_data}})
      console.log(`结果:`, result)
      return result
    },

    async 控制台() {
      if (window["WEBVIEW"]) await window["WEBVIEW"].openDevTools()
    },//

    async get_loadURL() {
      await window["WEBVIEW"].loadURL("https://creator.douyin.com")
      await new Promise((resolve) => setTimeout(resolve, 2000))
    },//

    async get_env_data() {
      // let env_data =await window["WEBVIEW"].call_eval(func1.toString())
      window['env_data'] = {}
      window['env_data'] = await document.querySelector("webview").executeJavaScript(`(${func1.toString()})()`)

      function func1() {
        // alert("异常env_data")
        try {
          let prvkey = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_crypt_sdk'])['data'])['ec_privateKey']
          let ticket = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_sign_data_key/web_protect'])['data'])['ticket']
          let ts_sign = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_sign_data_key/web_protect'])['data'])['ts_sign']
          let csr = JSON.parse(window.localStorage['security-sdk/s_sdk_server_cert_key'])["cert"]
          let result = {prvkey, ticket, ts_sign, csr}
          return result
        } catch (error) {
          alert("异常env_data")
        }
      }

      // url_1: "https://douyin.com",
      //     url_2: "https://creator.douyin.com",
      let {webview_name, partition} = this.opt_curr
      console.log(`111---partition:`, partition)
      let cookies_str = await axios_api({method: 'get', url: "ipc/get_cookies_str", params: {partition: partition, url: "https://douyin.com"}})
      env_data['cookie'] = cookies_str
      console.log(`111---env_data:`, env_data)
    },//
// <el-button @click="localStorage_get()">localStorage_get</el-button>
// <el-button @click="localStorage_set()">localStorage_set</el-button>

    async localStorage_get() {
      window['store'] = {}
      window['store'] = await window["WEBVIEW"].call_eval(function () {
        return window.localStorage
      })
      console.log(`localStorage_get---111:`, window['store'])
    },//

    async localStorage_set() {
      let isok = await window["WEBVIEW"].call_eval(function (store) {
        console.log(`localStorage_set---111:`, store)
        for (const key in store) {
          let val = store[key]
          localStorage.setItem(key, val)
          console.log(`localStorage_set---成功:`, {key, val})
        }
        return store
      }, window['store'])
      if (isok) {
        console.log(`localStorage_set---222:`, "成功")
      } else {
        alert("失败")
      }

    },//


    async cookies_get() {
      window['cookies_1'] = []
      window['cookies_2'] = []
      window['cookies_1'] = await axios_api({method: 'get', url: "ipc/get_cookies", params: {partition: "persist:douyin_94667114450", url: "https://douyin.com"}})
      window['cookies_2'] = await axios_api({method: 'get', url: "ipc/get_cookies", params: {partition: "persist:douyin_94667114450", url: "https://creator.douyin.com"}})
    },//

    async cookies_set() {
      await axios_api({method: 'post', url: "ipc/set_cookies", data: {partition: "persist:douyin_1844606013", url: "https://douyin.com", cookies: window['cookies_1']}})
      await axios_api({method: 'post', url: "ipc/set_cookies", data: {partition: "persist:douyin_1844606013", url: "https://creator.douyin.com", cookies: window['cookies_2']}})

    },//


    async test_douyin_img_10() {
      for (let i = 0; i < 10; i++) {
        console.log(`开始次数`, i + 1, "========================")
        await this.test_douyin_img()
        await new Promise((resolve) => setTimeout(resolve, 2 * 1000))
      }


    },//

  },

  async mounted() {


  },
}
</script>

<style scoped>


</style>