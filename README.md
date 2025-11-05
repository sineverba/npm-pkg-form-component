Form Component
==============

> NPM package to get a form component.

| CI / CD | Status |
| ------- | ------ |
| NPM | [![npm version](https://badge.fury.io/js/@sineverba%2fform-component.svg)](https://badge.fury.io/js/@sineverba%2fform-component) |
| Semaphore CI | [![Build Status](https://sineverba.semaphoreci.com/badges/npm-pkg-form-component/branches/master.svg)](https://sineverba.semaphoreci.com/projects/npm-pkg-form-component) |
| Circle CI | [![CircleCI](https://circleci.com/gh/sineverba/npm-pkg-form-component.svg?style=svg)](https://circleci.com/gh/sineverba/npm-pkg-form-component) |
| Coverall | [![Coverage Status](https://coveralls.io/repos/github/sineverba/npm-pkg-form-component/badge.svg?branch=master)](https://coveralls.io/github/sineverba/npm-pkg-form-component?branch=master) |
| SonarCloud | [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=npm-pkg-form-component&metric=alert_status)](https://sonarcloud.io/dashboard?id=npm-pkg-form-component) |

`form-component` returns a Form component, based on input props. It works on `Next` Framework.

## Requirements

- Node.js >= 18.0.0

## Installation
```bash
npm install @sineverba/form-component
```

## Usage
```javascript
const fieldExample = {
  id: "inputId",
  type: "select",
  label: "Select an option",
  name: "fieldName",
  onKeyDownRegex: "/^[a-zA-Z0-9]+$/",
  initialOption: { value: "initial", label: "Please select" },
  options: [
    { value: "value1", label: "Option 1" },
    { value: "value2", label: "Option 2" }
  ],
  defaultValue: "A default value",
  onChange: (e) => console.log(e.target.value)
};

<FormComponent field={fieldExample} />
```

## Field Configuration

| Key            | Type                                                  | Required | Description |
|----------------|-------------------------------------------------------|----------|-------------|
| id             | string                                                | Y        | Unique identifier for the field |
| type           | "select" / "checkbox" / "textarea" / "text" / "password" / "number" | Y | Type of input field |
| name           | string                                                | Y        | Name attribute for the field |
| label          | string                                                | N        | Label text for the field |
| onKeyDownRegex | string                                                | N        | Regex pattern to validate key press events (text inputs only) |
| onChange       | function                                              | N        | Change event handler for checkbox and textarea |
| initialOption  | { value: string, label: string }                     | N        | Initial option for select fields |
| options        | Array<{ value: string, label: string }>              | N        | Options array for select fields |
| value          | string / number                                      | N        | Controlled value for select fields |
| textAreaRows   | number                                                | N        | Number of rows for textarea |
| textAreaCols   | number                                                | N        | Number of columns for textarea |
| defaultValue   | string / number                                      | N        | Default value for textarea or input number |
| placeholder    | string                                                | N        | Placeholder text for textarea |

## Styling

- `textarea` has a className `textarea-fcta`