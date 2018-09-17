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

// POST call
router.post( '/', ( req, res ) => {

    console.log( '### todo router /POST call:' );
    console.log( req.body );

    // send the mongoose model a create request
    ToDo.create( req.body )
        // if it succeeds...
        .then( () => {
            console.log( 'Database add was successful.' );
            res.sendStatus( 200 );
        } ).catch( ( error ) => {
            console.log( '### There was an error adding to the database.' );
            console.log( '### Attempted to add:' );
            console.log( req.body );
            console.log( '### Error was:' );
            console.log( error );
        } );

} ); // end POST call

// GET call
router.get( '/', ( req, res ) => {

    console.log( '### todo router /GET call' );

    // ask the mongoose model for every record it can find
    ToDo.find( {} )
        .then( ( response ) => {
            // send the records back to the client
            res.send( response );
        } ).catch( ( error ) => {
            console.log( '### There was an error getting records from the database.' );
            console.log( '### Error was:' );
            console.log( error );
        } );

} ); // end GET call

// PUT call
router.put( '/', ( req, res ) => {
    console.log( '### todo router /PUT call' );
    console.log( req.query, req.body );

    ToDo.findOneAndUpdate( req.query, {
        text: req.body.text,
        category: req.body.category,
        completed: req.body.completed
    } )
        .then( function ( response ) {
            console.log( '### Update was successful!', response );
            res.sendStatus( 200 );
        } ).catch( function ( error ) {
            console.log( '### Something went wrong deleting the entry in the database:' );
            console.log( error );
            res.sendStatus( 500 );
        } );

} ); // end PUT call

// DELETE call
router.delete( '/', ( req, res ) => {

    console.log( '### todo router /DELETE call:' );
    console.log( req.query );

    ToDo.findOneAndDelete( req.query )
        .then( function ( response ) {
            console.log( '### Delete was successful!', response );
            res.sendStatus( 200 );
        } ).catch( function ( error ) {
            console.log( '### Something went wrong deleting the entry in the database:' );
            console.log( error );
            res.sendStatus( 500 );
        } );

} ); // end DELETE call

module.exports = router;