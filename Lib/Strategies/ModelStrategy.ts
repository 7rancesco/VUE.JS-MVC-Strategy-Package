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
        properties.push(property)
    });
    return properties
};