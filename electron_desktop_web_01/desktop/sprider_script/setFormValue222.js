text_value = `ID=${Math.floor(Math.random() * 999999)}___${new Date().getTime()}`
ele = document.querySelector(`[placeholder*="输入视频标题"]`)


tagName = ele.tagName.toLowerCase()
type = ele.type?.toLowerCase()


const originalDescriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(ele), 'value');


Object.defineProperty(ele, 'value', {
    configurable: true,//
    enumerable: true, //
    get: function () {
        return text_value
    }, //
    // set: function (new_value, old_value) {
    //     console.log(`new_value---:`, new_value)
    //     console.log(`old_value---:`, old_value)
    //     if (originalDescriptor && originalDescriptor.set) {
    //         originalDescriptor.set.call(this, text_value);
    //     }
    //
    //     this.dispatchEvent(new Event('input', {bubbles: true}));
    //     // this.dispatchEvent(new Event('change', { bubbles: true }));
    // }
});

ele.value = text_value;