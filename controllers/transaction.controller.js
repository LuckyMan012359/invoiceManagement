const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Post = require('../models/transaction.model');

exports.createPost = (req, res) => {
  const { customer, transaction, grandTotal, balance, note, attachment } = req.body;

  const post = new Post({
    customer: customer,
    transaction: transaction,
    grandTotal: grandTotal,
    balance: balance,
    note: note,
    attachment: attachment,
  });

  post
    .save()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
      return;
    });
};

exports.getPosts = (req, res) => {
  const { author, isPublished } = req.query;

  let filter = {};
  if (author) {
    filter.author = author;
  }
  if (isPublished !== undefined) {
    filter.isPublished = isPublished === 'true';
  }

  Post.find(filter)
    .then((posts) => {
      console.table(posts);
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving posts.',
      });
    });
};

exports.getPostById = (req, res) => {
  const { id } = req.params;

  Post.findById(id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).send('ID not found');
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving the post.',
      });
    });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send();
};
