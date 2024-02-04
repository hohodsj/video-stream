const {getVideoDurationInSeconds} = require('get-video-duration')
const fs = require('fs')

module.exports.getVideoDurationInSeconds = findTimeLengthOfVideo = async(video) => {
    console.log(`${video}`)
    try{
        const videoStream = fs.createReadStream(video)
        console.log(`videoStream: ${videoStream} length:${videoStream.videoLength}`)
        const videoLength = await getVideoDurationInSeconds(videoStream)
            .then((duration) => duration)
        return Promise.resolve(videoLength)
    } catch(e) {
        console.log(`Err:${e}`)
    }
}