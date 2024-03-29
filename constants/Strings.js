export default {
    routes: {
        home: 'Home',
        settings: 'Settings',
        order: 'Order',
        delete: 'Delete',
        create: 'Create',
        edit: 'Edit',
        display: 'Display'
    },
    keys: {
        settings: 'USER_SETTINGS',
        projPrefix: 'PROJ-',
    },
    mailto: 'mailto:<admin@buddingapps.com>?subject=Divide%20%26%20De-Stress',
    website: 'https://www.buddingapps.com/projects/divide-%26-de-stress',
    languages: ['English', 'Español',],
    dateFormats: ['MM/DD', 'DD/MM', 'MM-DD', 'DD-MM', 'YY/MM/DD', 'DD/MM/YY', 'MM/DD/YY', 'YY-MM-DD', 'DD-MM-YY', 'MM-DD-YY'],
    timeFormat: 'h:mm a',
    orderKeys: ['_title', '_dueDate', ''],
    regex: {
        titles: /[^\wÀ-ÖØ-öø-ÿ'\- _/&:!]/,
        units: /[^A-Za-zÀ-ÖØ-öø-ÿ ]/,
        numbers: /[^0-9]/,
    },
    capitalize: (str) => {
        if (typeof str !== 'string' || /[^a-zÀ-ÖØ-öø-ÿ]/.test(str.charAt(0))) {
            return str
        }
        else {
            return str.charAt(0).toUpperCase() + str.slice(1)
        }
    },
    English: {
        buttons: {
            home: 'Home',
            settings: 'Settings',
            order: 'Order',
            save: 'Save',
            delete: 'Delete',
            create: 'New',
            edit: 'Edit',
            deleteU: 'Delete Unit',
            createU: 'Add Unit',
            editU: 'Edit Unit',
            cancel: 'Cancel',
            done: 'Done',
            okay: 'Okay',
            hideComp: 'Hide Completed',
            showComp: 'Show Completed',
            setToDefault: 'Set to Default',
            updateCurrent: 'Update',
            add: 'Add to',
            set: 'Set to',
            allSettings: {
                darkMode: 'Dark Mode On/Off',
                language: 'Language',
                dateFormat: 'Date Format:  ',
                notifications: 'Default Notification Preferences',
                freq: 'Notification Frequency:  ',
                time: 'Notification Time:  ', 
                unit: 'Set Default Unit:  ',
                editUnit: 'Edit or Add Unit Names',
                tags: 'Edit Your Tags',
                deleteAll: 'Start Fresh - Delete All Projects',
                feedback: 'Send Us Your Feedback',
                site: 'Visit Our Website'
            }
        },
        labels: {
            title: 'Project Title: ',
            dueDate: 'Due Date: ',
            startDate: 'Start Date: ',
            unitName: 'Unit Name: ',
            startUnit: 'First *unit*: ',
            currentunit: 'Current *unit*: ', 
            endUnit: 'Last *unit*: ', 
            total: 'Total ',
            tags: 'Tags, e.g. class or genre (optional): ',
            tagsDisplay: 'Tags: ',
            notification: 'Notifications: ',
            frequency: 'Frequency:',
            time: 'Time:',
            perDay: 'Complete *num* *unit* *freq*.',
            complete: '🎉 This project is complete! 🎉',
            dueToday: 'This project is due today!',
            overDue: '⚠️ This project is OVERDUE! ⚠️',
            sUnit: 'Singular: ',
            pUnit: 'Plural: ',
        },
        placeholder: {
            title: 'Title of your project...',
            tags: 'Chemistry, English, Nonfiction, Sci-Fi...',
            noTags: 'no tags...',
            loading: 'Loading...',
            noProj: 'No projects found'
        },
        units: ['word', 'page', 'chapter'],
        unitPlurals: ['words', 'pages', 'chapters'],
        frequencyWords: ['default', 'daily', 'every 2 days', 'every 3 days', 'every 4 days', 'every 5 days', 'every 6 days', 'weekly'],
        orders: ['Title', 'Due Next'],
        alerts: {
            info: `Thank you for downloading\nDivide & De-Stress!\n\nPress "Settings" to:\n\u2022 change app language\n\u2022 change default settings\n\u2022 add unit names\n\u2022 send feedback \n\u2022 visit our website\n\nPress "New" to start tracking a new project.\n\nOnce you have created a project, it will appear on this page. You can view or edit by pressing it.`,
            title: {
                exists: 'Title already exists.',
                blank: 'Title cannot be blank.'
            },
            first: 'First *unit* cannot be blank.',
            last: 'Last *unit* cannot be blank.',
            current: 'Current *unit* cannot be blank.',
            firstSmaller: 'Last *unit* must be larger than first *unit*.',
            charTitle: "Title can only contain letters, numbers, spaces, and these symbols: '-_/&:!",
            confirmDelete: 'Are you sure you want to delete this project?',
            order: 'Select below to reorder your projects.',
            updateCurrent: 'Enter a number below to add to or update current *unit*.',
            currentBig: 'Current *unit* cannot be bigger than last *unit*.',
            currentSmall: 'Current *unit* cannot be smaller than first *unit* minus one.',
            create_edit: {
                unit: 'Choose a unit below. You can add your own units in Settings.',
                time: 'Choose a time of day to be notified. You can edit the default time in Settings.',
                freq: 'Choose how often to receive notifications. You can edit the default frequency in Settings.'
            },
            settings: {
                language: 'Please select a language below. \n We would love to add more languages. If you would like to translate, please use the Feedback button to send us an email.',
                dateFormat: 'Please select a date format below.',
                notify: 'These notification settings are used by all projects set to default. Select a frequency below.',
                defUnit: 'Choose a default unit for your projects.',
                chooseEditUnit: 'What would you like to do?',
                addUnit: 'Enter a singular and plural form for your unit.',
                editUnit: 'Choose a unit to edit.',
                delUnit: 'Choose a unit to delete.',
                unitAllow: 'Unit names can only contain letters and spaces!',
                unitExists: '"*unit*" already exists!',
                noProj: 'You have no projects to delete.',
                deleteAll: 'Are you sure you want to delete all of your projects? This cannot be undone.',
            },
            deleting: 'Deleting...',
            saving: 'Saving...',
            error: 'Error: ',
            reminders: {
                dueTom: 'This project is due tomorrow. Are you ready?',
                regular: 'Have you made progress? Click to update.',
            }
        },
    },
    Español: {
        buttons: {
            home: 'Inicio',
            settings: 'Ajustes',
            order: 'Ordenar',
            save: 'Guardar',
            delete: 'Quitar',
            create: 'Nuevo',
            edit: 'Editar',
            deleteU: 'Quitar Unidad',
            createU: 'Crear Unidad',
            editU: 'Editar Unidad',
            cancel: 'Cancelar',
            done: 'Realizar',    
            okay: 'Okay',
            hideComp: 'Ocultar Completos',
            showComp: 'Mostrar Completos',
            setToDefault: 'Establecer por Defecto',
            updateCurrent: 'Actualizar el Corriente',
            add: 'Añadir',
            set: 'Establecer',
            allSettings: {
                darkMode: 'Modo Oscuro Encender/Apagar',
                language: 'Idioma',
                dateFormat: 'Formato de Fecha:  ',
                notifications: 'Preferencias por defecto para Notificaciónes',
                freq: 'Frecuencia de Notificación:  ',
                time: 'Tiempo de Notificación:  ',
                unit: 'Establecer Unidad por Defecto:  ',
                editUnit: 'Editar o Añadir Nombres de Unidad',
                tags: 'Edita Tu Etiqueta',
                deleteAll: 'Quitar Todos los Proyectos',
                feedback: 'Envíenos Sus Comentarios',
                site: 'Visite Nuestra Pagina Web'
            }
        },
        labels: {
            title: 'Título de Proyecto: ',
            dueDate: 'Fecha de Entrega: ',
            startDate: 'Fecha de Inicio: ',
            unitName: 'Nombre de Unidad: ',
            startUnit: '*unit* inicial: ',
            currentunit: '*unit* corriente: ',
            endUnit: '*unit* final: ',
            total: 'Total ',
            tags: 'Etiquetas, e.g. Clase o Género (opcional): ',
            tagsDisplay: 'Etiquetas: ',
            notification: 'Notificación: ',
            frequency: 'Frecuencia:',
            time: 'Tiempo:',
            perDay: 'Completa *num* *unit* *freq*.',
            complete: '🎉 ¡Este proyecto está completo! 🎉',
            dueToday: '¡Este proyecto se vence hoy!',
            overDue: '⚠️ ¡Este proyecto está ATRASADO! ⚠️',
            sUnit: 'Singular: ',
            pUnit: 'Plural: ',
        },
        placeholder: {
            title: 'Título de to proyecto...',
            tags: 'La Química, Inglés, No Ficción, Ciencia Ficción...',
            noTags: 'no etiquetas...',
            loading: 'Cargando...',
            noProj: 'No se encontraron proyectos'
        },
        units: ['palabra', 'página', 'capítulo'],
        unitPlurals: ['palabras', 'páginas', 'capítulos'],
        frequencyWords: ['por defecto', 'diario', 'cada 2 dias', 'cada 3 dias', 'cada 4 dias', 'cada 5 dias', 'cada 6 dias', 'semanal'],
        orders: ['Título', 'Debido Próximo'],
        alerts: {
            info: `Gracias por descargar\nDivide & De-Stress!\n\nToca "Ajustes" para:\n\u2022 cambiar idioma del app\n\u2022 cambiar ajustes por defecto\n\u2022 añadir nombres de unidad\n\u2022 envíarnos tus comentarios\n\u2022 visitar nuestra pagina web\n\nToca "Nuevo" para comenzar a seguir un nuevo proyecto.\n\nNuevo proyectos aparecen en esta pagina. Toca el proyecto para ver o editar.`,
            title: {
                exists: 'Título ya existe.',
                blank: 'Título no puede dejarse en blanco.'
            },
            first: '*unit* inicial no puede dejarse en blanco.',
            last: '*unit* final no puede dejarse en blanco.',
            current: '*unit* corriente no puede dejarse en blanco.',
            firstSmaller: '*unit* final no puede ser más menor que *unit* inicial.',
            charTitle: "Título solo puede contener letras, números, espacios, y estos símbolos: '-_/&:!",
            confirmDelete: '¿Seguro que quieres quitar este proyecto?',
            order: 'Selecciona abajo para reordenar tus proyectos.',
            updateCurrent: 'Ingresa un numero abajo para añadir o actualizar *unit* corriente.',
            currentBig: '*unit* corriente no puede ser más grande que *unit* final.',
            currentSmall: '*unit* corriente no puede ser más menor que *unit* inicial menos uno.',
            create_edit: {
                unit: 'Elige una unidad abajo. Tu puedes añadir tus unidades en Ajustes.',
                time: 'Elige un tiempo del día para ser notificado. Tu puedes editar el tiempo por defecto en Ajustes.',
                freq: 'Elige la frecuencia para recibir notificaciones. Tu puedes editar la frecuencia por defecto en Ajustes.'
            },
            settings: {
                language: 'Por favor selecciona un lenguaje abajo. \n Nos encantaría añadir más lenguajes. Si te gustaría traducir, por favor usa el botón de Comentarios para mandarnos un mensaje por correo electrónico.',
                dateFormat: 'Por favor selecciona un formato de fecha abajo.',
                notify: 'Estos ajustes de notificación son utilizados por todos los proyectos configurados por defecto. Por favor selecciona una frecuencia abajo.',
                defUnit: 'Elige una unidad por defecto para tus proyectos.',
                chooseEditUnit: '¿Qué te gustaría hacer?',
                addUnit: 'Ingresa una forma singular y plural para tu unidad.',
                editUnit: 'Elige una unidad para editar.',
                delUnit: 'Elige una unidad para quitar.',
                unitAllow: 'Nombres de unidades solo pueden contener letras y espacios.',
                unitExists: '¡"*unit*" ya existe!',
                noProj: 'No tienes proyectos para quitar.',
                deleteAll: '¿Seguro que quieres quitar todos tus proyectos? Esto no se puede deshacer.',
            },
            deleting: 'Quitando...',
            saving: 'Guardando...',
            error: 'Error: ',
            reminders: {
                dueTom: 'Este proyecto vence mañana. ¿Listo?',
                regular: '¿Has progressado? Haz clic para actualizar.',
            }
        },
    },
};