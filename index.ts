import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './schema'
import db from './db'

const resolvers = { 
    Query: {
        games() {
            return db.games
        },
        authors() {
            db.authors
        },
        reviews() {
            return db.reviews
        },
        review(_: any, args: any, context: any) {
            return db.reviews.find((review)=> review.id === args.id)
        },
        author(_: any, args: any, context: any) {
            return db.authors.find((author)=> author.id === args.id)
        },
        game(_: any, args: any, context: any) {
            return db.games.find((game)=> game.id === args.id)
        }
    },
    Game: {
        reviews(parent: any) {
            return db.reviews.filter((r) => r.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent: any) {
            return db.reviews.filter((r) => r.author_id === parent.id)
        }
    },
    Review: {
        author(parent: any) {
            return db.authors.find((a) => a.id === parent.author_id)
        },
        game(parent: any) {
            return db.games.find((g) => g.id === parent.game_id)
        }
    },
    Mutation: {
        deleteGame(_: any, args) {
            db.games = db.games.filter((g) => g.id !== args.id)
            return db.games
        },
        addGame(_: any, args) {
            let game = {
                ...args.game, 
                id: Math.floor(Math.random() * 10000).toString()
            }
            db.games.push(game)
    
            return game
        }
    }
}


async function startServer() {

        // server setup
        const server = new ApolloServer({
        typeDefs, resolvers
        // resolvers (functions that determine how we respond to queries/ different data on the graph)
    })


    const { url } = await startStandaloneServer(server, {
        listen: {port: 4000}
    })
}

console.log('Server ready at port', 4040)

startServer().then(() => {
    console.log('Here is some data about authors', db.authors);
});

// Keep the process running indefinitely
setTimeout(() => {}, 1);
