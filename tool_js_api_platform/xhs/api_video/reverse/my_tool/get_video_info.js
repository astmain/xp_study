// const {getVideoDurationInSeconds} = require('get-video-duration')    //简易得到视频时长   https://www.npmjs.com/package/get-video-duration
const mime = require('mime-types')
const fs = require('fs')
const path = require('path');


async function get_video_info(path_video) {
    let video_path = path_video
    let video_name = path.basename(path_video);
    let video_duration = 0
    // let video_duration = await getVideoDurationInSeconds(path_video)
    let video_type = mime.lookup(path_video)
    let {size: video_size} = fs.statSync(path_video);
    // console.log(`video_path      : `, video_path)
    // console.log(`video_name      : `, video_name)
    // console.log(`video_duration  : `, video_duration)
    // console.log(`video_type      : `, video_type)
    // console.log(`video_size      : `, video_size)
    return {video_path, video_name, video_duration, video_type, video_size}

}

module.exports = get_video_info


// (async () => {
//     let res = await get_video_info("C:\\Users\\Administrator\\Desktop\\000.mp4");
//     console.log(`res:`, res);
// })();
