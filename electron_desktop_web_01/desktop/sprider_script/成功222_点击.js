


const element = document.querySelector(`input[value*="4"]`)
if (!element) alert("没有找到元素")


const tagName = element.tagName.toLowerCase()
const type = element.type?.toLowerCase()

// 触发点击事件
element.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}))
element.dispatchEvent(new MouseEvent('mousedown', {bubbles: true, cancelable: true, view: window}))
element.dispatchEvent(new MouseEvent('mouseup', {bubbles: true, cancelable: true, view: window}))
element.focus()

