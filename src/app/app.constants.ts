export const CSS_CONFIG: any[] = [
    {
        "columnSize": 1,
        "fields": [
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "controlType": "text",
                "label": "CSS Class Name",
                "modelFieldKey": "cssClass",
                "toolTip": "CSS Class Name",
                "showCondition": "['objectTable', 'dataTable', 'customDataTable'].indexOf(this.formData['controlType']) === -1"
            },
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "controlType": "text",
                "label": "CSS Icon Name",
                "modelFieldKey": "cssIconClass",
                "toolTip": "CSS Icon Name",
                "showCondition": "['objectTable', 'dataTable', 'customDataTable'].indexOf(this.formData['controlType']) === -1"
            }
        ]
    },
    {
        "columnSize": 1,
        "fields": [
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "controlType": "text",
                "label": "Show Condition",
                "modelFieldKey": "showCondition",
                "toolTip": "Show Condition",
                "detailedHelpText": "Show Condition",
                "Placeholder": "Show Condition"
            },
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "controlType": "text",
                "label": "Attribute",
                "modelFieldKey": "dfgAttribute",
                "detailedHelpText": "Attribute",
                "toolTip": "Example:-> required:(this.formData['controlType'] === 'select' || this.formData['controlType'] === 'multiselect');disabled: this.formData['isActionConfig'] === true"
            }
        ]
    },
    {
        "columnSize": 1,
        "fields": [
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "controlType": "text",
                "label": "Dynamic Event",
                "modelFieldKey": "dfgEvents",
                "toolTip": "Handle selected HTML event. Example:-> change:(this.formData['selectOption2'] = this.formData['selectOption1'] === 'yes' ? this.formData['selectOption1'] : this.formData['selectOption2']);"
            },
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "controlType": "text",
                "label": "Dynamic Class",
                "modelFieldKey": "dfgClass",
                "showCondition": "['dataTable', 'customDataTable'].indexOf(this.formData['controlType']) !== -1"
            }
        ]
    }
];

