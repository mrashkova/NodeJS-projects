1. Init project and structure

- npm init -y

2. Install dependencies

- npm i express, nodemon -d,

3. Setup development environment

- package.json: (main: 'src/index.js'; start: 'nodemon src/index.js')
- Create constant.js

4. Configure bodyparser

5. Import 'path'

6. Configure routes

7. Add images and css in static directory

8. Add html files in views directory

9. Configure handlebars

- npm i express-handlebars
- configure view engine
- add main layout
- fix static styles hyperlinks
- render home page in hbs
- convert all html files to hbs
- group views by meaning in folders

10. Add controller folder with home controller

11. Add database

- npm i mongoose
- connect to DB

12. Prepare user functionallity

- user controller
- add controller to routes
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

- npm i bcrypt
- hash password

15. Login

- find user by email
- validate password with hash

16. Generate jwt

- npm i jsonwebtoken
- promisify
- generate secret - https://www.uuidgenerator.net/version4
- generate token in service login - https://jwt.io/

17. Return token in cookie

- npm i cookie-parser
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
