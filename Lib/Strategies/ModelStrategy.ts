import { Storage } from "./Sorage";

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

        if(property['type'] === 'choice'){
            const entity = model[key]['entity'];
            if(entity){
                const choices = Storage(entity).getDatas();
                let options : { value : any, label : string }[] = [];
                choices.forEach((element : {[key : string] : any}) => {
                    let label : string = '';
                    const toString = model[key]['to_String'];
                    if( toString ){
                        toString.forEach(lbl => {
                            label += element[lbl] + ' ';
                        });
                    } else {
                        label = 'label missing'
                    }

                    options.push({
                        value : element['id'],
                        label : label
                    })
                });
                property['options'] = options;

                if(model[key]['multiple']){
                    property['multiple'] = true;
                }

                if(model[key]['search']){
                    property['search'] = true;
                }
            }
            
        }


        properties.push(property)
    });
    return properties
};