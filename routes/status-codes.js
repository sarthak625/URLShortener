let errors = {
    InternalServerError : () => {
        return {
            code    : 500,
            message : 'Internal Server Error'
        }
    },

    NotFound : (message, params) => {
        let response = {
            code : 404,
            message : message || 'Not Found'
        };

        if (params){
            for (let param in params){
                response[param] = params[param];
            }
        }

        return response;
    },

    BadRequest : (message, params) => {
        let response = {
            code : 400,
            message : message || 'Bad request'
        };

        if (params){
            for (let param in params){
                response[param] = params[param];
            }
        }

        return response;
    }
}

let success = {
    Success : ( message, params )=>{
        let response = {
            code : 200,
            message : message || 'Success'
        };

        if (params){
            for (let param in params){
                response[param] = params[param];
            }
        }

        return response;
    }
}

module.exports = {
    success,
    errors
}