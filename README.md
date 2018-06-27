# ExpenseTracker
This is an application used for basic expense tracking with firebase backend

#Features
1. User can signin or signup in this application
2. Users can add,edit,delete and update items.
3. For each items user can add Photo,Item Name and Item Price.
4. Users can also do a sort (ascending/descending) based on price and createdDate and filter based on the name and image availablity.

#Firebase Setup 
1. Go to firebase and create an account
2. Go to firebase console and create a new project(with some name and your country)
3. In the get started section select add firebase to web and copy the configurations and keep it in your notpad.
    eg:
    var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  };
  
  #Note: each of the above fields will have some value.
  
  4. In the left hand side inside develop we have to do 3 things:
      i. Go to authentication and click set up signin methods
        a. Enable the first option only(email/password) as that is what is used for the project.
      ii. Go to Database and click on create database(real Time DB).
        a. Click on start in test mode and then click on enable.
        b. Go to rules tab inside that paste the following:
        {
          "rules": {
            ".read": true,
            ".write": true,
              "items": {
               "$uid": {
                 ".read": "$uid === auth.uid",
                 ".write": "$uid === auth.uid"
               }
             }
          }
        }
        #Note: This is so that read and write is done after auth.
        
      iii. Go to Storage and click get started and click on got it.
      
    This is all that is required for the firebase setup.
    
#Installation Steps
1. Clone the project.
2. Please note that angular/cli version required is >=1.6.5
3. Do npm install(to install local packages in your computer.
4. The firebase config which was copied(as per the instructions in the firebase section) paste that in the 
src->environments->environment.ts file.
5. You are now good to go.

#Unit Test
ng test
