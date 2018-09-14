const express = require( 'express' );
const router = express.Router();

// GET call
router.get( '/', ( req, res ) => {
    console.log('todo router /GET call');
    

} ); // end GET call

// POST call
router.post( '/', ( req, res ) => {
    console.log('todo router /POST call');

} ); // end POST call

// PUT call
router.put( '/', ( req, res ) => {
    console.log('todo router /PUT call');

} ); // end PUT call

// DELETE call
router.delete( '/', ( req, res ) => {
    console.log('todo router /DELETE call');

} ); // end DELETE call

module.exports = router;