module.exports = async function localStorage_set({ partition, local_storage, url }) {

    // 判断数据store
    let local_storage_str = '{}'
    if (Object.prototype.toString.call(local_storage) === '[object String]') {
        local_storage_str = JSON.parse(local_storage)
    } else if (Object.prototype.toString.call(local_storage) === '[object Object]') {
        local_storage_str =  JSON.stringify(local_storage)
    } else {
        throw Error('数据异常----localStorage_set---local_storage')
    }


    // 是否页面跳转
    if (url) {
        await this.executeJavaScript(`(     ()=>    window. location.href ="${url}"    )()`)
        await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    // 注入store
    await this.executeJavaScript(
        `(${function (local_storage) {
            for (const key in local_storage) {
                let val = local_storage[key]
                localStorage.setItem(key, val)
            }
        }})(${local_storage_str})`,
    )
    return local_storage_str
}
