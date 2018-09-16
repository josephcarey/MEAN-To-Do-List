const mongoose = require( 'mongoose' );

// Where to find the database
const DATABASEURL = 'mongodb://localhost:27017/MEAN-To-Dos';

// connect to the database
mongoose.connect( DATABASEURL, { userNewURLParser: true } );

// if the connection worked...
mongoose.connection.on( 'connected', () => {

    // log to the server that it worked.
    console.log( '### Mongoose successfully connected to:', DATABASEURL );

} );

// if the connection failed...
mongoose.connection.on( 'error', ( error ) => {

    // log the error to the server
    console.log( '### Mongoose failed to connect:', error );

} );
