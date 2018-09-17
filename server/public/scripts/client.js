const todoApp = angular.module( 'ToDoApp', [] );

todoApp.controller( 'ToDoController', function ( $http ) {

    console.log( 'ToDoController is ready.' );
    const self = this;

    // Data things
    self.todos = [];
    self.newToDo = {
        completed: false
    };
    self.todoToEdit = {};

    self.addToDo = function ( thingToAdd ) {

        console.log( 'Adding To Do:', thingToAdd );
        console.log( 'self.newToDo.completed:', self.newToDo.completed );


        // thingToAdd.completed = false;

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

            // sort the data as appropriate


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


    self.editToDo = function ( thingToUpdate ) {

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

    }

    self.deleteToDo = function ( thingToDelete ) {

        console.log( 'Deleting', thingToDelete );
        $http( {
            method: 'DELETE',
            url: '/todo',
            params: { _id: thingToDelete._id }
        } ).then( function () {

            // refresh the display
            self.getToDos();

        } ).catch( function ( error ) {

        } );

    } // end self.deleteToDo ()

    self.toggleCompleted = function ( $event ) {
        self.newToDo.completed = !self.newToDo.completed;
        $event.preventDefault();
    }

    self.toggleEditCompleted = function ( $event ) {
        self.todoToEdit.completed = !self.todoToEdit.completed;
        $event.preventDefault();
    }

    self.loadForEditing = function ( todoToEdit ) {
        console.log( 'self.editToDo:', self.editToDo );
        console.log( 'todoToEdit:', todoToEdit );
        self.todoToEdit = todoToEdit;
        console.log( 'self.editToDo:', self.editToDo );
        console.log( 'todoToEdit:', todoToEdit );
    }

    // Function to clear the inputs
    self.wipeInputs = function () {
        self.newToDo.text = "";
        self.newToDo.category = "";
        self.newToDo.completed = "";
    }

    self.firstTime = function () {

        // do the initial call to the server for data
        self.getToDos();

        // if there isn't any data there, let's add some
        let firstTimetodos = [
            { text: 'text', category: 'category', completed: 'false' }
        ]

    };

    self.firstTime();

} ); // end todoController



