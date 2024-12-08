# Fitness Project

# Installation

1. Clone the project
2. enter the backend folder and install the packages
    
    ```bash
    cd backend
    npm install
    ```
    
3. run the backend
    
    ```bash
    npm run build
    npm run dev
    ```
    
4. the backend will run but make sure you have the env variables
5. enter frontend now and install the packages
    
    ```bash
    cd frontend
    npm install
    ```
    
6. run the frontend
    
    ```bash
    npm start
    ```
    

# Back End

## User Model

1. name
2. email
3. password

## Fitness Model

1. title
2. description
3. date (when the class start)
4. time (the period of the class to end)
5. max Attendees (default 100)
6. attendingUsers (list of the user ids that attend this class)

## User Crud

1. create user (sign up) 
2. login (sign in) 
3. update user 
4. delete user (sign out) 

## Fitness Crud

1. create fit class (user can create class for other users and he/she is the teacher) 
2. read fit classes (user can view all classes)
    - for any visit, users can view all future classes but they can not book or cancel because they are not registered.
    - if the user is signed in the user will see future classes and if booked one 
    all the booked classes will be in the dashboard page.
    - user can view all created classes by him/her.
3. update fit class (user can update the class like scale the max attendees schedule another start date and so on) 
4. delete  fit class (user can delete the classes created by him) 
5. book fit class (user can book the class) 
6. cancel class (user can cancel the booked class) 

# Front End

## Pages

1. home page (see all future classes) 
2. classes page (see all created classes by user) 
3. dashboard page (see all booked classes) 
4. sign in page (user will sign in with his/her account) 
5. sign up page (user will sign up with new account) 
6. profile (user can see his/her name and password and sign out button and edit only name and password) 

## Drop Down

1. view class details (in home use can view details of the class and if is auth user can book the class)
2. in dashboard (when user click the drop down he/she will see a cancel button to cancel the class)
3. in classes (when user click the drop down he/she will see edit button to edit the class and delete button to delete the class)

## Popups

1. edit class (user can click edit class and it will show a modal and he/she can edit the class)
2. create class (user can click create class and it will show a modal and he/she can create class)
3. delete class (user can click delete class and it will show a modal to confirm or cancel the delete)

## Navbar

1. right nav (user will see the links to pages)
    - when not-auth (user will only see sign-in and home links)
    - when auth (user will see dashboard , classes , profile , home links)
2. left nav (user will see the brand)

## Operations

1. in home
    - user can click in each class and view its details and book if auth
2. in classes
    - user can edit the class
    - user can create a class
    - user can delete the class
3. in dashboard
    - user can cancel the class
4. in navbar
    - user can sign in
    - user can navigate if auth to dashboard , classes , profile
5. in sign-in 
    - user can navigate to sign up page and vice versa
