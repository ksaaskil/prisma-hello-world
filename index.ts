import { prisma } from './generated/prisma-client';
import { GraphQLServer } from 'graphql-yoga';
import { UserResolvers, PostResolvers } from './generated/graphqlgen';
import { IResolvers } from 'graphql-middleware/dist/types';

const Query = {
    publishedPosts(parent, args, context) {
      return context.prisma.posts({ where: { published: true } })
    },
    post(parent, args, context) {
      return context.prisma.post({ id: args.postId })
    },
    postsByUser(parent, args, context) {
      return context.prisma.user({
        id: args.userId
      }).posts()
    }
  };

const Mutation = {
    createDraft(parent, args, context) {
      return context.prisma.createPost(
        {
          title: args.title,
          author: {
            connect: { id: args.userId }
          }
        },

      )
    },
    publish(parent, args, context) {
      return context.prisma.updatePost(
        {
          where: { id: args.postId },
          data: { published: true },
        },

      )
    },
    createUser(parent, args, context) {
      return context.prisma.createUser(
        { name: args.name },
      )
    }
  };

const User = {  // : UserResolvers.Type
    ...UserResolvers.defaultResolvers,
    posts(parent, args, context) {
      return context.prisma.user({
        id: parent.id
      }).posts()
    }
  };

const Post = {
    ...PostResolvers.defaultResolvers,
    author(parent, args, context) {
      return context.prisma.post({
        id: parent.id
      }).author()
    }
  };

const resolvers: IResolvers = {
  Query,
  Mutation,
  User,
  Post
}

const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers,
    context: {
      prisma
    },
  })

server.start(() => console.log('Server is running on http://localhost:4000'))
  