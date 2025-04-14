export default async function get_env_data({partition}) {
    let env_data = {}
    console.log(`partition:`,     partition        )
    env_data['cookie'] = await get_cookies_str({partition, url: 'https://creator.xiaohongshu.com'})
    console.log(`env_data `, env_data)
    return env_data
}