# VUE MVC Strategy

VUE.js package for creating an MVC Front-End architecture using a strategy patterns library


## System Requirements

- Vue.js version 3.0 
- TypeScript extension ( Required )
- Bootstrap 5.3 ( Optional )


## Install
git clone https://github.com/7rancesco/VUE.JS-MVC-Strategy-Package.git MVCS

## Configurations


### Model Configuration

Define your models in MVCS/Config/Model.ts, for example: 

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

For setting a specific input type add { type : 'form-element-name'}, for example: 

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

### Types

- Select

    type : "select",
    options : [
        {value : 1, label: "One"},
        {value : 2, label: "Two"}
    ]

- Choice

    type : "choice",
    entity : "Entity Name",
    to_String : ['surname', 'name'],
    multiple : true, // default false
    search : true // default false
    buttonAdd : true // default false

- Collection
    type : "choice",
    entity : "Entity Name",
    collection : true,