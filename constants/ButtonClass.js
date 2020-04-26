

export class ButtonObj {
    constructor(navigation, route, t, c, i) {
        this._title= t;
        this._color= c; 
        this._iconName= i; 
        this._onPress= () => navigation.navigate(route);
    }
}