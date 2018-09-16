const express = require( 'express' );
const todoRouter = require( './routes/todo.router.js' );
const bodyParser = require( 'body-parser' );

const app = express();

const PORT = process.env.PORT || 5000;

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

app.use( express.static( 'server/public' ) );
app.use( '/todo', todoRouter );


// connect to the database
require( './modules/database-connection.js' )


// Spin up the server
app.listen( PORT, () => {
    console.log( '### Server up and listening on', PORT, '. . .' );
} ) // Snd spin up server
