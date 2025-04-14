class login_check {
    constructor() {
    }

    async exist_acc_partition_list({list}) {
        let __path = electron.app.__path
        let fs = electron.app.fs
        let path_Partitions = electron.app.path_Partitions
        for (let i = 0; i < list.length; i++) {
            let acc = list[i]
            let path_partition = __path.join(path_Partitions, acc.partition.replace("persist:", ""))
            console.log(`111---path_partition:`, path_partition)
            let exist = fs.existsSync(path_partition)
            if (exist) {
                console.log(`111---有存在---path_partition:`, path_partition)
            } else {
                console.log(`222---不存在---path_partition:`, path_partition)
                let temp__ = await webview_run({container: "body", url: "about:blank", partition: acc.partition, className: "temp__"})
                console.log(`333---创建temp__:`, temp__)
                setTimeout(() => document.querySelectorAll(".temp__").forEach(item => item.remove()), 10000)  //删除临时webview
            }
        }
    }

    async login_line({list}) {
        for (let i = 0; i < list.length; i++) {
            let acc = list[i]
            let user = {}
            // 本地检查登录
            let cookies_str1 = await get_cookies_str({url: acc.url, partition: acc.partition})
            // debugger
            let user1 = await BUS.config_all_platform[acc.platform].login_api(cookies_str1)
            if (user1.nickname) {
                await tb_account.save_one({...acc, ...user1})
                console.log(`111---本地:`,         )
            } else {
                // 数据库检查登录
                let user2 = await BUS.config_all_platform[acc.platform].login_api(acc.cookies_str)
                if (user2.nickname) {
                    await set_cookies({cookies: acc.cookies, partition: acc.partition, url: acc.url})
                    let webview = await webview_run({container: "body", url: acc.url, partition: acc.partition, className: "temp__"})
                    await webview.localStorage_set({partition: acc.partition, local_storage: acc.local_storage})
                    await tb_account.save_one({...acc, ...user2})
                    console.log(`222---数据库:`,         )
                } else {
                    acc.line = false
                    await tb_account.save_one({...acc})
                }
            }
        }
    }

    async run({list}) {
        await this.exist_acc_partition_list({list})
        await this.login_line({list})
    }

}

export default login_check