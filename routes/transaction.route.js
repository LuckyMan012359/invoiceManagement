const express = require('express');
const router = express.Router();
const {
  createPost,
  getPosts,
  getPostById,
  methodNotAllowed,
} = require('../controllers/transaction.controller.js');

router.post('/', createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.delete('/:id', methodNotAllowed);
router.put('/:id', methodNotAllowed);
router.patch('/:id', methodNotAllowed);

module.exports = router;
