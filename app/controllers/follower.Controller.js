const appConstant = require('../appConstant');
const { Follows, User, UserProfile } = require('../models');
const { getOffset } = require('../utils/helper');
const { sendBadResponse, sendServerErrorResponse, sendSucessResponse } = require('./response.controller');
const getInclude = [
    { model: User, attributes: ['id'], include : [{ model : UserProfile , as: 'profile', attributes: ['name']}] }
]

// Follows a user
const followUser = async (req, res) => {
  try {
    const { followerId } = req.body;
    const followeeId = req.auth.userId;

    // Prevent users from following themselves
    if (followerId === followeeId) {
        return sendBadResponse(res, 'You cannot follow yourself.');
    }

    // Check if the follow relationship already exists
    const existingFollow = await Follows.findOne({ where: { followerId, followeeId } });
    if (existingFollow) {
      return sendBadResponse(res, 'You are already following this user.');
    }

    // Create the follow relationship
    await Follows.create({ followerId, followeeId });
    return sendBadResponse(res, 'You following this user.');
} catch (error) {
    return sendServerErrorResponse(res, error)
  }
};

// Unfollow a user
const unfollowUser = async (req, res) => {
  try {
    const { followerId } = req.body;
    const followeeId = req.auth.userId;


    // Check if the follow relationship exists
    const follow = await Follows.findOne({ where: { followerId, followeeId } });
    if (!follow) {
        return sendBadResponse(res, 'You are not following this user.');
    }
    // Delete the follow relationship
    await follow.destroy();
    return sendBadResponse(res, 'You have unfollowed this user.');
  } catch (error) {
    return sendServerErrorResponse(res, error);
  }
};

// Get followers of a user
const getFollowers = async (req, res) => {
  try {
    let { limit, page, sortBy, order, id } = req.query;

    // Apply default values for pagination and sorting
    limit = limit ? +limit : +process.env.LIMIT || 10;
    page = page ? +page : +process.env.PAGE || 1;
    sortBy = sortBy || "id";
    order = order || "DESC";

    // Calculate offset for pagination
    const offset = getOffset(page, limit);

    // The ID of the user whose followers we are querying
    const followeeId = req.auth.userId;

    // Build the `where` clause dynamically
    const where = { followeeId };
    if (id) {
        where.followerId = id; // Filter followers by specific ID
    }

    // Fetch followers with pagination, sorting, and optional filtering
    const followers = await Follows.findAndCountAll({
        where,
        include: getInclude,
        limit,
        offset,
        order: [[sortBy, order]],
    });

    // Format the response with pagination metadata
    let resonseData = {
        currentPage: page,
        totalPages: Math.ceil(followers.count / limit),
        totalItems: followers.count,
        data: followers.rows,
    };

    return sendSucessResponse(res, 'List Fetched Successfully', resonseData , appConstant.STATUS_CODE.OK);

  } catch (error) {
    return sendServerErrorResponse(res, error);
  }
};

// Get following of a user
const getFollowing = async (req, res) => {
  try {
    const followerId = req.auth.userId;

    const following = await Follows.findAll({
      where: { followerId: followerId },
      include: getInclude,
    });

    return res.status(200).json(following);
  } catch (error) {
    return sendServerErrorResponse(res, error);
  }
};

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};
