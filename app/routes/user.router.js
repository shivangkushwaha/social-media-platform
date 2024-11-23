const controller = require("../controllers/user.controller");
const router = require('express').Router();
const {
    sendOtpSchema,
    loginSchema,
    resedOtpSchema,
    verifyOTP,
    changePasswordSchema,
    updateProfileSchema
    } = require("../schema/user.schema");
const { scopeValidator } = require("../middleware/scope.middlewares");
const { authentication } = require("../middleware/authentication.middlewares");
const {
        validator,
    } = require("../middleware/validator.middlewares");
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login to the application
 *     description: Authenticates a user with email and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@ecomstore.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: dummy-token-123
 *       400:
 *         description: Missing email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email and password are required.
 *       401:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid email or password.
 */

/**
 * @swagger
 * /send-otp:
 *   post:
 *     summary: Send an OTP to the user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendOTP'
 *     responses:
 *       200:
 *         description: OTP sent successfully
 */

/**
 * @swagger
 * /verify-otp:
 *   post:
 *     summary: Verify an OTP
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyOTP'
 *     responses:
 *       200:
 *         description: OTP verified successfully
 */

/**
 * @swagger
 * /resend-otp:
 *   post:
 *     summary: Resend an OTP
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResendOTP'
 *     responses:
 *       200:
 *         description: OTP resent successfully
 */

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */

/**
 * @swagger
 * /deactivate-account:
 *   post:
 *     summary: Deactivate a user account
 *     tags: [Account]
 *     responses:
 *       200:
 *         description: Account deactivated successfully
 */

// Swagger Schemas

/**
 * @swagger
 * components:
 *   schemas:
 *     SendOTP:
 *       type: object
 *       required:
 *         - countryCode
 *         - phone
 *       properties:
 *         countryCode:
 *           type: string
 *           example: "+91"
 *         phone:
 *           type: number
 *           example: 12345678
 *     VerifyOTP:
 *       type: object
 *       required:
 *         - otp
 *         - token
 *       properties:
 *         otp:
 *           type: string
 *           example: "1234"
 *         token:
 *           type: string
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         deviceToken:
 *           type: string
 *           example: "550e8400-e29b-41d4-a716-446655440001"
 *     ResendOTP:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: string
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 */

/**
 * @swagger
 * /change-password:
 *   post:
 *     summary: Change user password
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []  # Optional: Add this if you use token-based authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePassword'
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid input or missing fields
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []  # Optional
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /profile:
 *   patch:
 *     summary: Update user profile
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []  # Optional
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfile'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid input or missing fields
 *       401:
 *         description: Unauthorized access
 */

// Swagger Schemas

/**
 * @swagger
 * components:
 *   schemas:
 *     ChangePassword:
 *       type: object
 *       required:
 *         - oldPassword
 *         - newPassword
 *       properties:
 *         oldPassword:
 *           type: string
 *           example: "old_password123"
 *         newPassword:
 *           type: string
 *           example: "new_password123"
 *     UserProfile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         name:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           example: "johndoe@example.com"
 *         dob:
 *           type: string
 *           example: "1990-01-01"
 *         isCompleted:
 *           type: integer
 *           example: 1
 *     UpdateProfile:
 *       type: object
 *       required:
 *         - name
 *         - dob
 *         - email
 *         - isCompleted
 *       properties:
 *         name:
 *           type: string
 *           example: "Jane Doe"
 *         dob:
 *           type: string
 *           example: "1992-05-12"
 *         email:
 *           type: string
 *           example: "janedoe@example.com"
 *         isCompleted:
 *           type: integer
 *           enum: [1, 0]
 *           example: 1
 */


router.post("/login" , validator(loginSchema), controller.login);
router.post("/send-otp" , validator(sendOtpSchema), controller.sendOtp);
router.post("/verify-otp", validator(verifyOTP), controller.verifyOtp);
router.post("/resend-otp",  validator(resedOtpSchema), controller.resendOtp);
router.post("/logout",  authentication,scopeValidator(), controller.logOut);
router.post("/deactivate-account",  authentication,scopeValidator(), controller.deactivateAccount);

router.post("/change-password", authentication, scopeValidator(), validator(changePasswordSchema), controller.changePassword);
router.get("/profile", authentication, scopeValidator(), controller.getUserProfile);
router.patch("/profile", authentication, scopeValidator(), validator(updateProfileSchema), controller.updateUserProfile);

module.exports = router;
