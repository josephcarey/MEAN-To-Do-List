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

    self.markToDoCompleted = function ( todoToUpdate ) {

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

    // CRUD stuff is all handled here;
    // it helps keep the main server code more readable,
    // and makes the CRUD code more modular;
    // maybe even we would split it out, someday.

    // do the initial call to the server for data
    self.getToDos();

} ); // end todoController



