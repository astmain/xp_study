

module.exports = run_ipc
async function run_ipc() {
    // IPC通信 =============================================================================
    require("./IPC_get_PATH")
    require("./IPC_get_cookies")
    require("./IPC_get_cookies_str")
    require("./IPC_set_cookies")
    require("./IPC_set_cookies_item")
}