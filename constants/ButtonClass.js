import Colors from './Colors';

class ButtonObj {
    constructor(t, c, i) {
        this._title= t;
        this._color= c; 
        this._iconName= i; 
    }
};
const settings= new ButtonObj('', Colors.settings, 'md-settings');
const home= new ButtonObj('', Colors.home, 'md-home');
const order= new ButtonObj('', Colors.order, 'md-reorder');
const save= new ButtonObj('', Colors.save, 'md-save');
const trash= new ButtonObj('', Colors.delete, 'md-trash');
const trash2= new ButtonObj('', Colors.delete, 'md-trash');
const create= new ButtonObj('', Colors.create, 'md-add');
const edit= new ButtonObj('', Colors.edit, 'md-create');
const set= new ButtonObj('', Colors.edit, 'md-create');
const cancel= new ButtonObj('', Colors.cancel, 'md-close');
const cancel2= new ButtonObj('', Colors.cancel, 'md-close');
const done= new ButtonObj('', Colors.done, 'md-checkmark');
const okay= new ButtonObj('', Colors.done, 'md-checkmark');
const darkMode= new ButtonObj('', Colors.done, 'md-contrast');
const language= new ButtonObj('', Colors.done, 'md-globe');
const dateFormat= new ButtonObj('', Colors.done, 'md-calendar');
const notifications= new ButtonObj('', Colors.done, 'md-notifications');
const freq= new ButtonObj('', Colors.done, 'md-notifications');
const time= new ButtonObj('', Colors.done, 'md-notifications');
const unit= new ButtonObj('', Colors.done, 'md-list');
const editUnit= new ButtonObj('', Colors.edit, 'md-add');
const deleteAll= new ButtonObj('', Colors.done, 'md-trash');
const feedback= new ButtonObj('', Colors.done, 'md-chatbubbles');

export default {
    settings: settings,
    home: home,
    order: order,
    delete: trash,
    delete2: trash2,
    create: create,
    edit: edit,
    set: set,
    save: save,
    cancel: cancel,
    cancel2: cancel2,
    done: done,
    okay: okay,
    settingsList: {
        darkMode: darkMode,
        language: language,
        dateFormat: dateFormat,
        notifications: notifications,
        freq: freq,
        time: time,
        defaultUnit: unit,
        editUnit: editUnit,
        deleteAll: deleteAll,
        feedback: feedback
    }
};