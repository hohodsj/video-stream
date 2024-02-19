const fs = require('fs');
const {glob} = require('glob');
var path = require('path');

let Files = []

module.exports.scanVideosInPath = async(dir) => {
    mountedPath = dir
    shareDir = ""
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