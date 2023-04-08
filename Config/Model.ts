export const Model : Models = {
    "Materia" : {
        "name" : {},
    },
    "Student" : {
        "name" : {},
        "surname" : {},
        "materie" : {
            type : "choice",
            entity : "Materia",
            collection : true
        }
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
            search : true,
            buttonAdd : true
        }
    },
}