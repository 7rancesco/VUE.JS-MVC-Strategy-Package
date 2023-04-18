import { Storage } from "./Sorage";

export const ModelStrategy = ( schema : Schema ) => {
    const model : Model = schema.model;
    if(model){
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
            if(model[key]['type'] === 'select'){
                property['options'] = model[key]['options'];
            }

            if(model[key]['type'] === 'choice'){
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

                    if(model[key]['buttonAdd']){
                        property['buttonAdd'] = true;
                        if(schema.allModels){
                            const entityName = model[key]['entity'];
                            if(entityName){
                                property['entity'] = entityName;
                                const relation = schema.allModels[entityName];
                                const s = {...schema};
                                s.model = relation;
                                property['relation'] = ModelStrategy(s);
                            }
                        }                        
                    }
                }
                
            }

            if(model[key]['collection']){
                if(schema.allModels){
                    const entityName = model[key]['entity'];
                    if(entityName){
                        property['entity'] = entityName;
                        const relation = schema.allModels[entityName];
                        const s = {...schema};
                        s.model = relation;
                        property['relation'] = [ModelStrategy(s)];
                        property['collection'] = true;
                    }
                }
            }


            properties.push(property)
        });
        return properties
    }        
};