const { uplodingHelper } = require("../helpers");
const { setResponse } = require("../helpers/response.helper");
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  keyFilename: 'biznap-keyfile.json',
});
let bucketName = "gs://biznap-9eb3d.appspot.com"

const uploadGallary = async (req, res, next) => {
  try {
    console.log(req.files.file.name)
    var file = req.files.file
    var filename = file.name

    file.mv('./' + filename, (err) => {
      if (err) throw err
      else console.log("File Uploaded")
    })

    filenamee = filename
    await storage.bucket(bucketName).upload(filenamee, {
      gzip: true,
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
    });
    console.log(`${filenamee} uploaded to ${bucketName}.`);

    await storage.bucket(bucketName).file(filenamee).getSignedUrl({
      action: 'read',
      expires: '03-09-2491'
    }).then(signedUrls => {
      req.image = signedUrls[0]
      // console.log("image ", signedUrls)
    });

    // return
    next()
  } catch (error) {
    console.log(error)
  }
};


const uploadFile = async (filename) => {
  await storage.bucket(bucketName).upload(filename, {
    gzip: true,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  });
  console.log(`${filename} uploaded to ${bucketName}.`);

  await storage.bucket(bucketName).file(filename).getSignedUrl({
    action: 'read',
    expires: '03-09-2491'
  }).then(signedUrls => {
    console.log("image ", signedUrls)
  });
}
// uploadFile();

module.exports = { uploadGallary };
