const {getVideoDurationInSeconds} = require('get-video-duration')
const fs = require('fs')

module.exports.getVideoDurationInSeconds = findTimeLengthOfVideo = async(video) => {
    const videoStream = fs.createReadStream(video)
    const videoLength = await getVideoDurationInSeconds(videoStream)
        .then((duration) => duration)
    return Promise.resolve(videoLength)
}