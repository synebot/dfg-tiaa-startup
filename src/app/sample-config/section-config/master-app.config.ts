import { EnumFormConfigSource } from 'dfg-dynamic-form';

/*
*   This config is of type SectionConfig[]
*/
// export const masterAppConfig: SectionConfig[]  = [

export const taxDashboard = [
    {
        sectionName: 'Tax Form W9',
        sectionDescription : 'Loads Tax Form',
        sectionController: 'taxForm',
        sectionPermission: ['tax-form'],
        loadConfig: {
            actionName: 'load',
            permission:  ['tax-form']
        },
    },
    {
        sectionName: 'Tax Form W7',
        sectionDescription : 'Loads Tax Form',
        sectionController: 'taxForm',
        sectionPermission: ['tax-form'],
        loadConfig: {
            actionName: 'load',
            permission:  ['tax-form']
        },
        formConfigSource: EnumFormConfigSource.LOCAL,
        formConfigPath: 'SampleFromConfig'
    }
];


export const masterAppConfig = [
    {
        id: 1,
        sectionName: 'Sample Static Form',
        sectionDescription : 'Sample Static Form',
        sectionLink: '#/static-section/sampleForm'
    },
    {
        sectionName: 'Sample Dynamic Forms',
        sectionDescription : 'Loads Tax Dashboard',
        sectionController: 'dashboard',
        sectionPermission: ['tax-dashboard'],
        loadConfig: {
            actionName: 'load',
            permission:  ['tax-dashboard']
        },
        subSectionConfig: taxDashboard
    },
    {
        sectionName: 'Form Section',
        sectionDescription : 'Form Section',
        sectionController: 'formSection',
        sectionLink: '#/form-section/dashboard',
        loadConfig: {
            actionApiUrl: 'http://localhost:3000/FormSection'
        },
        saveConfig: {
            actionApiUrl: 'http://localhost:3000/FormSection'
        }
    },
    {
        sectionName: 'Form Designer',
        sectionDescription : 'Form Designer',
        sectionController: 'test',
        sectionPermission: ['tax-test'],
        sectionLink: '#/form-designer/dashboard',
        loadConfig: {
            actionApiUrl: 'http://localhost:3000/FromConfig'
        },
        saveConfig: {
            actionApiUrl: 'http://localhost:3000/FromConfig'
        },
    }
];

// use require to load file
