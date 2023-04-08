interface View {
    indexTemplate? : string,
    hideNavigation? : boolean,
    group? : string
}

interface Views {
    [ key : string ] : View;
}