// pull out button constructor, an export and object of button objects
// this will make code more human readable and buttons easier to find and to lump together
// Also make object of routes so that the strings are easier to edit
// May need to import navigation differently
// Maybe instead of saving onpress to object, only save route and call the 
// onpress in the button itself just feeding in the route?
// set on press in button bar?

import Colors from './Colors';
import Strings from './Strings';

class ButtonObj {
    constructor(t, c, i) {
        this._title= t;
        this._color= c; 
        this._iconName= i; 
    }
};

// const allButtonsObj = {};
const settings= new ButtonObj(Strings.buttons.settings, Colors.settings, 'md-settings');
const home= new ButtonObj(Strings.buttons.home, Colors.home, 'md-home');
const order= new ButtonObj(Strings.buttons.order, Colors.order, 'md-reorder');
const save= new ButtonObj(Strings.buttons.save, Colors.save, 'md-save');
const trash= new ButtonObj(Strings.buttons.delete, Colors.delete, 'md-trash');
const create= new ButtonObj(Strings.buttons.create, Colors.create, 'md-add');
const edit= new ButtonObj(Strings.buttons.edit, Colors.edit, 'md-create');
const cancel= new ButtonObj(Strings.buttons.cancel, Colors.cancel, 'md-close');
const done= new ButtonObj(Strings.buttons.done, Colors.done, 'md-checkmark');

export default {
    settings: settings,
    home: home,
    order: order,
    delete: trash,
    create: create,
    edit: edit,
    save: save,
    cancel: cancel,
    done: done
};