import { PubSub } from 'graphql-subscriptions'
const pubsub = new PubSub()

import Author from "./models/author.js";
import Book from "./models/Book.js";
import User from "./models/user.js"
import jwt from 'jsonwebtoken'
import { GraphQLError } from 'graphql';




const resolvers = {
    Query: {
      me: (root, args, context) => {
        console.log("SUPER", context)
        return context.currentUser
      },
      allGenres: async (root, async) => {
      console.log("GETTING BOOKS")
      const books = await Book.find({})
      console.log('MY BOOKS ', books)
      return [...new Set(books.flatMap(book => book.genres))]
      },
      authorCount: async () => Author.collection.countDocuments(),
      bookCount: async () => Book.collection.countDocuments(),
      allAuthors: async (root, async) => {
        const authors = await Author.find({});
        return authors;
      },
      allBooks: async (root, args) => {
        console.log("SUP")
        const books = await Book.find({}).populate("author");
  
        return books.filter((b) => {
          const matchesGenre = !args.genre || b.genres?.includes(args.genre);
          const matchesAuthor = !args.author || b.author?.name === args.author;
          return matchesGenre && matchesAuthor;
        });
      },
    },
    Author: {},
    Mutation: {
      addBook: async (root, args, { currentUser }) => {
        console.log("IN IT")
  
  
        if (!currentUser) {
          console.log("My current user ", currentUser)
          throw new GraphQLError('wrong credentials', {
            extensions: { code: 'BAD_USER_INPUT' }
          }) 
        }
        console.log(`adding ${args.author}`);
        // Find all authors
        const authors = await Author.find({});
  
        // Check if author exists
        const authorToUpdate = authors.find((a) => a.name === args.author);
        let author;
  
        try {
          if (authorToUpdate) {
            // If author exists, increment the bookCount
            authorToUpdate.bookCount += 1;
            author = await authorToUpdate.save(); // Save updated author
            console.log(`Updated author: ${author}`);
          } else {
            // If author doesn't exist, create a new author
            author = new Author({ name: args.author, bookCount: 1 });
            await author.save(); // Save new author
            console.log(`New author created: ${author}`);
          }
        } catch (error) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.name,
              error,
            },
          });
        }
  
        const newBook = {
          title: args.title,
          author: author,
          published: args.published,
          genres: args.genres,
        };
  
        const book = new Book(newBook);
        console.log(`New book: ${book}`);
  
        try {
          pubsub.publish('BOOK_ADDED', {bookAdded: book})
           await book.save();
           console.log("SAVED")
           return book
        } catch (error) {
          throw new GraphQLError("Saving book failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.name,
              error,
            },
          });
        }
      },
  
      editAuthor: async (root, args, {currentUser}) => {
  
        if (!currentUser) {
          console.log("My current user ", currentUser)
          throw new GraphQLError('wrong credentials', {
            extensions: { code: 'BAD_USER_INPUT' }
          }) 
        }
        
        const author = await Author.findOne({ name: args.name });
  
        if (!author) {
          return null;
        }
  
        author.born = args.setBornTo;
  
        try {
          return await author.save();
        } catch (error) {
          throw new GraphQLError("Saving edited year failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.name,
              error,
            },
          });
        }
      },
  
      createUser: async (root, args) => {
  
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
        console.log('USER BEING CREATED', user)
        return await user.save()
        .catch(error => {
          console.log(error, " IS THE ERROR")
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
        console.log("SPAGETTIG JUNCTION FUNERAL", user)
  
        if( !user || args.password !== 'secret') {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }
  
        const userForToken = {
          username: user.username,
          id: user._id
        }
        const myToke = { value: jwt.sign(userForToken, process.env.SECRET)}
          console.log("RETURN", myToke)
        return { value: jwt.sign(userForToken, process.env.SECRET)}
      }
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
      },
    },
  };
  

  export default resolvers