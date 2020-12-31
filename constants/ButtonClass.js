import Colors from './Colors';

class ButtonObj {
    constructor(t, c, i) {
        this._title= t;
        this._color= c; 
        this._iconName= i; 
    }
};
const settings= new ButtonObj('', Colors.settings, 'md-settings-sharp');
const home= new ButtonObj('', Colors.home, 'md-home');
const order= new ButtonObj('', Colors.order, 'md-reorder-three');
const save= new ButtonObj('', Colors.save, 'save-sharp');
const trash= new ButtonObj('', Colors.delete, 'trash-sharp');
const trash2= new ButtonObj('', Colors.delete, 'trash-sharp');
const create= new ButtonObj('', Colors.create, 'md-add-sharp');
const edit= new ButtonObj('', Colors.edit, 'create-outline');
const set= new ButtonObj('', Colors.edit, 'create-outline');
const cancel= new ButtonObj('', Colors.cancel, 'md-close');
const cancel2= new ButtonObj('', Colors.cancel, 'md-close');
const done= new ButtonObj('', Colors.done, 'md-checkmark');
const okay= new ButtonObj('', Colors.done, 'md-checkmark');
const darkMode= new ButtonObj('', Colors.done, 'md-contrast');
const language= new ButtonObj('', Colors.done, 'language');
const dateFormat= new ButtonObj('', Colors.done, 'md-calendar');
const notifications= new ButtonObj('', Colors.done, 'md-notifications');
const freq= new ButtonObj('', Colors.done, 'repeat');
const time= new ButtonObj('', Colors.done, 'time-outline');
const unit= new ButtonObj('', Colors.done, 'list');
const editUnit= new ButtonObj('', Colors.edit, 'md-add-sharp');
const deleteAll= new ButtonObj('', Colors.done, 'trash-sharp');
const feedback= new ButtonObj('', Colors.done, 'chatbubble');
const site= new ButtonObj('', Colors.done, 'globe');

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
        feedback: feedback,
        site: site
    }
};