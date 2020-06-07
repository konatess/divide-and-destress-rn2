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
const okay= new ButtonObj(Strings.buttons.okay, Colors.done, 'md-checkmark');
const darkMode= new ButtonObj(Strings.buttons.allSettings.darkMode, Colors.done, 'md-contrast');
const language= new ButtonObj(Strings.buttons.allSettings.language, Colors.done, 'md-globe');
const dayChange= new ButtonObj(Strings.buttons.allSettings.dayChange, Colors.done, 'md-bed');
const dateFormat= new ButtonObj(Strings.buttons.allSettings.dateFormat, Colors.done, 'md-calendar');
const notifications= new ButtonObj(Strings.buttons.allSettings.notifications, Colors.done, 'md-notifications');
const startVsTotal= new ButtonObj(Strings.buttons.allSettings.startVsTotal, Colors.done, 'md-swap');
const unit= new ButtonObj(Strings.buttons.allSettings.unit, Colors.done, 'md-list');
const tags= new ButtonObj(Strings.buttons.allSettings.tags, Colors.done, 'ios-pricetags');
const deleteAll= new ButtonObj(Strings.buttons.allSettings.deleteAll, Colors.done, 'md-trash');
const feedback= new ButtonObj(Strings.buttons.allSettings.feedback, Colors.done, 'md-chatbubbles');

export default {
    settings: settings,
    home: home,
    order: order,
    delete: trash,
    create: create,
    edit: edit,
    save: save,
    cancel: cancel,
    done: done,
    okay: okay,
    settingsList: {
        darkMode: darkMode,
        language: language,
        dayChange: dayChange,
        dateFormat: dateFormat,
        notifications: notifications,
        startVsTotal: startVsTotal,
        unit: unit,
        tags: tags,
        deleteAll: deleteAll,
        feedback: feedback
    }
};