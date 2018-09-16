const todoApp = angular.module( 'ToDoApp', [] );

todoApp.controller( 'ToDoController', function ( $http ) {

    console.log( 'ToDoController is ready.' );
    const self = this;


    // Data things
    self.todos = [];



    /* --------------------
       CRUD Stuff
       ------------------*/

    // CREATE
    self.addToDo = function ( todoToAdd ) {

        console.log( 'Adding To Do:', todoToAdd );

        todoToAdd.completed = false;

        // send the new to do to the server
        $http( {
            method: 'POST',
            url: '/todo',
            data: todoToAdd
        } ).then( function ( response ) {

            console.log( 'To Do added successfully!' );

            // wipe the inputs
            self.wipeInputs();

            // get a list of all of the to dos
            self.getToDos();

        } ).catch( function ( error ) {

            // if something went wrong...
            alert( 'Something went wrong adding a new to do.' );
            console.log( 'Error in CREATE function:', error );

        } );
    } // end self.addToDo()

    // READ
    self.getToDos = function () {
        console.log( 'Getting To Dos...' );
        $http( {
            method: 'GET',
            url: '/todo'
        } ).then( function ( response ) {
            console.log( 'Back from the server with:', response );
        } ).catch( function ( error ) {
            alert( 'Something went wrong fetching the To Dos from the server.' );
            console.log( 'Error in READ function:', error );
        } );
    } // end self.getToDos()

    // UPDATE

    // DELETE

    /* --------------------
       End CRUD Stuff
       ------------------*/


    // Function to clear the inputs
    self.wipeInputs = function () {

        self.NewToDo.text = "";
        self.NewToDo.category = "";
        self.NewToDo.completed = "";

    }

    // do the initial call to the server for data
    self.getToDos();

} ); // end todoController