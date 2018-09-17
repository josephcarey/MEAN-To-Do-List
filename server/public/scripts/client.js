const todoApp = angular.module( 'ToDoApp', [] );

todoApp.controller( 'ToDoController', function ( $http ) {

    const self = this;

    // Data things
    self.firstTimeThrough = true;

    self.todos = [];
    self.newToDo = {
        completed: false
    };
    self.todoToEdit = {};
    self.todoToDelete = {};
    self.categories = [''];


    /* --------------------
       CRUD Stuff
    -------------------- */

    self.addToDo = function ( thingToAdd ) {

        // send the new to do to the server
        $http( {
            method: 'POST',
            url: '/todo',
            data: thingToAdd
        } ).then( function () {

            // clean up the inputs
            self.wipeInputs();

            // get the list of to dos from the server
            self.getToDos();

        } ).catch( function ( error ) {

            // if something went wrong...
            alert( 'Something went wrong adding a new To Do.' );
            console.log( 'Error in CREATE function:', error );

        } );

    } // end self.addToDo()

    self.getToDos = function () {

        // get the to dos from the server
        $http( {
            method: 'GET',
            url: '/todo'
        } ).then( function ( response ) {

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

            // fill out the categories
            self.updateCategories();

            // if this is the first time, call first time (which checks if the list is blank)
            if ( self.firstTimeThrough ) {
                self.firstTimeThrough = false;
                self.firstTime();
            }

        } ).catch( function ( error ) {

            alert( 'Something went wrong fetching the To Dos from the server.' );
            console.log( 'Error in READ function:', error );

        } );

    } // end self.GetToDos()


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

    } // end self.editToDo()

    self.setDelete = function ( thingWeMightDelete ) {
        self.todoToDelete = thingWeMightDelete;
    }

    self.doDelete = function () {

        $http( {
            method: 'DELETE',
            url: '/todo',
            params: { _id: self.todoToDelete._id }
        } ).then( function () {

            // refresh the display
            self.getToDos();

        } ).catch( function ( error ) {

            alert( 'Something went wrong deleting the To Do on the server.' );
            console.log( 'Error in DELETE function:', error );

        } );

    } // end self.deleteToDo ()



    /* --------------------
       Functions
    -------------------- */

    self.markToDoCompleted = function ( thingToMarkCompleted ) {

        // mark the thing as completed
        thingToMarkCompleted.completed = true;

        // call the edit function
        self.editToDo( thingToMarkCompleted );

    } // end self.markToDoCompleted()

    self.toggleCompleted = function ( $event ) {
        self.newToDo.completed = !self.newToDo.completed;
        $event.preventDefault();
    } // self.toggleCompleted()

    self.toggleEditCompleted = function ( $event ) {
        self.todoToEdit.completed = !self.todoToEdit.completed;
        $event.preventDefault();
    } // self.toggleEditCompleted()

    self.loadForEditing = function ( todoToEdit ) {
        self.todoToEdit = todoToEdit;
    } // self.loadForEditing()

    self.updateCategories = function () {

        // get a list of all of the categories that exist on entries
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
    } // self.updateCategories()

    // Function to clear the inputs
    self.wipeInputs = function () {
        self.newToDo.text = "";
        self.newToDo.category = "";
        self.newToDo.completed = "";
    } // self.wipeInputs()

    self.firstTime = function () {

        if ( self.todos.length < 1 ) {

            // if there isn't any data there, let's add some
            let firstTimetodos = [
                { text: 'try adding a new todo', category: 'learning', completed: 'false' },
                { text: 'try editing this todo', category: 'learning', completed: 'false' },
                { text: 'try marking this todo as done', category: 'learning', completed: 'false' },
                { text: 'try selecting a category', category: 'categories', completed: 'false' },
                { text: 'try deleting these and filling in your own todos', category: 'awesome user', completed: 'false' }
            ];

            for ( todo of firstTimetodos ) {
                self.addToDo( todo );
            };

        };
    }; // self.firstTime()

    // do the initial call to the server for data
    self.getToDos();

} ); // end todoController



