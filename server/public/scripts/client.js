const todoApp = angular.module( 'ToDoApp', [] );

todoApp.controller( 'ToDoController', function ( $http ) {

    console.log( 'ToDoController is ready.' );
    const self = this;

    self.addToDo = function ( todoToAdd ) {
        console.log( todoToAdd );
    }

} ); // end todoController