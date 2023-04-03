export const ModelStrategy = ( model : Model ) => {
    let properties : Model[] = [];
    const keys = Object.keys(model);
    keys.forEach(key => {
        let property : { [key : string] : any } = {};
        property['propertyName'] = key;
        property['label'] = key;
        property['value'] = null;


        if(!model[key]['type']){
            property['type'] = 'text';
        } else {
            property['type'] = model[key]['type'];
        }

        //Field condition values
        if(property['type'] === 'select'){
            property['options'] = model[key]['options'];
        }


        properties.push(property)
    });
    return properties
};