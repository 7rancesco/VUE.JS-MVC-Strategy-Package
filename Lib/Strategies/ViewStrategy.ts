export const ViewStrategy = ( view : View ) => {
    if(!view || !view['indexTemplate']) {
        return {indexTemplate : 'DataTable'}
    } 
    else {
        return { indexTemplate : view['indexTemplate'] }
    }
};