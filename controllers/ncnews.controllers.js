const {
  selectTopics,
  selectSelectArticleById,
  selectArticles,
  selectCommentsByArticle,
  checkArticleExists,
  insertComment,
  updateArticle,
  removeComment,
  selectAllUsers
} = require("../models/ncnews.models");
const endpointsData = require("../endpoints.json");

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};
exports.getEndpoints = (req, res) => {
  res.status(200).send(endpointsData);
};
exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectSelectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  const {topic} = req.query
  selectArticles(topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getCommentsByArticle = (req, res, next) => {
  const { article_id } = req.params;
  const promises = [selectCommentsByArticle(article_id)];

  if (article_id) {
    promises.push(checkArticleExists(article_id));
  }

  Promise.all(promises)
    .then((resolvedPromises) => {
      const comments = resolvedPromises[0];
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  insertComment(req.body, req.params)
    .then((comment) => {
      res.status(201).send(comment);
    })
    .catch(next);
};

exports.patchArticle = (req, res, next) => {
  updateArticle(req.body, req.params)
    .then((article) => {
      res.status(200).send(article);
    })
    .catch(next);
};
exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;

  removeComment(comment_id)
    .then(() => {
      res.status(204).send({});
    })
    .catch(next);
};
exports.getAllUsers = (req, res, next) =>{
  selectAllUsers()
  .then((users) =>{
    res.status(200).send({users})
  })
  .catch(next)

}