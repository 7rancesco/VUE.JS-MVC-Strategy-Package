interface Property {
    propertyName? : string,
    type? : string,
    label? : string,
    value? : any
}


interface Model {
    [ key : string ] : Property;
}

interface Models {
    [ key : string ] : Model;
}