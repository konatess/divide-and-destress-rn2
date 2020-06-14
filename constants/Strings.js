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
            editUnit: 'Edit or Add Unit Names',
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
        toggle: 'First and last unit vs. total number of units: ',
        perDay: 'Complete num unit(s) freq',
        complete: 'This project is completed',
        dueToday: 'This project is due today',
        overDue: 'This project is OVERDUE',
    },
    placeholder: {
        title: 'Title of your project...',
        tags: 'Chemistry, English, Nonfiction, Sci-Fi...',
        noTags: 'no tags...',
        loading: 'Loading...'
    },
    languages: ['English', 'Español',],
    units: ['word', 'page', 'chapter'],
    dateFormats: ['MM/DD', 'DD/MM', 'MM-DD', 'DD-MM', 'YY/MM/DD', 'DD/MM/YY', 'MM/DD/YY', 'YY-MM-DD', 'DD-MM-YY', 'MM-DD-YY'],
    frequencyWords: ['default', 'daily', 'every 2 days', 'every 3 days', 'every 4 days', 'every 5 days', 'every 6 days', 'weekly'],
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
        confirmDelete: 'Are you sure you want to delete this project?',
        settings: {
            language: 'Please select a language below. \n We would love to add more languages. If you would like to translate, please use the Feedback button to send us an email.',
            dateFormat: 'Please select a date format below:',
            notify: '',
            total: '',
            unit: '',
            deleteAll: 'Are you sure you want to delete all of your projects? This cannot be undone.',
        }
    }
};