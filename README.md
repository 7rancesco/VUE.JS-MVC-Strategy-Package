# VUE MVC Strategy

VUE.js package for creating an MVC Front-End architecture using a strategy patterns library


## System Requirements

- Vue.js version 3.0 
- TypeScript extension ( Required )
- Bootstrap 5.3 ( Optional )


## Install

- cd YourVueProjectName/src
- git clone https://github.com/7rancesco/VUE.JS-MVC-Strategy-Package.git MVCS

Then add "import Navigator from './MVCS/Navigator.vue'" and add Navigator/> inside the template in App.ts file. This generate the view of model components automatically.


## Configurations


### Model Configuration

Define your models in MVCS/Config/Model.ts, for example: 
export const Model : Models = {

    "Student" : {
        "name" : {},
        "surname" : {}
    },

    "Teacher" : {
        "name" : {},
        "surname" : {},
        "age" : {}
    }

    //etc...
}

For adding a specific input type add { type : 'form-element-name'}, for example: 

    "Teacher" : {
        "fullName" : {
            type : "text"
        },
        "age" : {
            type : "number"
        },
        "teaching" : {
            type : "select",
            options : [
                {value : "Music", label: "Music theory"},
                {value : "Science", label: "Science education"}
            ]
        }
    }

By default each property is text type.