<!-- 1. Init project and structure

- npm init -y -->

<!-- 2. Install dependencies

- npm i express, nodemon -d, -->

<!-- 3. Setup development environment

- package.json: (main: 'src/index.js'; start: 'nodemon src/index.js')
- Create constant.js -->

<!-- 4. Configure bodyparser -->

<!-- 5. Import 'path' -->

6. Configure routes (router.js)

7. Add images and css in static directory

8. Add html files in views directory

9. Configure handlebars

<!-- - npm i express-handlebars
- configure view engine -->

- add main layout
- fix static styles hyperlinks
- render home page in hbs
- convert all html files to hbs
- group views by meaning in folders

<!-- 10. Add controller folder with home controller -->

<!-- 11. Add database

- npm i mongoose
- connect to DB -->

12. Prepare user functionallity

<!-- - user controller
- add controller to routes -->

- fix navigations in the Navbar (login, register, logout)
- render login and register pages

13. Add User model

- Simple validation in Schema
- Add method for register
- add folder services and create user service
- create first User in the DB
- validate password mismatch
- validate email already exists

14. Hash password

<!-- - npm i bcrypt -->

- hash password

15. Login

- find user by email
- validate password with hash

16. Generate jwt

<!-- - npm i jsonwebtoken -->

<!-- - promisify -->

- generate secret - https://www.uuidgenerator.net/version4
- generate token in service login - https://jwt.io/

17. Return token in cookie

<!-- - npm i cookie-parser -->

- configure cookie-parser
- set cookie with the token

18. Implement Logout

19. Authentication middleware

- create middleware directory
- add authentication middleware and import it in express configuration below cookieParser
- decode the token
- handle invalid token
- provide authorization

20. Dynamic navigation

- conditional options in nav (main.hbs)
- add user and data to res.locals for hbs templates

21. Error handling

- add page 404
- redirect missing route to 404
- add global error handler (optional)
- add error message util

22. Show error notification

- show in the main layout
- pass error to render in login and register pages

23. Automatically login after register

24. Map the rest of the pages in the router and show them when clicked.

25. Add \*\*\* (Creature) Model

- Simple validation in Schema
- Create (creature) service
- create first User in the DB
- validate password mismatch
- validate email already exists

########################################

## TODO

<!-- 24. Map pages to navigation in both logged in and logged out state

25. Add creature model to mongoose

26. Implement all posts page

- show each creature with image, name, species, description
- add details btn to every creature -->

<!-- 27. add details page(for creatures)

- If no creatures "There are no posts yet..."
- all users should be able to see details
- if the user is the owner of the post should have edit and delete button
- if the user is not logged in => no buttons
- if the user is no the owner => vote button -->

<!-- 28. Vote button

- when clicked => 'Voted'
- redirect to the details page for the current creature
- show the email of the people voted
- if user has already voted => 'Thanks for Voting.' and add the amil of the voted people -->

<!-- 29. Add creature

- on success redirect to all posts page

30. Delete creature

- on success redirect to all posts page

31. Edit creature

- on success redirect to current creature post -->

32. Routes Guards - check

33. Validations
    -login
    -register
    -animals
34. Bonus -> Profile -> Show my posts

- if there are no posts - msg
