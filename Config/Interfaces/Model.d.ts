interface Property {
    propertyName? : string,
    type? : string,
    label? : string,
    value? : any,
    options? : { value : string | number, label : string }[],
    entity? : string,
    to_String? : string[],
    multiple? : boolean,
    search? : boolean,
    buttonAdd? : boolean,
    collection? : boolean
}


interface Model {
    relation?: object[];
    value?:any;
    [ key : string ] : Property;
}

interface Models {
    [ key : string ] : Model;
}