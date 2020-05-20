const purple = '#9200DA';

export default {
    headers: {
        home:'Your Projects',
    },
    buttons: {
        home: 'Home',
        settings: 'Settings',
        order: 'Order',
        save: 'Save',
        delete: 'Delete',
        create: 'New',
        edit: 'Edit',
        cancel: 'Cancel',
        done: 'Done'
    },
    routes: {
        home: 'Home',
        settings: 'Settings',
        order: 'Order',
        delete: 'Delete',
        create: 'Create',
        edit: 'Edit',
        display: 'Display'
    },
    labels: {
        title: 'Title:',
        dueDate: 'Due Date:',
        unitName: 'Unit Name:',
        startUnit: 'First ', 
        endUnit: 'Last ', 
        total: 'Total ',
        tags: 'Tags, e.g. class or genre:',
        notification: 'Notification settings:',
        toggle: 'First and last page vs. total number of pages:'
    },
    placeholder: {
        title: 'Title of your project...',
        tags: 'Chemistry, English, Nonfiction, Sci-Fi...',
    },
    units: ['word', 'page', 'chapter'],
    keys: {
        settings: 'USER_SETTINGS',
        projPrefix: 'PROJ-',
    },
    alerts: {
        title: {
            exists: 'Title already exists',
            blank: 'Title cannot be blank'
        },
        first: 'First page cannot be blank',
        last: 'Last page cannot be blank'

    }
};