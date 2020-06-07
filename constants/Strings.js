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
        setToDefault: 'Default Notifications',
        allSettings: {
            darkMode: 'Dark Mode On/Off',
            language: 'Language',
            dayChange: 'Day Change',
            dateFormat: 'Date Format',
            notifications: 'Default Notification Preferences',
            startVsTotal: 'Set Default Count to Total or Start/End',
            unit: 'Set Default Unit',
            tags: 'Edit Your Tags',
            deleteAll: 'Start Fresh - Delete All Projects',
            feedback: 'Send Us Your Feedback'
        }
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
        startUnit: 'First unit: ',
        currentUnit: 'Current unit: ', 
        endUnit: 'Last unit: ', 
        total: 'Total ',
        tags: 'Tags, e.g. class or genre (optional): ',
        tagsDisplay: 'Tags: ',
        notification: 'Notifications: ',
        frequency: 'Freq:',
        time: '  Time:',
        toggle: 'First and last unit vs. total number of units: '
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
        first: 'First unit cannot be blank',
        last: 'Last unit cannot be blank',
        firstSmaller: 'Last unit cannot be a smaller number than first unit',
        charTitle: 'Title can only contain letters, numbers, spaces, apostrophes, dashes and underscores.',
        charTags: 'Tags can only contain letters, numbers, spaces, apostrophes, dashes and underscores. Use commas to separate.',

    }
};