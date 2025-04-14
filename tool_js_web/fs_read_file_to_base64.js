

globalThis.fs_read_file_to_base64 = function (file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (event) {
            resolve(event.target.result); // 返回 Base64 字符串
        };

        reader.onerror = function (error) {
            reject(error); // 处理错误
        };

        reader.readAsDataURL(file); // 读取文件
    });
}

