module.exports = async function toutiao_article({spider}) {


    await spider.web_goto({desc: "页面跳转", url: "https://mp.toutiao.com/profile_v4/graphic/publish?from=toutiao_pc"})
    await spider.web_input_text({desc: "输入标题", css: ".title-wrapper  textarea", text: "我的文章标题"})


    return {msg: `提交成功`, isok: true, error: ``}
}


/*


const element = document.querySelector(".title-wrapper  textarea");
if (!element) {
    throw new Error(`Element not found`);
}

 tagName = element.tagName.toLowerCase();
 type = element.type?.toLowerCase();
 console.log(`element---:`,     element        )
 console.log(`tagName---:`,     tagName        )
 console.log(`type---:`,     type        )



* */


