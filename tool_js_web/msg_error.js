globalThis.msg_error = function ({msg = '默认消息', duration = 2 * 1000, showClose = true}) {
    msg = msg ? msg : 111111;
    // 创建一个容器
    if (window.ele_warp) {
        "跳过"
    } else {
        // 创建一个容器
        window.ele_warp = document.createElement('div');
        window.ele_warp.className = 'ele_warp';
        window.ele_warp.innerHTML = `<div></div> `;
        window.ele_warp.style.position = `fixed`;
        window.ele_warp.style.top = `0px`;
        window.ele_warp.style.left = `50%`;
        window.ele_warp.style.transform = `translateX(-50%)`;
        window.ele_warp.style.zIndex = `999999`;
        // window.ele_warp.style.border = `1px solid red`;
        document.body.appendChild(ele_warp);
    }


    // 创建一个style标签
    let ele_style = document.createElement('style');
    ele_style.className = 'ele_style';
    ele_style.innerHTML = `
        .ele_span {
            background-color: #cb0000 !important;
            color: #fff !important;
            margin: 20px 0px;
            padding: 10px 15px ;
            text-align: center;
            border-radius: 4px !important;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5)!important;
        }`;
    // 创建一个span标签
    let ele_span = document.createElement('div');
    ele_span.className = 'ele_span';
    ele_span.innerHTML = `<span>${message}</span> `;
    ele_span.appendChild(ele_style)
    ele_warp.appendChild(ele_span);

    // 延迟器删除span
    setTimeout(() => ele_span.parentNode.removeChild(ele_span), duration);

    //   返回结果
    return arguments;
};

