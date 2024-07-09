const express = require('express');
const router = express.Router();

const signinMiddleware = require('../middlewares/users/signin');
const signupMiddleware = require('../middlewares/users/signup');
const editMiddleware = require('../middlewares/users/edit');
const multer = require('../middlewares/users/profil.multer');
const auth = require('../middlewares/users/auth');

const signup = require('../controllers/users/signup');
const signin = require('../controllers/users/signin');
const check = require('../controllers/users/check');
const getOne = require('../controllers/users/getOne');
const edit = require('../controllers/users/edit');
const validate = require('../controllers/users/validate');

/**
 * @swagger
 *
 * /api/users:
 *    post:
 *      description: Validates an email or token.
 *      operationId: validate
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *              type:
 *                type: string
 *                description: The type of the validation. Can be either "email" or "token".
 *              email:
 *                type: string
 *                description: The email address if the type is "email".
 *              token:
 *                type: string
 *                description: The token if the type is "token".
 *      responses:
 *        200:
 *          description: The validation was successful.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  found:
 *                    type: boolean
 *                    description: Whether the validation was successful.
 *        400:
 *          description: The request body was invalid.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: A message describing the error.
 *        404:
 *          description: Invalid email or token.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: A message describing the error.
 */
router.post('/', check);

/**
 * @swagger
 *
 *       
 * /api/users:
 *   get:
 *     operationId: authenticateUser
 *     description: Authenticate a user
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           description: The authorization header.
 *     responses:
 *      200:
 *         description: The user has been successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: objectid
 *                   description: The user ID
 *                 firstName:
 *                    type: string
 *                    description: The user firstname
 *                 lastName:
 *                   type: string
 *                   description: The user lastname
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The user email
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The user's creation date
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The user's update date
 *
 *      401:
 *        description: The request did not include a valid authentication token.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message describing the error.
 * 
 *      500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 */
router.get('/', auth, getOne);

/**
 * @swagger
 *
 * /api/users/signup:
 *   post:
 *     operationId: createUser
 *     description: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - type: object
 *                 required:
 *                   - email
 *                   - tel
 *                   - password
 *                   - fname
 *                   - lname
 *                   - gender
 *                   - accountType
 *                 properties:
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: The user email
 *                   tel:
 *                     type: string
 *                     description: The user telephone number
 *                   password:
 *                     type: string
 *                     minLength: 8
 *                     description: The user password
 *                   fname:
 *                     type: string
 *                     minLength: 2
 *                     description: The user first name
 *                   mname:
 *                     type: string
 *                     minLength: 2
 *                     description: The user middle name
 *                   lname:
 *                     type: string
 *                     minLength: 2
 *                     description: The user last name
 *                   gender:
 *                     type: string
 *                     maxLength: 1
 *                     description: The user gender ('M', 'F' or 'O')
 *                   accountType:
 *                     type: string
 *                     enum: [buyer]
 *                     description: The user account type (buyer)
 *               - type: object
 *                 required:
 *                   - email
 *                   - tel
 *                   - password
 *                   - name
 *                   - address
 *                   - accountType
 *                 properties:
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: The user email
 *                   tel:
 *                     type: string
 *                     description: The user telephone number
 *                   password:
 *                     type: string
 *                     minLength: 8
 *                     description: The user password
 *                   name:
 *                     type: string
 *                     minLength: 2
 *                     description: The shop's name
 *                   address:
 *                     type: object
 *                     description: The shop's address
 *                   properties:
 *                     city:
 *                       type: string
 *                       description: The shop's city
 *                     municipality:
 *                       type: string
 *                       description: The shop's municipality
 *                     street:
 *                       type: string
 *                       description: The shop's street
 *                     number:
 *                       type: string
 *                       description: The shop's street number
 *                   accountType:
 *                     type: string
 *                     enum: [shop, realEstateAgency]
 *                     description: The user account type (shop, realEstateAgency)
 *     responses:
 *       201:
 *         description: User was created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The user ID
 *                 firstName:
 *                   type: string
 *                   description: The user first name
 *                 middleName:
 *                   type: string
 *                   description: The user middle name
 *                 lastName:
 *                   type: string
 *                   description: The user last name
 *                 address:
 *                   type: object
 *                   properties:
 *                     city:
 *                       type: string
 *                       description: The user's city
 *                     municipality:
 *                       type: string
 *                       description: The user's municipality
 *                     street:
 *                       type: string
 *                       description: The user's street
 *                     number:
 *                       type: string
 *                       description: The user's street number
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The user email
 *                 token:
 *                   type: string
 *                   description: The JWT token
 *       400:
 *         description: The request body was invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 *       409:
 *         description: The email already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 */
router.post('/signup', signupMiddleware, signup);

/**
 * @swagger
 *
 *   /api/users/signin:
 *   post:
 *     operationId: loginUser
 *     description: Connect a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user email
 *               password:
 *                 type: string
 *                 description: The user password
 *
 *     responses:
 *       200:
 *         description: User has been successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: objectid
 *                   description: The user ID
 *                 firstName:
 *                   type: string    - Envoyer photo profil utilisateur
 *                   description: The user firstname
 *                 lastName:
 *                   type: string
 *                   description: The user lastname
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The user email
 *                 token:
 *                   type: string
 *                   -description: The JWT token
 * 
 *       400:
 *         description: The request body was invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 * 
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 */
router.post('/signin', signinMiddleware, signin);

/**
 * @swagger
 *
 *   /api/users/edit:
 *   post:
 *     operationId: editUser
 *     description: Edit an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The user firstname
 *               lastName:
 *                 type: string
 *                 description: The user lastname
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user email
 *               password:
 *                 type: string
 *                 description: The user password
 *               file:
 *                  type: file
 *                  description: The user profile picture
 *
 *     responses:
 *       200:
 *         description: User was edited successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: objectid
 *                   description: The user ID
 *                 firstName:
 *                   type: string
 *                   description: The user firstname
 *                 lastName:
 *                   type: string
 *                   description: The user lastname
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The user email
 *                 imageUrl:
 *                   type: string
 *                   description: The user profile picture url
 * 
 *       400:
 *        description: The request body was invalid.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message describing the error.
 * 
 *       409:
 *        description: The email already exists.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message describing the error.
 * 
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 */
router.post('/edit', auth, multer, editMiddleware, edit);

/**
 * @swagger
 * /validate:
 *   post:
 *     summary: Validate user by updating their status.
 *     description: Validate the user by updating their `isValid` status if the provided token is correct.
 *     tags: 
 *       - Users
 *     parameters:
 *       - in: body
 *         name: token
 *         description: The token of the user to be validated.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *     responses:
 *       200:
 *         description: User successfully validated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 isValid:
 *                   type: boolean
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 gender:
 *                   type: string
 *                 email:
 *                   type: string
 *                 address:
 *                   type: string
 *                 accountType:
 *                   type: string
 *                 favorites:
 *                   type: array
 *                   items:
 *                     type: string
 *                 imageUrl:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid token
 *       500:
 *         description: An error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred
 */
router.post('/validate', auth, validate);

module.exports = router;