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

13. Add user model

    - Simple validation in Schema
    - Add method for register
    - add folder services and create user service
    - create first User in the DB
