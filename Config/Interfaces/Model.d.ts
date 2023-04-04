interface Property {
    propertyName? : string,
    type? : string,
    label? : string,
    value? : any,
    options? : { value : string | number, label : string }[],
    entity? : string,
    to_String? : string[],
    multiple? : boolean
}


interface Model {
    [ key : string ] : Property;
}

interface Models {
    [ key : string ] : Model;
}