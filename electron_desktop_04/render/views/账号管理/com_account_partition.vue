<template>
  <el-dialog v-if="show" title="指定partition" width="1200px" v-model="show" draggable :close-on-click-modal="false" :destroy-on-close="true">

    <div>
      <el-button @click="test_douyin_img()">test_douyin_img</el-button>
      <el-button @click="get_loadURL()">get_loadURL</el-button>
      <el-button @click="get_env_data()">get_env_data</el-button>
      <div>
        <el-select v-model="test.option_curr" placeholder="请选择" value-key="id">
          <el-option
              v-for="item in test.options"
              :key="test.option_key"
              :label="test.option_callback(item)"
              :value="item"
              @click.native="handleOptionClick(item)"
          >
          </el-option>
        </el-select>
        <p>当前选中的值: {{ test.option_curr }}</p>
      </div>


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
      test: {
        keyword: "",
        url_1: "https://douyin.com",
        url_2: "https://creator.douyin.com",
        cookies: [],
        cookies_str: "",
        // vue的局限性
        option_callback: (item) => {
          return item.name + "---" + item.webview_name
        },
        option_key: "id",
        option_curr: {id: 1, name: "盾牌", partition: "persist:douyin_1844606013", webview_name: "douyin_1844606013"},
        options: [
          {id: 1, name: "盾牌", partition: "persist:douyin_1844606013", webview_name: "douyin_1844606013", url: "https://douyin.com"},
          {id: 2, name: "衣服2", partition: "persist:douyin_94667114450", webview_name: "douyin_94667114450", url: "https://douyin.com"},
        ],
        // url_1: "https://douyin.com",
        // url_2: "https://creator.douyin.com",

      }
    }
  },

  methods: {
    async open() {
      this.show = true
    },//

    async 导航栏输入框() {
      if (window["WEBVIEW"]) window["WEBVIEW"].loadURL(this.curr_url)
    },//
    async 控制台() {
      if (window["WEBVIEW"]) await window["WEBVIEW"].openDevTools()
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


    async get_loadURL() {
      await window["WEBVIEW"].loadURL("https://creator.douyin.com")
      await new Promise((resolve) => setTimeout(resolve, 2000))
    },//

    async get_env_data() {
      window['env_data'] = {}
      window['env_data'] = await document.querySelector("webview").executeJavaScript(`(${func1.toString()})()`)

      function func1() {
        // alert("异常env_data")
        try {
          let prvkey = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_crypt_sdk'])['data'])['ec_privateKey']
          let ticket = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_sign_data_key/web_protect'])['data'])['ticket']
          let ts_sign = JSON.parse(JSON.parse(window.localStorage['security-sdk/s_sdk_sign_data_key/web_protect'])['data'])['ts_sign']
          let csr = JSON.parse(window.localStorage['security-sdk/s_sdk_server_cert_key'])["cert"]
          return {prvkey, ticket, ts_sign, csr}
        } catch (error) {
          alert("异常env_data")
        }
      }


      let cookies_str = await axios_api({method: 'get', url: "ipc/get_cookies_str", params: {partition: this.test.option_curr.partition, url: "https://creator.douyin.com"}})
      env_data['cookie'] = cookies_str
      console.log(`111---env_data:`, env_data)
    },


    async test_douyin_img() {
      // 原生====================
      await this.get_loadURL()
      await this.get_env_data()

      //修改值=====================
      // window['env_data'] = {
      //   "prvkey": "-----BEGIN PRIVATE KEY-----\r\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgart7u2SMKXxCm61m\r\nb+sCV5uEC0e/lziQfTdipRtpQM2hRANCAAQJv++XCyGwKwzBYcAt8fmzGhUfv0MM\r\n8GREzeMAIi6oD/uqq/DI+LSRXQiG01KileJ27xQgP7I7TR7xENrt2V2d\r\n-----END PRIVATE KEY-----\r\n",
      //   "ticket": "hash.Lf8uTk5exkOvguElxq7zXTvsOD4lQW2WZhTTA1KmtGA=",
      //   "ts_sign": "ts.2.3c20b622370469f0f3efa0a017c12811121dcbf203f26ac851fa1e950e2031f6c4fbe87d2319cf05318624ceda14911ca406dedbebeddb2e30fce8d4fa02575d",
      //   "csr": "-----BEGIN CERTIFICATE-----\nMIIEfTCCBCKgAwIBAgIUXWdS2tzmSoewCWfKFyiWMrJqs/0wCgYIKoZIzj0EAwIw\nMTELMAkGA1UEBhMCQ04xIjAgBgNVBAMMGXRpY2tldF9ndWFyZF9jYV9lY2RzYV8y\nNTYwIBcNMjIxMTE4MDUyMDA2WhgPMjA2OTEyMzExNjAwMDBaMCQxCzAJBgNVBAYT\nAkNOMRUwEwYDVQQDEwxlY2llcy1zZXJ2ZXIwWTATBgcqhkjOPQIBBggqhkjOPQMB\nBwNCAASE2llDPlfc8Rq+5J5HXhg4edFjPnCF3Ua7JBoiE/foP9m7L5ELIcvxCgEx\naRCHbQ8kCCK/ArZ4FX/qCobZAkToo4IDITCCAx0wDgYDVR0PAQH/BAQDAgWgMDEG\nA1UdJQQqMCgGCCsGAQUFBwMBBggrBgEFBQcDAgYIKwYBBQUHAwMGCCsGAQUFBwME\nMCkGA1UdDgQiBCABydxqGrVEHhtkCWTb/vicGpDZPFPDxv82wiuywUlkBDArBgNV\nHSMEJDAigCAypWfqjmRIEo3MTk1Ae3MUm0dtU3qk0YDXeZSXeyJHgzCCAZQGCCsG\nAQUFBwEBBIIBhjCCAYIwRgYIKwYBBQUHMAGGOmh0dHA6Ly9uZXh1cy1wcm9kdWN0\naW9uLmJ5dGVkYW5jZS5jb20vYXBpL2NlcnRpZmljYXRlL29jc3AwRgYIKwYBBQUH\nMAGGOmh0dHA6Ly9uZXh1cy1wcm9kdWN0aW9uLmJ5dGVkYW5jZS5uZXQvYXBpL2Nl\ncnRpZmljYXRlL29jc3AwdwYIKwYBBQUHMAKGa2h0dHA6Ly9uZXh1cy1wcm9kdWN0\naW9uLmJ5dGVkYW5jZS5jb20vYXBpL2NlcnRpZmljYXRlL2Rvd25sb2FkLzQ4RjlD\nMEU3QjBDNUE3MDVCOTgyQkU1NTE3MDVGNjQ1QzhDODc4QTguY3J0MHcGCCsGAQUF\nBzAChmtodHRwOi8vbmV4dXMtcHJvZHVjdGlvbi5ieXRlZGFuY2UubmV0L2FwaS9j\nZXJ0aWZpY2F0ZS9kb3dubG9hZC80OEY5QzBFN0IwQzVBNzA1Qjk4MkJFNTUxNzA1\nRjY0NUM4Qzg3OEE4LmNydDCB5wYDVR0fBIHfMIHcMGygaqBohmZodHRwOi8vbmV4\ndXMtcHJvZHVjdGlvbi5ieXRlZGFuY2UuY29tL2FwaS9jZXJ0aWZpY2F0ZS9jcmwv\nNDhGOUMwRTdCMEM1QTcwNUI5ODJCRTU1MTcwNUY2NDVDOEM4NzhBOC5jcmwwbKBq\noGiGZmh0dHA6Ly9uZXh1cy1wcm9kdWN0aW9uLmJ5dGVkYW5jZS5uZXQvYXBpL2Nl\ncnRpZmljYXRlL2NybC80OEY5QzBFN0IwQzVBNzA1Qjk4MkJFNTUxNzA1RjY0NUM4\nQzg3OEE4LmNybDAKBggqhkjOPQQDAgNJADBGAiEAqMjT5ADMdGMeaImoJK4J9jzE\nLqZ573rNjsT3k14pK50CIQCLpWHVKWi71qqqrMjiSDvUhpyO1DpTPRHlavPRuaNm\nww==\n-----END CERTIFICATE-----",
      //   // "cookie": "UIFID_TEMP=4dcf94af82ac0fef720a2d8219d3b55c620704ce678b8fb5e9b4b9df31cb630ad7202154f82413ac311b39b79996ef6ec2f62109a22682b1e8e5d14736b6ca8d6ad31257f79a3804ade288400737e428c63b911239786d0d6c2f04922bd843f77a2141d594597516e6bf65ef29de2709; hevc_supported=true; home_can_add_dy_2_desktop=%220%22; stream_recommend_feed_params=%22%7B%5C%22cookie_enabled%5C%22%3Atrue%2C%5C%22screen_width%5C%22%3A1920%2C%5C%22screen_height%5C%22%3A1080%2C%5C%22browser_online%5C%22%3Atrue%2C%5C%22cpu_core_num%5C%22%3A12%2C%5C%22device_memory%5C%22%3A8%2C%5C%22downlink%5C%22%3A10%2C%5C%22effective_type%5C%22%3A%5C%224g%5C%22%2C%5C%22round_trip_time%5C%22%3A50%7D%22; strategyABtestKey=%221743473872.475%22; passport_csrf_token=b23689733841c373bd0e4752544332b2; passport_csrf_token_default=b23689733841c373bd0e4752544332b2; biz_trace_id=b35cd35a; __security_mc_1_s_sdk_crypt_sdk=1646c78a-42db-8623; bd_ticket_guard_client_web_domain=2; sdk_source_info=7e276470716a68645a606960273f276364697660272927676c715a6d6069756077273f276364697660272927666d776a68605a607d71606b766c6a6b5a7666776c7571273f275e58272927666a6b766a69605a696c6061273f27636469766027292762696a6764695a7364776c6467696076273f275e5827292771273f2737353236323d36323136313234272927676c715a75776a716a666a69273f2763646976602778; bit_env=ksXYEJ8xP5hDvcbLvQmjxVh_ABVfdrrfNad_UZm1GI73J-cWU8T2iLFwE7Pz0HdjzJuf9KAXwltCIIIDWBlItDR65cNWXfHnAXcZFXh_R-YDCCHyYHZ_7nXJDRIHnvrbiqxP5a1ja8U6WyrNR97dOlwdHRfzluq8KPHK5R-JG9PES-y0L7gaMcH-z58mR8BBOF4muHjqBF6SM4HnbgYtGjdZY_9-UOyu6SRlwS2TyEyT68yxY-iTdxb_6WYwUTT6RQPruiCvz1YP3-iuFz7yi5YSI6iWpCoV_8WQq5u5DfyDmm44hUPip346QgQt509YhwjmZDdnq0mUY0zi8zO2Y6wsTt5Q_VwAFmns41zQhkh9OTeh1Ju2YvVTDAZd5oeTFXICGxvP7DGFqUhGlwBbQI4ljqz3c6LLGgOEFL7NGyBdL5dxwy8wAGmBtv_D-EmNSCPsLfFyStGZ5UP-gxA0mjaIaP6UTXDTBIvbdSUJgl0yw5AaakTvHr0oDshIMJLRLcYRvdTFRYEbUOTT7hPCvr5pEWJ51ydrFlR1uj5MGBc%3D; gulu_source_res=eyJwX2luIjoiNThkYTc5OGM0MmRjZGQzNmQzNmFkYTA0MzhjZDNkZmZiMDM1ODdmNmEwZDg5NzkyNDFmZDcyN2QxYTViODkwYSJ9; passport_auth_mix_state=v3hmshvd5wvyyc5ct2tqdn6sfldc70rg9c59ey0mwd1devlj; FORCE_LOGIN=%7B%22videoConsumedRemainSeconds%22%3A180%7D; passport_mfa_token=CjedKz1xqI%2Ff1NQKz8%2BYSkEOptMdFeszH9U3vSFDH5exQpGTin3m%2B3fkotVYteHCsrWWrvKlqJ2sGkoKPDXRw7FH4rYxHvS49uJK43Vm23S1%2BilCXe56hb9mFr41%2F8DEtzZmu%2FeBMHBxsZAyysJRqaoPsXPA%2B2xo5RDTxe0NGPax0WwgAiIBA7NlArI%3D; d_ticket=ef5d9b05d4a544c3258fdeee67ea7af154055; passport_assist_user=CkF9wlIXYzXmlWRkPOxvz2yBh1F5tK6vkDnwzacuWUtC44C7v14cMED2aov4bk3CrFe7_THozdwAk11AYmhKrpglEhpKCjyo__Tnclc5tR56BjOlmjCK1eCxFHSHJtLoB2hyBpxPq_DiU2j59YIiEFeQC60emzdccNBXIIFBBarwlA0QiMXtDRiJr9ZUIAEiAQOLVkKy; n_mh=Xct6vbRSosX3FaRoQGBQX3aVFZgAaih0wusNwVkOQP4; sid_guard=f43a154686f6fbd8035f3f7c3f9c4b6e%7C1743473922%7C5184000%7CSat%2C+31-May-2025+02%3A18%3A42+GMT; uid_tt=81bcab05402e0680f7f93e9a11a125b6; uid_tt_ss=81bcab05402e0680f7f93e9a11a125b6; sid_tt=f43a154686f6fbd8035f3f7c3f9c4b6e; sessionid=f43a154686f6fbd8035f3f7c3f9c4b6e; sessionid_ss=f43a154686f6fbd8035f3f7c3f9c4b6e; is_staff_user=false; sid_ucp_v1=1.0.0-KDdmYTU0OGI2MmI4OWVhOTFkNzgxODNhN2M4ODI4N2NmOWZmYmE1MDMKIQi7yJDZ8s2WAhCCmq2_BhjvMSAMMOHlyq8GOAdA9AdIBBoCaGwiIGY0M2ExNTQ2ODZmNmZiZDgwMzVmM2Y3YzNmOWM0YjZl; ssid_ucp_v1=1.0.0-KDdmYTU0OGI2MmI4OWVhOTFkNzgxODNhN2M4ODI4N2NmOWZmYmE1MDMKIQi7yJDZ8s2WAhCCmq2_BhjvMSAMMOHlyq8GOAdA9AdIBBoCaGwiIGY0M2ExNTQ2ODZmNmZiZDgwMzVmM2Y3YzNmOWM0YjZl; login_time=1743473921572; SelfTabRedDotControl=%5B%5D; UIFID=4dcf94af82ac0fef720a2d8219d3b55c620704ce678b8fb5e9b4b9df31cb630ad7202154f82413ac311b39b79996ef6ec2f62109a22682b1e8e5d14736b6ca8d156c8d2c477ef95303fa14fe7aedc54dd0e4e5b48fd93ddad71cd6bbec71e87cfaa02a3682f66820a510a3886e27de3e6592c98ba255b9745b4f0d9e41639f6dbf6a792d64efece6896bbaca9842f78f048ca888057d1a4387402843eee3f74df8fb7c72d596d8cd68aa679814aaee2259688fab8653964c62b382e0e64fc030; _bd_ticket_crypt_cookie=52c1ca87d6a30ec632a92ddf8df92d08; __security_mc_1_s_sdk_sign_data_key_web_protect=e922093e-4112-ae2b; __security_mc_1_s_sdk_cert_key=cd4bdc0d-4892-99d9; __security_server_data_status=1; publish_badge_show_info=%220%2C0%2C0%2C1743473929057%22; odin_tt=e3ef5b23eca8b76045ed8ac033aa145530c6eb2ebb18d9302ecc093508e055544eb1c4649ab90bb190a01727443d80f2542abb915963641b46d6331fcc80961d; IsDouyinActive=false; ttwid=1%7CkwoJK8IjCMjQrstlCoZBBG4CtcgMEg-84LyZRRbbJ8s%7C1743473946%7C5a5218e638bc18f86b47905e2fea8ed3e64006ed995bf935aa3337c5b11923c4; bd_ticket_guard_client_data=eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtcmVlLXB1YmxpYy1rZXkiOiJCQW0vNzVjTEliQXJETUZod0MzeCtiTWFGUisvUXd6d1pFVE40d0FpTHFnUCs2cXI4TWo0dEpGZENJYlRVcUtWNG5idkZDQS9zanROSHZFUTJ1M1pYWjA9IiwiYmQtdGlja2V0LWd1YXJkLXdlYi12ZXJzaW9uIjoyfQ%3D%3D; "
      // }
      // window['env_data']['cookie'] = await axios_api({method: 'get', url: "ipc/get_cookies_str", params: {partition: this.test.option_curr.partition, url: "https://creator.douyin.com"}})
      // console.log(`111---env_data:`, window['env_data'])

      let result = await axios_api({method: 'post', url: "douyin/api_img/main", data: {env_data}})
      console.log(`111---result:`, result)
    },

  },

  async mounted() {


  },

  async created() {

  }
}
</script>

<style scoped>


</style>



