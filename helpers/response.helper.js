
const success = (res, message, data) => {
    res.status(200).json({
        status: 'Success',
        message,
        data
    });
};

const bad = (res, message) => {
    res.status(400).json({
        status: 'Error',
        message
    });
};

const notFound = (res) => {
    res.status(404).json({
        status: 'Error',
        message: 'Not found!',
    });
};

const serverError = (res, data) => {
    // console.log("server Error", data.message)
    if (data.message.endsWith('24 hex characters')) {
        return bad(res, 'Please provide the valid Id')
    }
    if (data.message.startsWith('Cast to ObjectId')) {
        return bad(res, 'Please provide the valid Id')
    }

    res.status(500).json({
        status: 'Error',
        message: 'Internal Server Error',
        data: data.stack
    });
};

const setResponse = (res, { type, message = '', data = {} }) => {
    switch (type) {
        case 'success':
            success(res, message, data)
            break;
        case 'bad':
            bad(res, message)
            break;
        case 'notFound':
            notFound(res)
            break;
        case 'serverError':
            serverError(res, data)
            break;

        default:
            break;
    }
};

module.exports = {
    setResponse
}