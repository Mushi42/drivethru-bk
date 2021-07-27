const unordered = {
    "pp_Version": "1.1",
    "pp_TxnType": "MWALLET",
    "pp_Language": "EN",
    "pp_MerchantID": "MC21876",
    "pp_SubMerchantID": "",
    "pp_Password": "xt9h9ug84s",
    "pp_BankID": "",
    "pp_ProductID": "",
    "pp_TxnRefNo": "T20210724143648",
    "pp_Amount": "10000",
    "pp_TxnCurrency": "PKR",
    "pp_TxnDateTime": "20210724143651",
    "pp_BillReference": "billRef",
    "pp_Description": "Description",
    "pp_TxnExpiryDateTime": "20210725143651",
    "pp_ReturnURL": "https://drive-thro.herokuapp.com/",
    "pp_SecureHash": "B6BBB0C4F0F47F2A69F2D7F38B55DD485A90A8E5A1C916310AF369E743094A67",
    "ppmpf_1": "03013162248",
    "ppmpf_2": "",
    "ppmpf_3": "",
    "ppmpf_4": "",
    "ppmpf_5": ""
}

let str = '', integritySalt = 'fx9tx530xe'
const ordered = Object.keys(unordered).sort().reduce(
    (obj, key) => {
        obj[key] = unordered[key];
        if (obj[key]) {
            str += obj[key] + '&'
        }
        return obj;
    },
    {}
);
str = integritySalt + '&' + str
console.log(str)

hashCode = s => s.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0)
console.log(hashCode(str))