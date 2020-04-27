// pull out button constructor, an export and object of button objects
// this will make code more human readable and buttons easier to find and to lump together
// Also make object of routes so that the strings are easier to edit
// May need to import navigation differently
// Maybe instead of saving onpress to object, only save route and call the 
// onpress in the button itself just feeding in the route?
// set on press in button bar?

import Colors from './Colors';

class ButtonObj {
    constructor(r, t, c, i) {
        this._title= t;
        this._color= c; 
        this._iconName= i; 
        this._route= r;
    }
};

// const allButtonsObj = {};
const settings= ButtonObj('Settings', 'Settings', Colors.settings, 'md-settings');
const home= ButtonObj('Home', 'Home', Colors.home, 'md-home');
const order= ButtonObj('Order', 'Order', Colors.order, '');
// allButtonsObj.save= ButtonObj('Save', 'Save', Colors.save, 'md-save');
const trash= ButtonObj('Delete', 'Delete', Colors.delete, 'md-trash');
const create= ButtonObj('Create', 'Create', Colors.create, 'md-add');
const edit= ButtonObj('Edit', 'Edit', Colors.edit, 'md-create');
// allButtonsObj.cancel= ButtonObj('Cancel', 'Cancel', Colors.cancel, 'md-close');

export default {
    settings: settings,
    home: home,
    order: order,
    delete: trash,
    create: create,
    edit: edit
};