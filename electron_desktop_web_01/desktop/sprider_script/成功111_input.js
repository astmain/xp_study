
// 这是一段代码修改input元素输入值
text_value = `ID=${Math.floor(Math.random() * 999999)}`
ele = document.querySelector(`input[placeholder*="输入视频标题"]`)//知乎-视频-标题
// ele = document.querySelector(`textarea[placeholder*="填写视频简介"]`)//知乎-视频-简介
// ele = document.querySelector(`textarea[placeholder*="请输入文章标题"]`)//头条-文章
Object.defineProperty(ele, 'value', {
    get: function () {
        return text_value;
    }, //
    set: function (new_value) {
        console.log(`new_value---:`, new_value)
        Object.getOwnPropertyDescriptor(Object.getPrototypeOf(ele), 'value').set.call(this, text_value)
        this.dispatchEvent(new Event('input', { bubbles: true }));
        this.dispatchEvent(new Event('change', { bubbles: true }));
    }
})
ele.value = text_value




ele222 = document.querySelector(`textarea[placeholder*="填写视频简介"]`)//知乎-视频-简介
ele222.textContent = "我的11111111-填写视频简介"


ele222.dispatchEvent(new InputEvent('input', {
    bubbles: true,
    cancelable: true,
    inputType: 'insertText',
    data: "我的11111111-填写视频简介"
}));
