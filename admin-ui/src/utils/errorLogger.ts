export const APIerrorLogger = (error: any) => {
    if (error.response) {
        console.warn('response Error');
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.data.message) {
            return error.response.data
        }
    } else if (error.request) {
        console.warn('request Error');
        console.warn(error.request);
    } else {
        console.warn('Unknown Error', error.message);
    }
};

export const componentErrorLogger = (error: any) => {
    if (error.message) console.log(error.message);
    if (error.stack) {
        console.warn(error.stack)
    }
    else {
        console.warn(error);
        debugger;
    }
};