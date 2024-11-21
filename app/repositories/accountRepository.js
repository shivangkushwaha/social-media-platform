const { Account } = require('../models');

class AccountRepository {
    async createAccount(data) {
        return await Account.create(data);
    }

    async findAllAccounts(limit) {
        return await Account.findAll({ limit });
    }

    async findAccountById(id) {
        return await Account.findByPk(id);
    }

    async findAccountByEmail(email) {
        return await Account.findOne({ where: { email } });
    }

    async updateAccount(id, data) {
        const account = await Account.findByPk(id);
        if (account) {
            return await account.update(data);
        }
        return null;
    }

    async deleteAccount(id) {
        const account = await Account.findByPk(id);
        if (account) {
            return await account.destroy();
        }
        return null;
    }
}

module.exports = new AccountRepository();