export const FORM_CONFIG: any[] = [
    {
        "columnSize": 1,
        "fields": [
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "controlType": "checkbox",
                "label": "Required",
                "modelFieldKey": "required",
                "toolTip": "Is Field Required",
                "detailedHelpText": "Is Field Required",
                "cssClass": null,
                "defaultValue": false,
                "showCondition": "['objectTable', 'dataTable', 'customDataTable'].indexOf(this.formData['controlType']) === -1"
            },
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "controlType": "checkbox",
                "label": "Hidden",
                "modelFieldKey": "hidden",
                "toolTip": "Is Field Hidden",
                "detailedHelpText": "Is Field Hidden",
                "cssClass": null,
                "defaultValue": false,
                "Placeholder": null
            },
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "controlType": "checkbox",
                "label": "Disabled",
                "modelFieldKey": "disabled",
                "toolTip": "Disabled",
                "detailedHelpText": "Is Field Disabled",
                "defaultValue": false,
                "Placeholder": null,
                "showCondition": "['objectTable', 'dataTable', 'customDataTable'].indexOf(this.formData['controlType']) === -1"
            }
        ]
    },
    {
        "columnSize": 1,
        "fields": [
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "controlType": "checkbox",
                "label": "Table Column Visible",
                "modelFieldKey": "tableColumnVisible",
                "toolTip": "If this fild is displayed on Object Table, is this visible on Table? ",
                "detailedHelpText": "Is Table Field?",
                "defaultValue": false,
                "showCondition": "['objectTable', 'dataTable', 'customDataTable'].indexOf(this.formData['controlType']) === -1"
            },
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "controlType": "checkbox",
                "label": "Table Column as Control ",
                "modelFieldKey": "tableColumnShowAsControl",
                "toolTip": "If this fild is displayed on Object Table, is this visible on Table? ",
                "detailedHelpText": "Is Table Field?",
                "defaultValue": false,
                "showCondition": "['objectTable', 'dataTable', 'customDataTable'].indexOf(this.formData['controlType']) === -1"
            },
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "controlType": "checkbox",
                "label": "Show Toggle Button for Mask",
                "modelFieldKey": "showToggleButton",
                "toolTip": "Show Toggle Button for Mask",
                "detailedHelpText": "Show toggle button for masked field",
                "defaultValue": true,
                "showCondition": "['masked'].indexOf(this.formData['controlType']) !== -1"
            }
        ]
    },
    {
        "columnSize": 1,
        "fields": [
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "expanded": false,
                "controlType": "select",
                "label": "Validation Type",
                "modelFieldKey": "customValidationType",
                "cssClass": "",
                "showCondition": "['objectTable', 'dataTable', 'customDataTable'].indexOf(this.formData['controlType']) === -1",
                "defaultOptionList": [
                    {
                        "itemName": "Custom",
                        "id": "custom",
                        "sequenceId": null
                    },
                    {
                        "itemName": "RegEx Pattern",
                        "id": "regex",
                        "sequenceId": null
                    }
                ]
            },
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "expanded": false,
                "controlType": "text",
                "label": "Validation Message",
                "modelFieldKey": "customValidationMessage",
                "cssClass": "",
                "defaultValue": "This field is required.",
                "showCondition": "!!this.formData['customValidationType']"
            },
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "expanded": false,
                "controlType": "text",
                "label": "Validation Pattern",
                "modelFieldKey": "customValidation",
                "cssClass": "",
                "showCondition": "!!this.formData['customValidationType']"
            }
        ]
    },
    {
        "columnSize": 1,
        "fields": [
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "isControlSelected": true,
                "controlType": "text",
                "label": "Control Permissions",
                "toolTip": "Enter comma seperated controlpoint/permissions required to load this control.",
                "modelFieldKey": "controlPermission"
            }
        ]
    }
];

