const todoApp = angular.module( 'ToDoApp', [] );

todoApp.controller( 'ToDoController', function ( $http ) {

    console.log( 'ToDoController is ready.' );
    const self = this;

    // Data things
    self.todos = [];
    // self.newToDo = {};

    self.addToDo = function ( thingToAdd ) {

        console.log( 'Adding To Do:', thingToAdd );

        thingToAdd.completed = false;

        // send the new to do to the server
        $http( {
            method: 'POST',
            url: '/todo',
            data: thingToAdd
        } ).then( function () {

            console.log( 'To Do added successfully!' );

            self.wipeInputs();
            self.getToDos();

        } ).catch( function ( error ) {

            // if something went wrong...
            alert( 'Something went wrong adding a new To Do.' );
            console.log( 'Error in CREATE function:', error );

        } );



    } // end self.addToDo()

    self.getToDos = function () {

        console.log( 'Getting To Dos...' );
        $http( {
            method: 'GET',
            url: '/todo'
        } ).then( function ( response ) {
            console.log( 'Back from the server with:', response.data );

            // set our display data equal to that response
            self.todos = response.data;

        } ).catch( function ( error ) {
            alert( 'Something went wrong fetching the To Dos from the server.' );
            console.log( 'Error in READ function:', error );
        } );

    } // end self.GetToDos()

    self.markToDoCompleted = function ( thingToUpdate ) {

        console.log( 'Marking as completed:', thingToUpdate );

        thingToUpdate.completed = true;

        $http( {
            method: 'PUT',
            url: '/todo',
            params: { _id: thingToUpdate._id },
            data: thingToUpdate
        } ).then( function () {

            // refresh the display
            self.getToDos();

        } ).catch( function ( error ) {
            alert( 'Something went wrong updating the To Do on the server.' );
            console.log( 'Error in UPDATE function:', error );
        } );

    } // end self.markToDoCompleted()

    self.deleteToDo = function ( thingToDelete ) {

        console.log( 'Deleting', thingToDelete );
        $http( {
            method: 'DELETE',
            url: '/todo',
            params: { _id: thingToDelete._id }
        } ).then( function () {

        } ).catch( function ( error ) {

        } );

        self.getToDos();

    } // end self.deleteToDo ()

    // Function to clear the inputs
    self.wipeInputs = function () {
        self.newToDo.text = "";
        self.newToDo.category = "";
        self.newToDo.completed = "";
    }

    // do the initial call to the server for data
    self.getToDos();

} ); // end todoController



