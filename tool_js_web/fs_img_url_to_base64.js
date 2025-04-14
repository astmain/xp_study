
globalThis.fs_img_url_to_base64 = function (url) {
  let axios = require("axios").default
    return new Promise((res, rej) => {
        axios.get(url, {responseType: "blob",}).then((response) => {
            let reader = new FileReader()
            reader.readAsDataURL(response.data)
            reader.onload = function (e) {
                res(e.target.result)
            }
        })
    })
}