export const GENERAL_CONFIG: any[] = [
    {
        "columnSize": 1,
        "fields": [
            {
                "controlType": "select",
                "modelFieldKey": "controlType",
                "label": "Control Type",
                "required": true,
                "defaultOption": "Control Type",
                "defaultOptionList": [
                    {
                        "id": "text",
                        "itemName": "Textbox"
                    },
                    {
                        "id": "textarea",
                        "itemName": "Textarea"
                    },
                    {
                        "id": "select",
                        "itemName": "Select"
                    },
                    {
                        "id": "select-text",
                        "itemName": "Select Text"
                    },
                    {
                        "id": "multiselect",
                        "itemName": "Multi Select"
                    },
                    {
                        "id": "date",
                        "itemName": "Date"
                    },
                    {
                        "id": "checkbox",
                        "itemName": "Checkbox"
                    },
                    {
                        "id": "checkbox-yes-no",
                        "itemName": "Checkbox - Yes No"
                    },
                    {
                        "id": "radio",
                        "itemName": "Radio Button"
                    },
                    {
                        "id": "label",
                        "itemName": "Readonly Label"
                    },
                    {
                        "id": "info-label",
                        "itemName": "Information Label"
                    },
                    {
                        "id": "button",
                        "itemName": "Button"
                    },
                    {
                        "id": "hyperlink",
                        "itemName": "Hyperlink"
                    },
                    {
                        "id": "hyperlink-label",
                        "itemName": "Hyperlink Label"
                    },
                    {
                        "id": "seperator",
                        "itemName": "Seperator"
                    },
                    {
                        "id": "masked",
                        "itemName": "Masked Field"
                    },
                    {
                        "id": "file-upload",
                        "itemName": "File Upload"
                    },
                    {
                        "id": "blank",
                        "itemName": "Blank Space"
                    },
                    {
                        "id": "expansion-panel-start",
                        "itemName": "Expansion Panel Start"
                    },
                    {
                        "id": "expansion-panel-end",
                        "itemName": "Expansion Panel End"
                    },
                    {
                        "id": "repeater-start",
                        "itemName": "Repeater Start"
                    },
                    {
                        "id": "repeater-end",
                        "itemName": "Repeater End"
                    },
                    {
                        "id": "container-start",
                        "itemName": "Container Start"
                    },
                    {
                        "id": "container-end",
                        "itemName": "Container End"
                    },
                    {
                        "id": "object",
                        "itemName": "Object Form"
                    },
                    {
                        "id": "objectTable",
                        "itemName": "Object Table"
                    },
                    {
                        "id": "dataTable",
                        "itemName": "Data Table"
                    },
                    {
                        "id": "customDataTable",
                        "itemName": "Custom Data Table"
                    }
                ]
            },
            {
                "controlType": "text",
                "modelFieldKey": "label",
                "label": "Label",
                "required": true
            }
        ]
    },
    {
        "columnSize": 1,
        "fields": [
            {
                "controlType": "text",
                "modelFieldKey": "modelFieldKey",
                "label": "Model Field Key",
                "required": true
            },
            {
                "required": false,
                "controlType": "text",
                "label": "Default Value",
                "modelFieldKey": "defaultValue",
                "toolTip": "Default Value",
                "showCondition": "['radio', 'button', 'hyperlink', 'select', 'select-text', 'multiselect', 'hyperlink-lable', 'objectTable', 'dataTable', 'customDataTable'].indexOf(this.formData['controlType']) === -1"
            },
            {
                "required": false,
                "controlType": "checkbox",
                "label": "Is Action Link",
                "modelFieldKey": "isActionConfig",
                "toolTip": "If true, Hyperlink link will only raise event and will not navigate to link.",
                "showCondition": "['hyperlink', 'hyperlink-label'].indexOf(this.formData['controlType']) !== -1"
            }
        ]
    },
    {
        "columnSize": 1,
        "fields": [
            {
                "required": false,
                "controlType": "checkbox",
                "label": "Show as Button for Object Form",
                "defaultValue": true,
                "modelFieldKey": "showObjectFormLinkAsButton",
                "showCondition": "['object'].indexOf(this.formData['controlType']) !== -1"
            },
            {
                "required": false,
                "controlType": "text",
                "label": "Display Key",
                "modelFieldKey": "objectFormDisplayKey",
                "showCondition": "['object'].indexOf(this.formData['controlType']) !== -1"
            }
        ]
    },
    {
        "columnSize": 1,
        "fields": [
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "defaultValue": false,
                "controlType": "checkbox",
                "label": "Action Column",
                "modelFieldKey": "showActionColumn",
                "toolTip": "Action Column",
                "showCondition": "['dataTable', 'customDataTable'].indexOf(this.formData['controlType']) !== -1"
            },
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "defaultValue": false,
                "controlType": "checkbox",
                "label": "Expanded Row",
                "modelFieldKey": "expandRow",
                "toolTip": "Enable Expanded Row",
                "showCondition": "['dataTable', 'customDataTable'].indexOf(this.formData['controlType']) !== -1"
            },
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "defaultValue": false,
                "controlType": "checkbox",
                "label": "Server Pagination",
                "modelFieldKey": "serverSidePagination",
                "toolTip": "Enables server side pagination",
                "showCondition": "['dataTable', 'customDataTable'].indexOf(this.formData['controlType']) !== -1"
            }
        ]
    },
    {
        "columnSize": 1,
        "fields": [
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "defaultValue": false,
                "controlType": "checkbox",
                "label": "Column Configuration",
                "modelFieldKey": "enableColumnConfiguration",
                "toolTip": "Enable Column Configuration",
                "showCondition": "['dataTable', 'customDataTable'].indexOf(this.formData['controlType']) !== -1"
            },
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "defaultValue": false,
                "controlType": "checkbox",
                "label": "Show Table Filter",
                "modelFieldKey": "tableShowFilter",
                "toolTip": "Show Table Filter",
                "dfgAttribute": "disabled:this.formData['enableColumnFilter']",
                "dfgEvents": "change:(this.formData['enableColumnFilter'] = this.formData['tableShowFilter'] ? false: this.formData['enableColumnFilter'])",
                "showCondition": "['dataTable', 'customDataTable'].indexOf(this.formData['controlType']) !== -1"
            },
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "defaultValue": false,
                "controlType": "checkbox",
                "label": "Enable CRUD Action",
                "modelFieldKey": "enableCRUD",
                "toolTip": "Enable CRUD Operation",
                "showCondition": "['dataTable', 'customDataTable'].indexOf(this.formData['controlType']) !== -1"
            }
        ]
    },
    {
        "columnSize": 1,
        "fields": [
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "defaultValue": false,
                "controlType": "checkbox",
                "label": "Enable Column Filter",
                "modelFieldKey": "enableColumnFilter",
                "toolTip": "Enable Column Filter",
                "dfgAttribute": "disabled:this.formData['tableShowFilter']",
                "dfgEvents": "change:(this.formData['tableShowFilter'] = this.formData['enableColumnFilter'] ? false: this.formData['tableShowFilter'])",
                "showCondition": "['customDataTable'].indexOf(this.formData['controlType']) !== -1"
            },
            {
                "defaultValue": false,
                "controlType": "checkbox",
                "label": "Enable Table Tree",
                "modelFieldKey": "isTableTree",
                "toolTip": "Enable Table Tree, please provide children array key for successful configuration ",
                "showCondition": "['dataTable', 'customDataTable'].indexOf(this.formData['controlType']) !== -1"
            }
        ]
    },
    {
        "columnSize": 1,
        "fields": [
            {
                "defaultValue": "children",
                "controlType": "text",
                "label": "Table Tree Children Array Model Key",
                "modelFieldKey": "childrenArrayModelKey",
                "toolTip": "Specify the children array key from data list.",
                "showCondition": "['dataTable', 'customDataTable'].indexOf(this.formData['controlType']) !== -1 && this.formData['isTableTree'] === true"
            }
        ]
    },
    {
        "columnSize": 1,
        "fields": [
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "controlType": "text",
                "label": "CRUD Actions",
                "modelFieldKey": "crudActions",
                "showCondition": "this.formData['enableCRUD'] === true",
                "toolTip": "What CRUD options need to be enabled? Enter option between ADD, EDIT, DELETE",
                "defaultValue": "ADD, EDIT, DELETE"
            }
        ]
    },
    {
        "columnSize": 1,
        "fields": [
            {
                "disabled": false,
                "hidden": false,
                "required": false,
                "controlType": "checkbox",
                "label": "Custom List Binding",
                "modelFieldKey": "isCustomListBinding",
                "showCondition": "this.formData['controlType'] === 'select' || this.formData['controlType'] === 'multiselect' || this.formData['controlType'] === 'select-text'"
            },
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "controlType": "text",
                "label": "List Source API",
                "modelFieldKey": "listItemValueApi",
                "showCondition": "!this.formData['isCustomListBinding'] &&  this.formData['controlType'] === 'select' || this.formData['controlType'] === 'multiselect' || this.formData['controlType'] === 'select-text'",
                "dfgAttribute": "required:(this.formData['controlType'] === 'select' || this.formData['controlType'] === 'multiselect' || this.formData['controlType'] === 'select-text')"
            }
        ]
    },
    {
        "columnSize": 1,
        "fields": [
            {
                "disabled": false,
                "required": true,
                "hidden": false,
                "controlType": "text",
                "label": "Item List GroupName",
                "modelFieldKey": "listItemGroupName",
                "toolTip": "Enter GroupName of this list",
                "showCondition": "this.formData['controlType'] === 'select' || this.formData['controlType'] === 'multiselect' || this.formData['controlType'] === 'select-text'"
            },
            {
                "disabled": false,
                "required": true,
                "hidden": false,
                "controlType": "text",
                "label": "Parent GroupName ModelKey",
                "modelFieldKey": "parentGroupNameModelKey",
                "toolTip": "Enter Parent GroupName ModelKey of this list. Based on parent value selection child value will be selected.",
                "showCondition": "this.formData['controlType'] === 'select' || this.formData['controlType'] === 'multiselect' || this.formData['controlType'] === 'select-text'"
            }
        ]
    },
    {
        "columnSize": 1,
        "fields": [
            {
                "disabled": false,
                "required": true,
                "hidden": false,
                "expanded": false,
                "controlType": "text",
                "label": "List ID model field key",
                "modelFieldKey": "itemValueKey",
                "showCondition": "!this.formData['isCustomListBinding'] && this.formData['listItemValueApi'] != null && this.formData['listItemValueApi'] != '' ",
                "dfgAttribute": "required:(this.formData['controlType'] === 'select' || this.formData['controlType'] === 'multiselect' )"
            },
            {
                "disabled": false,
                "required": true,
                "hidden": false,
                "expanded": false,
                "controlType": "text",
                "label": "List Text model field key",
                "modelFieldKey": "itemNameKey",
                "showCondition": "!this.formData['isCustomListBinding'] && this.formData['listItemValueApi'] != null && this.formData['listItemValueApi'] != '' ",
                "dfgAttribute": "required:(this.formData['controlType'] === 'select' || this.formData['controlType'] === 'multiselect')"
            },
            {
                "required": false,
                "controlType": "checkbox",
                "label": "Save to local storage",
                "modelFieldKey": "saveToLocalSorage",
                "defaultValue": true,
                "toolTip": "If true, list items will be saved to Browser's Local Storage.",
                "showCondition": "!this.formData['isCustomListBinding'] && this.formData['listItemValueApi'] != null && this.formData['listItemValueApi'] != '' ",
                "dfgAttribute": "required:(this.formData['controlType'] === 'select' || this.formData['controlType'] === 'multiselect')"
            }
        ]
    },
    {
        "columnSize": 1,
        "fields": [
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "isControlSelected": true,
                "controlType": "objectTable",
                "label": "Default Option List",
                "modelFieldKey": "defaultOptionList",
                "toolTip": "Default Option List",
                "showCondition": "(this.formData['controlType'] === 'select' || this.formData['controlType'] === 'multiselect' || this.formData['controlType'] === 'select-text')",
                "dfgAttribute": "required:(this.formData['controlType'] === 'select' || this.formData['controlType'] === 'multiselect')",
                "objectFormConfig": [
                    {
                        "columnSize": 1,
                        "fields": [
                            {
                                "disabled": false,
                                "required": false,
                                "hidden": false,
                                "controlType": "text",
                                "label": "List Item Name",
                                "modelFieldKey": "itemName",
                                "toolTip": "itemName"
                            }
                        ]
                    },
                    {
                        "columnSize": 1,
                        "fields": [
                            {
                                "disabled": false,
                                "required": true,
                                "hidden": false,
                                "controlType": "text",
                                "label": "List item ID",
                                "modelFieldKey": "id",
                                "toolTip": "List item ID"
                            },
                            {
                                "disabled": false,
                                "required": true,
                                "hidden": false,
                                "isControlSelected": true,
                                "controlType": "text",
                                "label": "Display Sequence Number",
                                "modelFieldKey": "sequenceId",
                                "toolTip": "Display Sequence Number"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "columnSize": 1,
        "fields": [
            {
                "controlType": "text",
                "modelFieldKey": "uploadUrl",
                "label": "File Upload Api",
                "toolTip": "File Upload Url",
                "required": true,
                "showCondition": "this.formData['controlType'] === 'file-upload'"
            },
            {
                "controlType": "text",
                "defaultValue": "*.*",
                "modelFieldKey": "fileSelectionFilter",
                "label": "File Selection Filter",
                "toolTip": "Filter example .xls,.xlsx",
                "required": false,
                "showCondition": "this.formData['controlType'] === 'file-upload'"
            }
        ]
    },
    {
        "columnSize": 1,
        "fields": [
            {
                "controlType": "checkbox",
                "defaultValue": "false",
                "modelFieldKey": "allowMultiple",
                "label": "Allow Multiple Upload",
                "required": false,
                "showCondition": "this.formData['controlType'] === 'file-upload'"
            },
            {
                "controlType": "checkbox",
                "defaultValue": "false",
                "modelFieldKey": "customFileUpload",
                "label": "Custom File Upload Code",
                "toolTip": "When selected, developer need to do custom code to handle file upload.",
                "required": false,
                "showCondition": "this.formData['controlType'] === 'file-upload'"
            }
        ]
    },
    {
        "columnSize": 1,
        "fields": [
            {
                "disabled": false,
                "required": true,
                "hidden": false,
                "expanded": false,
                "controlType": "text",
                "label": "Radio Button Value",
                "modelFieldKey": "radioButtonValue",
                "showCondition": "this.formData['controlType'] === 'radio'"
            },
            {
                "disabled": false,
                "required": true,
                "hidden": false,
                "expanded": false,
                "controlType": "text",
                "label": "Radio Button Group",
                "modelFieldKey": "radioButtonGroup",
                "showCondition": "this.formData['controlType'] === 'radio'"
            }
        ]
    },
    {
        "columnSize": 1,
        "fields": [
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "expanded": false,
                "controlType": "text",
                "label": "Hyperlink Template",
                "modelFieldKey": "hyperlinkTemplate",
                "showCondition": "this.formData['controlType'] === 'hyperlink' || this.formData['controlType'] === 'hyperlink-label' ",
                "dfgAttribute": "disabled: this.formData['isActionConfig'] === true"
            },
            {
                "disabled": false,
                "required": true,
                "hidden": false,
                "controlType": "objectTable",
                "label": "Hyperlink Config",
                "modelFieldKey": "hyperlinkConfig",
                "toolTip": "Hyperlink Config",
                "detailedHelpText": "Hyperlink Config",
                "defaultValue": "Hyperlink Config",
                "tableColumnVisible": false,
                "objectFormConfig": [
                    {
                        "columnSize": 1,
                        "fields": [
                            {
                                "disabled": false,
                                "required": false,
                                "hidden": false,
                                "expanded": false,
                                "controlType": "text",
                                "label": "Format Specifier",
                                "modelFieldKey": "formatSpecifier",
                                "tableColumnVisible": true
                            },
                            {
                                "disabled": false,
                                "required": false,
                                "hidden": false,
                                "expanded": false,
                                "controlType": "text",
                                "label": "Replace Value ModelKey",
                                "modelFieldKey": "replaceValueModelKey",
                                "tableColumnVisible": false
                            }
                        ]
                    }
                ],
                "showCondition": "this.formData['controlType'] === 'hyperlink' || this.formData['controlType'] === 'hyperlink-label'",
                "dfgAttribute": "disabled: this.formData['isActionConfig'] === true"
            }
        ]
    },
    {
        "columnSize": 1,
        "fields": [
            {
                "disabled": false,
                "required": true,
                "hidden": false,
                "isControlSelected": false,
                "controlType": "object",
                "label": "Action Config",
                "modelFieldKey": "actionConfig",
                "toolTip": "Action Config",
                "detailedHelpText": "Action Config",
                "defaultValue": "Search",
                "tableColumnVisible": false,
                "objectFormConfig": [
                    {
                        "columnSize": 1,
                        "fields": [
                            {
                                "disabled": false,
                                "required": true,
                                "hidden": false,
                                "isControlSelected": false,
                                "controlType": "select",
                                "label": "Action Type",
                                "modelFieldKey": "actionType",
                                "defaultValue": "search",
                                "toolTip": "Action Type",
                                "defaultOptionList": [
                                    {
                                        "itemName": "Search",
                                        "id": "search"
                                    },
                                    {
                                        "itemName": "Other",
                                        "id": "other"
                                    }
                                ]
                            },
                            {
                                "disabled": false,
                                "required": true,
                                "hidden": false,
                                "isControlSelected": false,
                                "controlType": "text",
                                "label": "Action Name",
                                "modelFieldKey": "actionName",
                                "toolTip": "Action Name Will Be Displayed on Cancel button"
                            }
                        ]
                    },
                    {
                        "columnSize": 1,
                        "fields": [
                            {
                                "disabled": false,
                                "required": true,
                                "hidden": false,
                                "isControlSelected": false,
                                "controlType": "text",
                                "label": " API URL for action",
                                "modelFieldKey": "actionApiUrl"
                            },
                            {
                                "disabled": false,
                                "required": true,
                                "hidden": false,
                                "isControlSelected": false,
                                "controlType": "select",
                                "label": "HTTP method for action",
                                "modelFieldKey": "httpMethod",
                                "defaultValue": "get",
                                "defaultOptionList": [
                                    {
                                        "itemName": "GET",
                                        "id": "get"
                                    },
                                    {
                                        "itemName": "POST",
                                        "id": "post"
                                    },
                                    {
                                        "itemName": "PUT",
                                        "id": "put"
                                    },
                                    {
                                        "itemName": "DELETE",
                                        "id": "delete"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "columnSize": 1,
                        "fields": [
                            {
                                "disabled": false,
                                "required": true,
                                "hidden": false,
                                "isControlSelected": false,
                                "controlType": "text",
                                "label": "Action Parameter Key",
                                "modelFieldKey": "actionParameterKey",
                                "showCondition": "this.formData['actionType'] !== 'search'"
                            },
                            {
                                "disabled": false,
                                "required": true,
                                "hidden": false,
                                "isControlSelected": false,
                                "controlType": "text",
                                "label": "API Action Name",
                                "modelFieldKey": "actionApiName",
                                "showCondition": "this.formData['actionType'] !== 'search'"
                            }
                        ]
                    },
                    {
                        "columnSize": 2,
                        "fields": [
                            {
                                "disabled": false,
                                "required": true,
                                "hidden": false,
                                "isControlSelected": true,
                                "controlType": "text",
                                "label": "Redirect URL",
                                "modelFieldKey": "actionRedirect",
                                "showCondition": "this.formData['actionType'] !== 'search'"
                            },
                            {
                                "disabled": false,
                                "required": true,
                                "hidden": false,
                                "isControlSelected": true,
                                "controlType": "text",
                                "label": "Action URL Parameter Key",
                                "modelFieldKey": "actionRedirectParameterKey",
                                "showCondition": "this.formData['actionType'] !== 'search'"
                            }
                        ]
                    },
                    {
                        "columnSize": 1,
                        "fields": [
                            {
                                "disabled": false,
                                "required": true,
                                "hidden": false,
                                "isControlSelected": false,
                                "controlType": "text",
                                "label": "Action Result Bind ModelKey",
                                "modelFieldKey": "actionResultBindModelKey",
                                "showCondition": "this.formData['actionType'] === 'search'"
                            }
                        ]
                    },
                    {
                        "columnSize": 1,
                        "fields": [
                            {
                                "disabled": false,
                                "required": false,
                                "hidden": false,
                                "isControlSelected": true,
                                "controlType": "text",
                                "label": "Action Description",
                                "modelFieldKey": "actionDescription"
                            }
                        ]
                    }
                ],
                "showCondition": "['button', 'hyperlink', 'hyperlink-label'].indexOf(this.formData['controlType']) !== -1"
            }
        ]
    },
    {
        "columnSize": 1,
        "fields": [
            {
                "controlType": "text",
                "modelFieldKey": "columnSpan",
                "label": "Column width %",
                "toolTip": "flex-basis is used for Column width %",
                "required": false
            },
            {
                "controlType": "text",
                "modelFieldKey": "unMaskedCharCount",
                "label": "Unmasked Characters count",
                "toolTip": "Number of unmasked characters from end",
                "defaultValue": "4",
                "required": true,
                "showCondition": "['masked'].indexOf(this.formData['controlType']) !== -1"
            }
        ]
    },
    {
        "columnSize": 1,
        "fields": [
            {
                "controlType": "text",
                "modelFieldKey": "toolTip",
                "label": "Tooltip",
                "required": false
            },
            {
                "controlType": "select",
                "modelFieldKey": "textFormat",
                "label": "Text Format",
                "required": false,
                "toolTip": "Select only applicable text format.",
                "showCondition": "this.formData['controlType'] === 'text'",
                "defaultOptionList": [
                    {
                        "id": "number",
                        "itemName": "Numbers Only"
                    },
                    {
                        "id": "currency",
                        "itemName": "Currency Only"
                    }
                ]
            }
        ]
    },
    {
        "columnSize": 1,
        "fields": [
            {
                "controlType": "text",
                "modelFieldKey": "maxLength",
                "label": "Text Max Length",
                "required": false,
                "toolTip": "Text Max Length",
                "showCondition": "this.formData['controlType'] === 'text' || this.formData['controlType'] === 'textarea'"
            },
            {
                "controlType": "text",
                "modelFieldKey": "textPrefix",
                "label": "Text Prefix",
                "required": false,
                "toolTip": "Text Prefix",
                "showCondition": "this.formData['controlType'] === 'label' || this.formData['controlType'] === 'text' || this.formData['controlType'] === 'textarea'"
            },
            {
                "controlType": "text",
                "modelFieldKey": "textSuffix",
                "label": "Text Suffix",
                "required": false,
                "toolTip": "Text Suffix",
                "showCondition": "this.formData['controlType'] === 'label' || this.formData['controlType'] === 'text' || this.formData['controlType'] === 'textarea'"
            }
        ]
    },
    {
        "columnSize": 1,
        "fields": [
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "controlType": "checkbox",
                "label": "Show Expanded Panel",
                "modelFieldKey": "expandedPanel",
                "toolTip": "Show expansion panel as expanded on load",
                "defaultValue": false,
                "showCondition": "['expansion-panel-start'].indexOf(this.formData['controlType']) !== -1"
            }
        ]
    },
    {
        "columnSize": 1,
        "fields": [
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "controlType": "textarea",
                "label": "Default Display Column Keys",
                "modelFieldKey": "defaultDisplayColumnModelFieldKeys",
                "showCondition": "['dataTable', 'customDataTable'].indexOf(this.formData['controlType']) !== -1",
                "dfgAttribute": "required:(['dataTable', 'customDataTable'].indexOf(this.formData['controlType']) !== -1)",
                "toolTip": "Add comma seperated column Model Field Keys to show default column when table loads."
            }
        ]
    },
    {
        "columnSize": 1,
        "fields": [
            {
                "disabled": false,
                "required": false,
                "hidden": false,
                "controlType": "textarea",
                "label": "Object Form Config JSON",
                "modelFieldKey": "objectFormConfig",
                "showCondition": "['object', 'objectTable', 'dataTable', 'customDataTable'].indexOf(this.formData['controlType']) !== -1",
                "dfgAttribute": "required:(['object', 'objectTable', 'dataTable', 'customDataTable'].indexOf(this.formData['controlType']) !== -1)"
            }
        ]
    }
];