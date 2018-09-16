// Requires
const express = require( 'express' );
const router = express.Router();
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );

// bring in the todo Model
const ToDo = require( '../models/todo.model.js' )


/* --------------------
       CRUD Stuff
       ------------------*/

// GET call
router.get( '/', ( req, res ) => {

    console.log( '### todo router /GET call' );

    // ask the mongoose model for every record it can find
    ToDo.find( {} )
        .then( ( response ) => {

        } ).catch( ( error ) => {
            console.log( '### There was an error getting records from the database.' );
            console.log( '### Error was:', error );
        } );

} ); // end GET call

// POST call
router.post( '/', ( req, res ) => {

    console.log( '### todo router /POST call:', req.body );

    // send the mongoose model a create request
    ToDo.create( req.body )
        // if it succeeds...
        .then( () => {
            console.log( 'Database add was successful.' );
            res.sendStatus( 200 );
        } ).catch( ( error ) => {
            console.log( '### There was an error adding to the database.' );
            console.log( '### Attempted to add:', req.body );
            console.log( '### Error was:', error );
        } );

} ); // end POST call

// PUT call
router.put( '/', ( req, res ) => {
    console.log( '### todo router /PUT call' );

} ); // end PUT call

// DELETE call
router.delete( '/', ( req, res ) => {
    console.log( '### todo router /DELETE call' );

} ); // end DELETE call

module.exports = router;