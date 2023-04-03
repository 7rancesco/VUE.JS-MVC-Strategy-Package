export const Storage = ( entity : string ) => {
    return {
        getDatas : () => {
            initStorage();
            const storage = getStorage(entity);
            return storage;
        },
        setDatas : ( datas : Model[] ) => {
            setStorage( entity, datas )
        },
        updateDatas : ( datas : Model[], id : number ) => {
            let storage = getStorage(entity);
            let data : { [key : string] : any } = storage.find((e: { id: number; }) => e.id === id);

            datas.forEach(element => {
                const property = element['propertyName'];
                const value = element['value'];
                data[ property as string ] = value;
            });
            updateStorage(entity, storage)
        },
        removeDatas : ( id : number ) => {
            let storage = getStorage(entity);
            let newStorage = storage.filter((e: { id: number; }) => e.id !== id);
            updateStorage(entity, newStorage );
        }
    }
};

function initStorage(){
    const local = localStorage.getItem('MVCS_Storages');
    if(!local){
        localStorage.setItem('MVCS_Storages', '{}');
    }
    const id = localStorage.getItem('MVCS_ID');
    if(!id){
        localStorage.setItem('MVCS_ID', '0');
    }
}

function getStorage( name : string ){
    const local = localStorage.getItem('MVCS_Storages');
    if(local){
        const localObj = JSON.parse(local);
        const store = localObj[name];
        if(store){
            return store
        } else {
            localObj[name] = [];
            localStorage.setItem('MVCS_Storages', JSON.stringify(localObj) );
            return localObj
        }
    }
}

function setStorage( entity: string, datas : Model[] ){
    const local = localStorage.getItem('MVCS_Storages');
    if(local){
        const localObj = JSON.parse(local);
        const store = localObj[entity];
        const data : {[key : string] : any} = {};
        const id = localStorage.getItem('MVCS_ID');
        if(id){
            localStorage.setItem('MVCS_ID', (parseInt(id) - 1)+'')
            data['id'] = parseInt(id) - 1;

            datas.forEach(element => {
                const property = element['propertyName'];
                const value = element['value'];
                data[property+''] = value;
            });
            store.push(data)
            localStorage.setItem('MVCS_Storages', JSON.stringify(localObj) );            
        }
    }
}

function updateStorage(entity : string, newStorage : object[]){
    const local = localStorage.getItem('MVCS_Storages');
    if(local){
        let localObj = JSON.parse(local);
        localObj[entity] = newStorage ;
        localStorage.setItem('MVCS_Storages', JSON.stringify(localObj) );  
    }
}