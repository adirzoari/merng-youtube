const postsResolvers = require("./post");
const usersResolvers = require("./users");
const commentsResolvers = require('./comments')
module.exports = {
  Post:{
    likeCount(parent){
      console.log('parent is:',parent)
      return parent.likes.length;
    },
    commentCount: (parent)=>parent.comments.length
  },
  Query: {
    ...postsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation
  },
  Subscription: {
    ...postsResolvers.Subscription
  }
};
