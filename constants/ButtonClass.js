import Colors from './Colors';

class ButtonObj {
    constructor(t, c, i) {
        this._title= t;
        this._color= c; 
        this._iconName= i; 
    }
};
const settings= new ButtonObj('', Colors.settings, 'settings-sharp');
const home= new ButtonObj('', Colors.home, 'home');
const order= new ButtonObj('', Colors.order, 'reorder-three');
const save= new ButtonObj('', Colors.save, 'save-sharp');
const trash= new ButtonObj('', Colors.delete, 'trash-sharp');
const trash2= new ButtonObj('', Colors.delete, 'trash-sharp');
const create= new ButtonObj('', Colors.create, 'add-sharp');
const edit= new ButtonObj('', Colors.edit, 'create-outline');
const set= new ButtonObj('', Colors.edit, 'create-outline');
const cancel= new ButtonObj('', Colors.cancel, 'close');
const cancel2= new ButtonObj('', Colors.cancel, 'close');
const done= new ButtonObj('', Colors.done, 'checkmark');
const okay= new ButtonObj('', Colors.done, 'checkmark');
const okaySave= new ButtonObj('', Colors.save, 'checkmark');
const darkMode= new ButtonObj('', Colors.done, 'contrast');
const language= new ButtonObj('', Colors.done, 'language');
const dateFormat= new ButtonObj('', Colors.done, 'calendar');
const notifications= new ButtonObj('', Colors.done, 'notifications');
const freq= new ButtonObj('', Colors.done, 'repeat');
const time= new ButtonObj('', Colors.done, 'time-outline');
const unit= new ButtonObj('', Colors.done, 'list');
const editUnit= new ButtonObj('', Colors.edit, 'add-sharp');
const deleteAll= new ButtonObj('', Colors.done, 'trash-sharp');
const feedback= new ButtonObj('', Colors.done, 'chatbubble');
const site= new ButtonObj('', Colors.done, 'globe');
const hideComp= new ButtonObj('', Colors.edit, 'file-tray');
const showComp= new ButtonObj('', Colors.edit, 'file-tray-full');

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
    hideComp: hideComp,
    showComp: showComp,
    okaySave: okaySave,
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