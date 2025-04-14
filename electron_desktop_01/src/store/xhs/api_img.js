export default async function api_img({partition}) {
    // 环境变量
    let env_data = await this.get_env_data({partition})
    // 执行脚本
    return await api_platform222.xhs.api_img({form_data: {}, env_data})
}