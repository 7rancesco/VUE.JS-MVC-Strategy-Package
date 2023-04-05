export const Model : Models = {
    "Student" : {
        "name" : {},
        "surname" : {}
    },
    "Teacher" : {
        "name" : {},
        "surname" : {},
        "age" : {
            type : "number"
        },
        "retribution" : {
            type : "select",
            options : [
                {value : 'month', label : 'Mensile' },
                {value : 'year', label : 'Annuale' }
            ]
        },
        "students" : {
            type : "choice",
            entity : "Student",
            to_String : ['surname', 'name'],
            multiple : true,
            search : true
        }
    },
}