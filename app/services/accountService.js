const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const accountRepository = require('../repositories/accountRepository');

class AccountService {
    async createAccount(data) {
        const exist = await accountRepository.findAccountByEmail(data.email);
        if(exist){
            throw "ALREADY_REGISTERD"
        }
        data.password = await bcrypt.hash(data.password, 10);
        return await accountRepository.createAccount(data);
    }

    async getAccounts(limit) {
        return await accountRepository.findAllAccounts(limit);
    }

    async getAccountById(id) {
        return await accountRepository.findAccountById(id);
    }

    async updateAccount(id, data) {
        data.last_modified = new Date();
        return await accountRepository.updateAccount(id, data);
    }

    async deleteAccount(id) {
        return await accountRepository.deleteAccount(id);
    }

    async login(email, password) {
        const account = await accountRepository.findAccountByEmail(email);
        if(!account) {
            throw "INVALID_EMAIL"
        }
        if (account && await bcrypt.compare(password, account.password)) {
            const token = jwt.sign({ id: account.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { token };
        }
        throw new Error('INVALID_CREDANTIALS');
    }
}

module.exports = new AccountService();
