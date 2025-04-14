module.exports = async function douyin_scroll({spider}) {
    await spider.web_goto({desc: "页面跳转", url: "https://www.douyin.com/video/7355075809490586932?modeFrom=searchResult"})
    await spider.web_goto({desc: "页面跳转", url: "https://www.douyin.com"})
    for (let i = 0; i < 50; i++) {
        await spider.page.evaluate(async (i) => {
            document.querySelector('.dy-account-close')?.click()
            document.querySelector('.xgplayer-playswitch-next')?.click()
            await new Promise((resolve) => setTimeout(resolve, 2000))
            console.log(`成功:点击-抖音下一页`)
        }, i)
    }
    return {msg: `提交成功`, isok: true, error: ``}

}



