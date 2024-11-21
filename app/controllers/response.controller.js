const appConstant = require("../appConstant"); // Importing app constants from a separate file
const errorMessages = require("../config/errorMessages.json"); // Importing error messages from a JSON file
const logger = require("../utils/winston");

module.exports = {
  /**
   * Sends a bad response with a specified message and status code.
   * @param {Object} res - The response object
   * @param {String} message - The error message to be sent
   * @param {Number} statusCode - The HTTP status code (default: 400 - Bad Request)
   */
  sendBadResponse: (res, message, statusCode = appConstant.STATUS_CODE.BAD_REQUEST) => {
    return res.status(statusCode).send({
      success: false,
      display: true,
      message: message,
      responseData: {}
    });
  },

  /**
   * Sends a successful response with a specified message and data.
   * @param {Object} res - The response object
   * @param {String} message - The success message to be sent
   * @param {Object} response - The response data (default: empty object)
   * @param {Number} statusCode - The HTTP status code (default: 200 - OK)
   */
  sendSucessResponse: (res, message, response = {}, statusCode = appConstant.STATUS_CODE.OK) => {
    return res.status(statusCode).send({
      success: true,
      display: true,
      message: message,
      responseData: response
    });
  },

  /**
   * Sends a server error response with a specified error message.
   * @param {Object} res - The response object
   * @param {String} error - The error message to be sent (default: "Something went wrong")
   */
  sendServerErrorResponse: (res, error = errorMessages.somethingWentWrong) => {
    logger.error(`Internal Server Error at ${Date.now()} , with Message : ${error.toString()}`);
    return res.status(appConstant.STATUS_CODE.SERVER_ERROR).send({
      success: false,
      display: true,
      message: error.toString(),
      responseData: {}
    });
  },

  /**
   * Formats a response for GET requests with pagination data.
   * @param {Number} limit - The limit of records per page
   * @param {Number} totalRecords - The total number of records
   * @param {Number} totalPages - The total number of pages
   * @param {Number} currentPage - The current page number
   * @param {Array} data - The response data
   */
  responseForGet: (limit, totalRecords, totalPages, currentPage, data) => {
    return {
      limit,
      totalRecords,
      totalPages,
      data,
      currentPage,
      count: data.length
    };
  }
}