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
    self.todoToDelete = {};
    self.categories = [''];

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

            // by text...
            self.todos.sort( function ( a, b ) {
                let x = a.text.toLowerCase();
                let y = b.text.toLowerCase();
                if ( x < y ) { return -1; }
                if ( x > y ) { return 1; }
                return 0;
            } );

            // and then by completion
            self.todos.sort( function ( a, b ) {

                if ( a.completed && !b.completed ) {
                    return 1;
                } else if ( b.completed && !a.completed ) {
                    return -1;
                } else {
                    return 0;
                }
            } );

            self.updateCategories();


        } ).catch( function ( error ) {
            alert( 'Something went wrong fetching the To Dos from the server.' );
            console.log( 'Error in READ function:', error );
        } );

    } // end self.GetToDos()

    self.markToDoCompleted = function ( thingToMarkCompleted ) {

        console.log( 'Marking as completed:', thingToMarkCompleted );
        thingToMarkCompleted.completed = true;
        self.editToDo( thingToMarkCompleted );

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

    self.setDelete = function ( thingWeMightDelete ) {
        self.todoToDelete = thingWeMightDelete;
    }

    self.doDelete = function () {

        console.log( 'Deleting', self.todoToDelete );
        $http( {
            method: 'DELETE',
            url: '/todo',
            params: { _id: self.todoToDelete._id }
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
        self.todoToEdit = todoToEdit;
    }

    self.updateCategories = function () {
        self.categories = [];
        self.categories.push( '' );
        for ( todo of self.todos ) {
            let alreadyPresent = false;
            for ( j = 0; j < self.categories.length; j++ ) {
                if ( todo.category == self.categories[j] ) {
                    alreadyPresent = true;
                }
            }
            if ( alreadyPresent === false ) {
                self.categories.push( todo.category );
            }
        }
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
        ];

    };

    self.firstTime();

} ); // end todoController



