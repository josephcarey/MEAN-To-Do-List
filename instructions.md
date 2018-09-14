
Hello Primers!

Welcome to your 3rd-weekend challenge!
Full stack is pretty awesome huh? The idea that, in such a short time, you are able to spin up a full application architecture is pretty incredible. 

This weekend is all about showing us that you have a handle on each of the different parts of the full stack. For this weekends challenge, you are going to create a 'TO DO' application. This is the type of application that is very common to tackle when learning a new language, which makes it extremely valuable to work through for the first time, since chances are good that at some point in your career you will tackle this type of application, but in another language.

### BASE MODE
Here are the specific components for the challenge:

* Using AngularJS, create a front end experience that allows a user to create a task.
* When the task is created, it should be stored inside of a database (MongoDB)
* Whenever a task is created the front end should refresh to show all tasks that need to be completed.
* Each task should have an option to 'Complete' or 'Delete'.
* When a task is complete, its visual representation should change on the front end (for example, the background of the task container could change from gray to green, as well as the complete option 'checked off'. Each of these are accomplished in CSS, but will need to hook into logic to know whether or not the task is complete. `ng-class` will come in handy!)
* Whether or not a task is complete should also be stored in the database.
* Deleting a task should remove it both from the Front End as well as the Database.

We would recommend you spend some time thinking about how to approach this problem. Think through all the logic that will be needed prior to writing any code. Think through your `Schema` for Mongoose and how you will structure your data. Take your time, relax, remember that impostor syndrome is real, and that you are capable of knocking this out of the park!

Use CSS styling to move the aesthetic of the page beyond the vanilla HTML look:

* Background color of the page
* font family and size
* text color &or background color of tasks to show whether or not they have been completed

### STRETCH GOALS

- Implement Bootstrap to take the visuals of the page up a notch.
- In whatever fashion you would like, create an 'are you sure: yes / no' option when deleting a task. Once again, you can interpret this however you would like.
- Move the inputs into a form and use `ng-submit` so that the user can hit enter to add a new task.
- Add front-end validation to the 'make-a-task' form.
- Add a `category` field for the task. Allow users to filter by task category. 
- Adjust the logic so that completed tasks are brought to the bottom of the page, where the remaining tasks left to complete are brought to the top of the list.