const accountService = require('../services/accountService');

const {sendServerErrorResponse, sendSucessResponse, sendBadResponse} = require("../controllers/response.controller");
const appConstant = require('../appConstant');
 
exports.createAccount = async (req, res) => {
    try {
        const account = await accountService.createAccount(req.body);
        return sendSucessResponse(res, "Account Created Sucessfully", account, appConstant.STATUS_CODE.CREATED);
    } catch (error) {
        if (error === 'ALREADY_REGISTERD') {
            return sendBadResponse(res, 'Email id is already registed with us.', appConstant.STATUS_CODE.BAD_REQUEST)
        }
        
        return sendServerErrorResponse(res, error)
    }
};

exports.getAccounts = async (req, res) => {
    try {
        const { limit } = req.query;
        const accounts = await accountService.getAccounts(parseInt(limit, 10) || process.env.limit);
        return sendSucessResponse(res, "Account fatched Sucessfully", accounts, appConstant.STATUS_CODE.OK);
    } catch (error) {
        return sendServerErrorResponse(res, error)
    }
};

exports.getAccountById = async (req, res) => {
    try {
        const account = await accountService.getAccountById(req.params.id);
        if (account) {
            return sendSucessResponse(res, "Account details fatched Sucessfully", account, appConstant.STATUS_CODE.OK);
        } else {
            return sendBadResponse(res, 'Account not found', appConstant.STATUS_CODE.NOT_FOUND)
        }
    } catch (error) {
        return sendServerErrorResponse(res, error)
    }
};

exports.updateAccount = async (req, res) => {
    try {
        const account = await accountService.updateAccount(req.params.id, req.body);
        if (account) {
            res.status(200).json(account);
            return sendSucessResponse(res, "Account details updated Sucessfully", account, appConstant.STATUS_CODE.OK);
        } else {
            return sendBadResponse(res, 'Account not found', appConstant.STATUS_CODE.NOT_FOUND)
        }
    } catch (error) {
        return sendServerErrorResponse(res, error)
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const account = await accountService.deleteAccount(req.params.id);
        if (account) {
            return sendSucessResponse(res, "Account deactivated Sucessfully", account, appConstant.STATUS_CODE.OK);
        } else {
            return sendBadResponse(res, 'Account not found', appConstant.STATUS_CODE.NOT_FOUND)
        }
    } catch (error) {
        return sendServerErrorResponse(res, error)
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await accountService.login(email, password);

        return sendSucessResponse(res, "Logged in Sucessfully", result, appConstant.STATUS_CODE.OK);
    } catch (error) {
        if (error === 'INVALID_EMAIL') {
            return sendBadResponse(res, 'You are not registerd with us.', appConstant.STATUS_CODE.BAD_REQUEST)
        }
        else if (error === 'INVALID_CREDANTIALS') {
            return sendBadResponse(res, 'Invalid email or password', appConstant.STATUS_CODE.BAD_REQUEST)
        }
        return sendServerErrorResponse(res, error)
    }
};
