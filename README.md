# Brandeis-SportsComplex

# Version 1:

create a website for sport complex of the Brandeis University to effectively
showcases the facilities, programs, and events, and encourages visitors to become members.

target audience and the main goals of the website (e.g., to encourage membership sign-ups,
promote events, or showcase facilities). Use html, css/bootstrap, and javascript to create the
front-end. Make sure to create a responsive website that looks great on desktop and mobile devices.

Use Node.js or Express.js for the back-end. You can require external
modules to add extra functionalities to your application

Create the necessary pages and content for your website, including:
Home Page: Introduce Brandeis's sports complex and highlight its unique features, such as
its location, facilities, and programs.
About Us: Provide background information on the sports complex, such as its history,
mission, and values.
Facilities: List the facilities available at the sports complex, such as a gym, pool, tennis courts,
and basketball courts. Include photos and descriptions of each facility.
Programs: Provide information on the different programs and classes offered at the sports
complex, such as fitness classes, swim lessons, and youth sports leagues. Include schedules
and pricing information.
Events: List upcoming events at the sports complex, such as tournaments, races, and charity
events. Include photos and descriptions of past events.
Membership: Provide information on the different membership options available at the
sports complex, along with pricing and benefits. Include a sign-up form or link to an online
booking system.
Contact Us: Provide contact information for the sports complex, including address, phone
number, email, and social media accounts. Include a contact form that visitors can use to
send a message.

Use multimedia (such as photos, videos, and graphics) to enhance the user experience and
showcase the sports complex.
Make sure your website is easy to navigate, with clear calls-to-action that encourage visitors
to sign up for memberships or register for events. Test your website to ensure it is responsive.
You can visit https://www.brandeisjudges.com/landing/index to get some ideas and contents

# Version 2

As a express.js developer you and your group-mates are asked to collaborate in this
repository to further improve your GPA1, the website for sport complex of the Brandeis
University, to effectively showcases the facilities, programs, and events, and encourages
visitors to become members.
Instructions:
Take your GPA1 and improve it by connecting it to the MongoDB, creating necessary
models, associating models with each other, connecting models to the views, and displaying
dynamic contents on the views rather than hard-coded contents.

The project must follow the clear MVC structure. Separate file for each model in the
models folder, separate views for every CRUD function of each model within separate
folders and all together within the views folder, separate controller file for each model
within the controllers folder. 2. Apply CRUD functions on all the models. Limit the create, update and delete functions
of the Facility, Program, Event, and Membership models to the "logged in" admin only
through a middleware function. Read function for all the models, except the User
model, should be available for everyone as you want to display contents on the relevant
views using this function. The create function of the CRUD on the User model should
be available for everyone through a "Sign up" page as you want everyone to sign up for
your sport complex. isAdmin flag's value should not be collected from the view as you
don't want to give everyone the ability to become an admin. To have an admin user
account, you can either create an account using the REPL with isAdmin's value equal to
true or you can change the default false value for the flag in the MongoDB campus. The
read function on the User model should be only available to the admin. Update and
delete functions on the User model should be available to the "logged in" users
themselves through their profile page and to the admin as well. Make sure that a user
can only update/delete his/her own account, not anyone else's account. 3. Provide a "Log in" button on your page to enable the users to login. Once logged in, the
user must be redirected to the home page with a welcome message followed by the user's
name as an anchor tag to the his/her profile. On the profile page, where the user can see
all his/her user account details, the user must be given the options to update/delete his/
her account. Also provide a "Log out" button which enable the user to log out and delete
the session data upon click. 4. The home page shall contain any static informational contents as well as lists of
programs, events, facilities and available memberships. 5. Add a "buy membership" button/link at the end of each membership package enabling
the "logged in" users to enroll/buy one or more membership packages. Upon click, push
the interested membership package details as an object to the user's memberships array
property of the User model. 6. Create the Contact model for the "Contact Us" page with name, email, and title and
issue as it's schema properties. This model should store the questions/queries coming in
through the "Contact Us" page and should only be displayed for admin of your
application. 7. Use proper flash messages upon potential success or failure of an operation. 8. Write proper explanatory comments for each action/block of code, routes categories,
and model schema. 9. Routes should be built within the "routes" folder in separate route modules based on the
model they belongs to.
10.Use passport.js package for hashing passwords and user authentication. 11. User express-validator to validate the incoming data before they reach to the models.
