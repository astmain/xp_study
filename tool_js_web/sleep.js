globalThis.sleep = function sleep(my_time) {
    my_time = my_time ? my_time : 1 * 1000
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            reslove('111');
        }, my_time);
    });
}


// await new Promise((resolve) => setTimeout(resolve, 3000))
