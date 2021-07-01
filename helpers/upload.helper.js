const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');
const slugify = require('slugify')

const option = {
    replacement: '_',  // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true,      // convert to lower case, defaults to `false`
    strict: false,     // strip special characters except replacement, defaults to `false`
    locale: 'vi'       // language code of the locale to use
}

console.log('------------------', slugify('SSOM Stinr', option))

// File path.
readXlsxFile('./Universities Data.xlsx').then((rows) => {
    // `rows` is an array of rows
    // each row being an array of cells.


    let records = [];
    // let obj = { university_name: '', departments: [], };

    let headings = rows.slice(0, 1)[0];
    let temp = null;
    rows.forEach((element, index) => {
        let obj = {};
        if (index != 0) {

            if (element.filter(ele => ele=== null).length != 6 ) {

                obj.university_name = element[0];
                obj.department = element[1];
                obj.eligibility = element[2];
                obj.date = element[3];
                obj.test = element[4];
                obj.years_of_graduation = element[5];
    
                records.push(obj);
            }

        }
    });


    console.log(headings);
    console.log('data', records);

    let data = JSON.stringify(records);
    fs.writeFileSync('student-2.json', data);

})


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