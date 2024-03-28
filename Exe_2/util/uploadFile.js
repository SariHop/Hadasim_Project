const path = require("path");

/**
 * Function for uploading files.
 * @param {object} req - The request object.
 * @param {string} fileKey - The key of the file within the request object.
 * @param {string} dest - The destination where the file will be stored (if not specified, the original name of the file).
 * @param {number} max_mb - The maximum allowed file size in megabytes (default: 5 MB).
 * @param {array} filesAllow - An array of allowed file extensions (default: ['.png', '.jpg', '.gif', '.jpeg']).
 * @returns {Promise} - Returns a promise for the result or rejects with an error in case of failure.
 */

exports.uplodFiles = (req,fileKey,dest,max_mb=5,filesAllow=[".png",".jpg",".gif",".jpeg"]) => {
  return new Promise((resolve,reject) => {
    if(!req.files){
      reject({msg:"you need to send file",code:"send_file"})
    }
    let myFile = req.files[fileKey];
    if(!myFile){
      reject({msg:"you need to send file",code:"send_file"})
    }
    if (myFile.size <= 1024 * 1024 * max_mb) {
      let extFile = path.extname(myFile.name)
      if (filesAllow.includes(extFile)) {
        dest = dest != "" ? dest : myFile.name
        myFile.mv("public/" + dest, (err) => {
          if (err) { return res.status(401).json({ msg: "error", err }) }
          resolve({ msg: "file upload" });
        })
      }
      else{
        reject({ msg: "File not allowed ",code:"ext" });
      }
    }
    else {
      reject({ msg: "File too big, max "+max_mb+" mb!",code:"max" });
    }
  })

}