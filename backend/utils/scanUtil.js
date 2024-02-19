const fs = require('fs');
const {glob} = require('glob');
var path = require('path');

let Files = []

module.exports.scanVideosInPath = async(dir) => {
    mountedPath = dir
    shareDir = ""
    // https://www.npmjs.com/package/samba-client
    // if (mountedPath.length === 0) {
    //     try {
    //         shareDir = "/mnt/share"
    //       execSync(
    //         `sudo mount -t cifs -o username=guest,password= ${dir} ${shareDir}`
    //       );
    //     } catch (error) {
    //       console.log(
    //         "Host unavailable, trying again in" + config.timeout + " seconds..."
    //       );
    //       await sleep(config.timeout * 1000) //stop the excution for the given seconds;
    //     }
    // }
    const file = fs.readFileSync('/app/Videos/Anime/Test/1.mp4')
    console.log(file)
    ThroughDirectory('/app/Videos')
    console.log(Files)
}

function ThroughDirectory(Directory) {
  fs.readdirSync(Directory).forEach(File => {
      const Absolute = path.join(Directory, File);
      if (fs.statSync(Absolute).isDirectory()) return ThroughDirectory(Absolute);
      else return Files.push(Absolute);
  });
}