const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');
const AWS = require('aws-sdk');

/* 
const slugify = require('slugify')

const option = {
    replacement: '_',  // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true,      // convert to lower case, defaults to `false`
    strict: false,     // strip special characters except replacement, defaults to `false`
    locale: 'vi'       // language code of the locale to use
}

console.log('------------------', slugify('SSOM Stinr', option));
 */

exports.excelFile = excelFile = excelFile => new Promise((resolve, reject) => {

    // File path.
    readXlsxFile(excelFile).then((rows) => {

        let records = [];
        rows.forEach((element, index) => {
            let obj = {};
            if (index != 0) {

                /*
                name
                department
                city
                eligibility
                date
                test
                years_of_graduation 
                 */

                if (element.filter(ele => ele === null).length != 6) {

                    obj.name = !element[0] ? "" : element[0];
                    obj.fee = !element[1] ? "" : element[1];
                    obj.city = !element[2] ? "" : element[2];
                    obj.facutly = !element[3] ? "" : element[3];
                    obj.department = !element[4] ? "" : element[4];
                    obj.eligibility = !element[5] ? "" : element[5];
                    obj.date = !element[6] ? "" : element[6];
                    obj.test = !element[7] ? "" : element[7];
                    obj.years_of_graduation = !element[8] ? "" : element[8];
                    records.push(obj);
                }

            }
        });

        if (records.length) {
            fs.unlinkSync(excelFile)
            resolve(records)
        }



        // console.log(headings);
        // console.log('data', records);

        // let data = JSON.stringify(records);
        // fs.writeFileSync('student-2.json', data);

    }).catch(err => reject(err));

})

exports.uploadFile = uploadFile = (file, fileSize, fileType, fileStoragePath) => new Promise((resolve, reject) => {

    /* If Dir not exist */
    if (!fs.existsSync(`public`)) {
        fs.mkdirSync(`public`);
    }

    const fileName = file.name.split('.')
    if (file.size / 1000000 > fileSize) {
        const response = { status: false, message: `Your file size is greater than ${fileSize}MB` }
        resolve(response)
    } else if (fileName[fileName.length - 1] !== fileType) {
        const response = { status: false, message: `Please upload ${fileType} file!` }
        resolve(response)
    }
    const filePathWithFileName = `public/${fileStoragePath}/${file.name}`;

    /* If Dir not exist */
    if (!fs.existsSync(`public/${fileStoragePath}`)) {
        fs.mkdirSync(`public/${fileStoragePath}`);
    }

    /* File Stored */
    file.mv(filePathWithFileName, function (err) {
        if (err) {
            reject(err)
        }
        const response = { status: true, message: `file uploaded!`, data: { filePathWithFileName: filePathWithFileName.replace('public/', '') } }
        resolve(response)
    });
});

exports.uploadFileS3 = uploadFile = (file, fileSize, fileStoragePath) => new Promise((resolve, reject) => {

    /* If Dir not exist */
    if (!fs.existsSync(`public`)) {
        fs.mkdirSync(`public`);
    }

    const fileName = file.name.split('.')
    if (file.size / 1000000 > fileSize) {
        const response = { status: false, message: `Your file size is greater than ${fileSize}MB` }
        resolve(response)
    }
    console.log(fileStoragePath)
    const filePathWithFileName = `public/${fileStoragePath}/${file.name}`;

    /* If Dir not exist */
    if (!fs.existsSync(`public/${fileStoragePath}`)) {
        fs.mkdirSync(`public/${fileStoragePath}`);
    }

    const s3 = new AWS.S3({

        accessKeyId: process.env.ACCESS_KEY_ID,

        secretAccessKey: process.env.SECRET_ACCESS_KEY

    });
    /* File Stored */
    file.mv(filePathWithFileName, function (err) {
        if (err) {
            reject(err)
        }
    });
    console.log('File Path', filePathWithFileName)
    // return
    const filePath = filePathWithFileName;

    fs.readFile(filePath, (err, data) => {

        if (err) throw err;
        const readStream = fs.createReadStream(filePath);
        const params = {

            Bucket: 'drivethrumedia-bucket',

            Key: file.name,

            Body: readStream

        };

        s3.upload(params, function (s3Err, data) {

            if (s3Err) throw s3Err
            readStream.destroy();
            console.log(`File uploaded successfully at ${data.Location}`)
            fs.unlinkSync(filePathWithFileName)
            resolve({ status: true, message: `file uploaded!`, data: data.Location })

        });
        // const response = { status: true, message: `file uploaded!`, data: { filePathWithFileName: filePathWithFileName.replace('public/', '') } }
        // resolve(response)
    });
});




/*
    [ 'University Name',
  'Departments',
  'Eligibility',
  'Dates',
  'Test',
  'Years of Graduation' ]


*/

// Readable Stream.
// readXlsxFile(fs.createReadStream('./Universities Data.xlsx')).then((rows) => {
//     let records = [];
//     // let obj = { university_name: '', departments: [], };

//     let headings = rows.slice(0, 1)[0];
//     let temp= null;
//     rows.forEach((element, index) => {
//         let obj = {};
//         if (index != 0) {
//             obj.university_name = element[0];
//             obj.department = element[1];
//             obj.eligibility = element[2];
//             obj.date = element[3];
//             obj.test = element[4];
//             obj.years_of_graduation = element[5];

//             records.push(obj);
//         }
//     });


//     console.log(headings);
//     console.log('data', records);

//     let data = JSON.stringify(records);
//     fs.writeFileSync('student-2.json', data);


//     //   console.log(rows);
// })
