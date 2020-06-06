const purple = '#9200DA';

export default {
    headers: {
        home:'Your Projects',
        create: 'New Project',
        edit: 'Edit ',
        settings: 'Settings',
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
        done: 'Done',
        okay: 'Okay',
        setToDefault: 'Default Notifications'
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
        title: 'Project Title: ',
        dueDate: 'Project Due Date: ',
        startDate: 'Project Start Date: ',
        unitName: 'Unit Name: ',
        startUnit: 'First ',
        currentUnit: 'Current ', 
        endUnit: 'Last ', 
        total: 'Total ',
        tags: 'Tags, e.g. class or genre (optional): ',
        tagsDisplay: 'Tags: ',
        notification: 'Notifications: ',
        frequency: 'Freq:',
        time: '  Time:',
        toggle: 'First and last page vs. total number of pages: '
    },
    placeholder: {
        title: 'Title of your project...',
        tags: 'Chemistry, English, Nonfiction, Sci-Fi...',
        noTags: 'no tags...'
    },
    units: ['word', 'page', 'chapter'],
    frequencyWords: ['default', 'daily', '2 days', '3 days', '4 days', '5 days', '6 days', 'weekly'],
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
        last: 'Last page cannot be blank',
        charTitle: 'Title can only contain letters, numbers, spaces, dashes and underscores.',
        charTags: 'Tags can only contain letters, numbers, spaces, dashes and underscores. Use commas to separate.',

    }
};