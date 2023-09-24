// create a server
import { ApolloServer, gql } from "apollo-server";

const tweets = [
   // dummy data
   {
      id: 1,
      text: "Hello world",
   },
   {
      id: 2,
      text: "Hello world 2",
   },
];

let users = [
   {
      id: 1,
      first_name: "John",
      last_name: "Doe",
   },
   {
      id: 2,
      first_name: "Jane",
      last_name: "Doe",
   },
];
const typeDefs = gql`
   type Query {
      allTweets: [Tweet!]
      tweet(id: ID!): Tweet!
      allUsers: [User!]
   }
   type User {
      id: ID!
      first_name: String!
      last_name: String!
      full_name: String!
   }
   type Tweet {
      id: ID!
      text: String!
   }
   type Mutation {
      postTweet(text: String!, userId: ID): Tweet!
      deleteTweet(id: ID!): Boolean!
   }
`;

const resolvers = {
   Query: {
      allTweets: () => {
         return tweets;
      },
      tweet(parent, args) {
         return tweets.find((tweet) => tweet.id === Number(args.id));
      },
      allUsers: () => {
         return users;
      },
   },
   Mutation: {
      postTweet(parent, args) {
         const tweet = {
            id: tweets.length + 1,
            text: args.text,
         };
         tweets.push(tweet);
         return tweet;
      },
      deleteTweet(parent, args) {
         const tweet = tweets.find((tweet) => tweet.id === Number(args.id));
         if (!tweet) {
            return false;
         }
         tweets.splice(tweets.indexOf(tweet), 1);
         return true;
      },
   },
   User: {
      full_name(parent) {
         return `${parent.first_name} ${parent.last_name}`;
      },
   },
};
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
   console.log(`🚀  Server ready at ${url}`);
});
