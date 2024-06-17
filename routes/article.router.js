const express = require('express');
const router = express.Router();

const getAll = require('../controllers/stuff/articles/getAll');
const getOne = require('../controllers/stuff/articles/getOne');
// const getAllForOne = require('../controllers/stuff/articles/getAllForOne');
const createOne = require('../controllers/stuff/articles/createOne');
const deleteOne = require('../controllers/stuff/articles/deleteOne');

const multer = require('../middlewares/articles/createOne');
const auth = require('../middlewares/users/auth');

/**
 * @swagger
 *
 * /api/stuff/articles:
 *   get:
 *     operationId: getAllArticles
 *     description: Get all articles
 *     parameters:
 *       - in: query
 *         name: category
 *         description: Filter articles by category (category name).
 *         schema:
 *           type: string
 *       - in: query
 *         name: seller
 *         description: Filter articles by seller (seller ID).
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of filtered articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       400:
 *         description: Invalid request (malformed parameters).
 *       500:
 *         description: An internal error occurred.
 * 
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique article identifier (MongoDB ObjectId).
 *         name:
 *           type: string
 *           description: Article's name
 *         description:
 *           type: string
 *           description: Article's description
 *         price:
 *           type: number
 *           description: Article's price
 *         category:
 *           type: object
 *           description: Article's category
 *           properties:
 *             name:
 *               type: string
 *               description: Category's name
 *         seller:
 *           type: object
 *           description: Seller information.
 *           properties:
 *             _id:
 *               type: string
 *               description: Unique seller identifier (MongoDB ObjectId).
 *             fname:
 *               type: string
 *               description: Seller's first name.
 *             mname:
 *               type: string
 *               description: (Optional) Seller's middle name.
 *             lname:
 *               type: string
 *               description: Seller's last name.   
 */
router.get('/', getAll);

/**
 * @swagger
 *
 * /api/stuff/articles/{id}:
 *   get:
 *     summary: Retrieves an article by ID.
 *     description: Retrieves a specific article based on its unique identifier.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the article.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retrieved article.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article not found.
 *       500:
 *         description: An internal error occurred.
 */
router.get('/:id', getOne);

/**
 * @swagger
 *
 * /api/stuff/articles:
 *   post:
 *     summary: Creates a new article.
 *     description: Creates a new article for a seller. Requires a Bearer JWT token for authentication.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Article name.
 *               description:
 *                 type: string
 *                 description: Article description.
 *               price:
 *                 type: number
 *                 description: Article price.
 *               stock:
 *                 type: integer
 *                 description: Article stock quantity.
 *               category:
 *                 type: string
 *                 description: Article category (obtained from a previous step, not provided in the request body).
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                   description: Article images (uploaded as multipart files).
 *     responses:
 *       201:
 *         description: List of articles created by the seller.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       401:
 *         description: Unauthorized (invalid or missing Bearer token).
 *       500:
 *         description: An internal error occurred.
 */
router.post('/', auth, multer, createOne);

/**
 * @swagger
 *
 * /api/stuff/articles/{id}:
 *   delete:
 *     summary: Deletes an article by ID.
 *     description: Deletes an article from a seller's inventory. Requires a Bearer JWT token for authentication.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the article to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of articles remaining for the seller.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       400:
 *         description: Bad request (article not found or permission issue).
 *       500:
 *         description: An internal error occurred.
 */
router.delete('/:id', auth, deleteOne);

module.exports = router;