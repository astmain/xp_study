let {pinyin} = require("pinyin-pro")


globalThis.pinyin_zh = function pinyin_zh(my_text) {
    return pinyin(pinyin_zh, {toneType: "none", nonZh: 'consecutive', separator: '_'})
}


