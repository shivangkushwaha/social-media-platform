const { Post, User, Attachment, Comment, Action, UserProfile } = require('../models'); // Adjust path to models
const appConstant = require('../appConstant'); // For STATUS constants
const { sendSucessResponse, sendServerErrorResponse, sendBadResponse } = require('./response.controller');
const { getOffset, totalPages } = require('../utils/helper');


// Create a new Post
const createPost = async (req, res) => {
  try {
        const {
        title,
        htmlTitle,
        content,
        htmlContent,
        coverImage,
        tags,
        } = req.body;

        if(coverImage) {
            let image = await Attachment.findOne({where : {id : coverImage}});
            if(!image) {
                return sendBadResponse(res, "Invalid Cover Image Details")
            }
            await image.update({
                inUse : 1
            })
        }
        const post = await Post.create({
        title,
        htmlTitle,
        content,
        htmlContent,
        coverImage,
        tags,
        status: appConstant.STATUS.INACTIVE, // Default status
        owner : req.auth.userId,
        });

        return sendSucessResponse(res, 'Post created successfully', post, appConstant.STATUS_CODE.CREATED)

    } catch (error) {
        return sendServerErrorResponse(res, error);
    }
};

// Get all Posts
const getAllPosts = async (req, res) => {
  try {
        let { limit, page, sortBy, order, id} = req.query;
        limit = !limit ? +process.env.limit : +limit;
        page = !page ? +process.env.page : +page;
        sortBy = !sortBy ? "id" : sortBy;
        order = !order ? "DESC" : order;
        const offset = getOffset(page, limit);
        const include =  [
            {model : Attachment , attributes:['path'] },
            { model: User, attributes:['id'], include:[
                { model: UserProfile, as: "profile", attributes:['name']}
            ] }, // Include owner details
            { model: Comment, required: false }, // Include associated comments
            { model: Action, required: false }, // Include associated actions
            ]

        if(id) {
            const post = await Post.findOne({
                where: {uuid: id}, 
                include: include
            })

            if(!post) {
                return sendBadResponse(res, 'Post not exist')
            }
            return sendSucessResponse(res, 'Post found', post, appConstant.STATUS_CODE.OK)
        }

        // Fetch posts with count and pagination
        const posts = await Post.findAndCountAll({
            include : include,
            limit,
            offset,
            order: [[sortBy, order]],
        });
        const responseData = {
            currentPage: page,
            totalPages: Math.ceil(posts.count / limit),
            limit: limit,
            data: posts.rows,
        }
        return sendSucessResponse(res, "Post retrived suceessfully",responseData, appConstant.STATUS_CODE.OK );
  } catch (error) {
        return sendServerErrorResponse(res, error);
  }
};

// Get a single Post by ID
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByPk(id, {
      include: [
        { model: User, attributes: ['id', 'name'] },
        { model: Attachment, attributes: ['id', 'filePath'] },
        { model: Comment, attributes: ['id', 'content'] },
        { model: Action, attributes: ['id', 'actionType'] },
      ],
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update a Post
const updatePost = async (req, res) => {
  try {
        const { id } = req.params;
        const { title, htmlTitle, content, htmlContent, coverImage, tags, status } = req.body;

        const post = await Post.findByPk(id);

        if (!post) {
            return sendBadResponse(res, 'Post Not Found', appConstant.STATUS_CODE.BAD_REQUEST);
        }

        await post.update({
        title,
        htmlTitle,
        content,
        htmlContent,
        coverImage,
        tags,
        status,
        });

        return sendSucessResponse(res, 'Post updated successfully', post, appConstant.STATUS_CODE.CREATED)

    } catch (error) {
        return sendServerErrorResponse(res, error);
    }

};

// Delete a Post
const deletePost = async (req, res) => {
  try {
        const { id } = req.params;

        const post = await Post.findByPk(id);

        if (!post) {
            return sendBadResponse(res, 'Post Not Found', appConstant.STATUS_CODE.BAD_REQUEST);
        }

        await post.destroy();
        return sendSucessResponse(res, 'Post updated successfully', post, appConstant.STATUS_CODE.CREATED)

    } catch (error) {
        return sendServerErrorResponse(res, error);
    }

};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
