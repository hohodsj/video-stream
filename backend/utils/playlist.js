const {getVideoDurationInSeconds} = require('./videoProperties')
const ffmpeg = require('ffmpeg')
const fs = require('fs')
const child_process = require('child_process')
const MultiStream = require('multistream')
const MemoryStream = require('memorystream')


const videoFilesMap = [
    {"path": "videos/1.mp4"},
    {"path": "videos/2.mp4"},
    {"path": "videos/3.mp4"},
]

module.exports.findCurrentPlayingVideo = async(playList, range, res) => {
    // sort videos under playList by name
    const files = videoFilesMap.map(x => x["path"])

    const v1time = await getVideoDurationInSeconds(files[0])
    const v2time = await getVideoDurationInSeconds(files[1])
    const v3time = await getVideoDurationInSeconds(files[2])
    console.log(`v1time:${v1time} v2time:${v2time} v3time:${v3time}`)
    findCurrentPlayingVideoTimeTest(files, range, res)
}

findCurrentPlayingVideoTimeTest = (files, range, res) => {
    // individual video
    filePath = files[0]
    const stat = fs.statSync(filePath)
    const fileSize = stat.size;
    if(range){
        const parts = range.replace(/bytes=/,'').split('-')
        const start = parseInt(parts[0], 10)
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunkSize = end  - start + 1;
        const file = fs.createReadStream(filePath, {start,end})
        const head = {
            'Content-Range' :  `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type' : 'video/mp4'
        };
        res.writeHead(206, head)
        file.pipe(res)
    } 
}

// findCurrentPlayingVideoTimeTest = async(files, range, res) => {
//     // individual video
//     // look into video-stitch https://www.npmjs.com/package/video-stitch
//     const filePath1 = files[0]
//     const filePath2 = files[1]

//     const stat1 = fs.statSync(filePath1)
//     const stat2 = fs.statSync(filePath2)
//     console.log(`stat1: ${JSON.stringify(stat1)}`)
//     const fileSize1 = stat1.size;
//     const fileSize2 = stat2.size;
//     console.log(`fileSize1: ${fileSize1}`)
//     console.log(`fileSize2: ${fileSize2}`)
//     const fileSizeTotal = fileSize1 + fileSize2
//     if(range){
//         const parts = range.replace(/bytes=/,'').split('-')
//         const start = parseInt(parts[0], 10)
//         const end = parts[1] ? parseInt(parts[1], 10) : fileSizeTotal - 1;
//         var memStream = new MemoryStream();
//         const chunkSize = end  - start + 1;
//         const file1 = fs.createReadStream(filePath1)
//         const file2 = fs.createReadStream(filePath2)
//         const ws = fs.createWriteStream('./test.mp4')
//         file1.on('data', (buffer) => {
//             ws.write(buffer)
//             memStream.write(buffer)
//         })
//         file2.on('data', (buffer) => {
//             ws.write(buffer)
//             memStream.write(buffer)
//         })
//         const head = {
//             'Content-Range' :  `bytes ${start}-${end}/${fileSizeTotal}`,
//             'Accept-Ranges': 'bytes',
//             'Content-Length': chunkSize,
//             'Content-Type' : 'video/mp4'
//         };
//         res.writeHead(206, head)
//         const fileAll = fs.createReadStream('./test.mp4', {start, end})
//         fileAll.pipe(res)
//     } 
// }