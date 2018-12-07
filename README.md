Facial Recognition App

If you want to see this app in action, it is up on Heroku here:  https://facial-recognition-app-stilt0n.herokuapp.com/

To see the backend of this app go here: https://github.com/stilt0n/facial-recognition-api

General notes:
I made this app using React for the front end and Express, Postgres and Knex for the back end.  The facial
recognition uses Clarifai's facial recognition API.  Note that you don't need a real email to create an account.

Notes for the future:
I am still working on this app.  There are a few bugs that I know about that I am planning to fix soon, and I am planning to add some new features to the project as well.  The things that are big on my list for when I have time are fixing the behavior of the facial recognition box when the image contains multiple faces or no faces (Clarifai, of course, deals with these fine. I just haven't gotten around to handling the responses it gives me in those situations).  There's a small issue with the display of the user's submission count that I also need to fix.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
