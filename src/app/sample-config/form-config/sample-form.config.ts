export const sampleFormConfig = [
{
      "columnSize": 1,
      "fields": [
          {
              "controlType": "seperator",
              "defaultValue": "Basic Details",
              "disabled": false,
              "required": true,
              "hidden": false,
              "showCondition": null,
              "dfgAttribute": "",
              "dfgEvents": null,
              "dfgClass": "",
              "isControlSelected": false,
              "label": "Part I Identification of Beneficial Owner",
              "modelFieldKey": null,
              "toolTip": null
          }
      ]
  },
  {
      "columnSize": 2,
      "fields": [
          {
              "controlType": "text",
              "modelFieldKey": "field1",
              "label": "Name of individual who is the beneficial owner",
              "cssClass": "form-label",
              "toolTip": "Name of individual who is the beneficial owner",
              "defaultValue": "test",
              "placeholder": "CheckBox",
              "disabled": false,
              "required": true,
              "hidden": false,
              "showCondition": null,
              "dfgAttribute": "",
              "dfgEvents": null,
              "dfgClass": "",
              "isControlSelected": false
          },
          {
              "controlType": "select",
              "modelFieldKey": "countryOfCitizenship",
              "label": "Country of citizenship",
              "toolTip": "Country of citizenship",
              "defaultValue": "testBtn",
              "placeholder": "Button",
              "disabled": false,
              "required": true,
              "hidden": false,
              "showCondition": null,
              "dfgAttribute": "",
              "dfgEvents": null,
              "dfgClass": "",
              "isControlSelected": false
          }
      ]
  },
  {
      "columnSize": 2,
      "fields": [
          {
              "controlType": "text",
              "modelFieldKey": "textarea",
              "label": "Permanent residence address (street, apt. or suite no., or rural route). Do not use a P.O. box or in-care-of address. ",
              "cssClass": "form-label",
              "toolTip": "Permanent residence address (street, apt. or suite no., or rural route). Do not use a P.O. box or in-care-of address. ",
              "defaultValue": "textarea",
              "placeholder": "textarea",
              "disabled": false,
              "required": true,
              "hidden": false,
              "showCondition": null,
              "dfgAttribute": "",
              "dfgEvents": null,
              "dfgClass": "",
              "isControlSelected": false
          }
      ]
  },
  {
      "columnSize": 2,
      "fields": [
          {
              "controlType": "text",
              "modelFieldKey": "firstName",
              "label": "City or town, state or province. Include postal code where appropriate. ",
              "cssClass": "form-control",
              "toolTip": "City or town, state or province. Include postal code where appropriate. ",
              "defaultValue": "test",
              "placeholder": "First Name",
              "disabled": false,
              "required": true,
              "hidden": false,
              "showCondition": null,
              "dfgAttribute": "",
              "dfgEvents": null,
              "dfgClass": "",
              "isControlSelected": false
          },
          {
              "controlType": "select",
              "modelFieldKey": "checkBox",
              "label": "Country",
              "cssClass": "form-label",
              "toolTip": "Country",
              "defaultValue": "test",
              "placeholder": "CheckBox",
              "disabled": false,
              "required": true,
              "hidden": false,
              "showCondition": null,
              "dfgAttribute": "",
              "dfgEvents": null,
              "dfgClass": "",
              "isControlSelected": false
          }
      ]
  },
  {
      "columnSize": 1,
      "fields": [
          {
              "label": "Mailing address (if different from above) ",
              "controlType": "text",
              "modelFieldKey": "select",
              "defaultOption": "someOpt",
              "defaultOptionList": [
                  {
                      "id": 1,
                      "itemName": "option1"
                  },
                  {
                      "id": 2,
                      "itemName": "gnsdlovn"
                  },
                  {
                      "id": 3,
                      "itemName": "option3"
                  }
              ],
              "isControlSelected": false,
              "toolTip": "Mailing address (if different from above) "
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
              "label": "City or town, state or province. Include postal code where appropriate. ",
              "modelFieldKey": "newField",
              "toolTip": "City or town, state or province. Include postal code where appropriate. "
          },
          {
              "controlType": "select",
              "modelFieldKey": "select",
              "defaultOption": "someOpt",
              "defaultOptionList": [
                  {
                      "id": 1,
                      "itemName": "option1"
                  },
                  {
                      "id": 2,
                      "itemName": "gnsdlovn"
                  },
                  {
                      "id": 3,
                      "itemName": "option3"
                  }
              ],
              "isControlSelected": true,
              "label": "Country",
              "toolTip": "Country"
          }
      ]
  }
];

