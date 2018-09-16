const todoApp = angular.module( 'ToDoApp', [] );

todoApp.controller( 'ToDoController', function ( $http ) {

    console.log( 'ToDoController is ready.' );
    const self = this;


    // Data things
    self.todos = [];

    self.addToDo = function ( newToDo ) {
        ServerRequest.create( newToDo );
        self.wipeInputs();
        self.getToDos();
    }

    self.getToDos = function () {
        self.todos = ServerRequest.read();
    } // end self.GetToDos

    self.markToDoCompleted = function ( todo ) {

    } // end self.markToDoCompleted()

    self.deleteToDo = function ( todo ) {

    } // end self.deleteToDo ()

    // Function to clear the inputs
    self.wipeInputs = function () {

        self.NewToDo.text = "";
        self.NewToDo.category = "";
        self.NewToDo.completed = "";

    }

    // CRUD stuff is all handled here;
    // it helps keep the main server code more readable,
    // and makes the CRUD code more modular;
    // maybe even we would split it out, someday.
    let ServerRequest = {

        typeOfThing = 'To Do',
        URL: '/todo',

        // CREATE
        create: function ( thingToAdd ) {

            console.log( 'Adding' + typeOfThing + ':', todoToAdd );

            todoToAdd.completed = false;

            // send the new to do to the server
            $http( {
                method: 'POST',
                url: URL,
                data: thingToAdd
            } ).then( function ( response ) {

                console.log( typeOfThing, 'added successfully!' );

            } ).catch( function ( error ) {

                // if something went wrong...
                alert( 'Something went wrong adding a new ' + typeOfThing + '.' );
                console.log( 'Error in CREATE function:', error );

            } );
        }, // end ServerRequest.create()

        // READ
        read: function () {

            console.log( 'Getting', typeOfThing, '...' );
            $http( {
                method: 'GET',
                url: URL
            } ).then( function ( response ) {
                console.log( 'Back from the server with:', response.data );

                // set our display data equal to that response
                self.todos = response.data;

            } ).catch( function ( error ) {
                alert( 'Something went wrong fetching the', typeOfThing, 'from the server.' );
                console.log( 'Error in READ function:', error );
            } );
        } // end self.getToDos()

        // UPDATE

        // DELETE



    }

    // do the initial call to the server for data
    self.getToDos();

} ); // end todoController



