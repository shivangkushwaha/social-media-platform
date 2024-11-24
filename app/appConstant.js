module.exports = {
    DEVELOPMENT_ENV: "development",
    PRODUCTION_ENV: "production",
    OTP_LENGTH_DIGITS: 4,
    STATUS:{
        ACTIVE: 1,
        INACTIVE: 0
    },
    MASTER_OTP:"9999",
    OTP_USED_DIGITS: "0123456789",
    ROLES: {
        ADMIN: "admin",
        USER: "user"
    },
    ROLES_IDS: {
        ADMIN: 1,
        USER: 2
    },
    STATUS_CODE: {
        CREATED: 201,
        UPDATED: 202,
        OK: 200,
        NOT_FOUND: 404,
        BAD_REQUEST: 400,
        SERVER_ERROR: 500,
        METHOD_NOT_ALLOWED: 405,
        PERMISSION_NOT_ALLOWED:422
    },

    PAYMENT_MODE:["COD","CARD","UPI"],
    USER_ACCOUNT_STATUS : {
        "TOKEN_EXPIRED": 1,
        "ACCOUNT_DEACTIVATED": 0,
        "ACCOUNT_DEACTIVATED_BY_ADMIN": 2,

    },
    STORAGE_FOLDER_NAME : 'uploads',
    POST_ACTIONS : {
        'LIKE' : 1,
        'HAPPY' : 2,
        "SAD" : 3
    }

}