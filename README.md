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


## Installation
`npm install @sineverba/form-component`

## Usage

```js
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
  ]
};

<FormComponent field={fieldExample} />
```

| Key of field   | Permitted values                                      | Required |
|----------------|-------------------------------------------------------|----------|
| id             | "inputId"                                             | Y       |
| type           | "select", "checkbox", "textarea", "text"             | Y       |
| label          | "Select an option", "Agree to terms"                 | N       |
| name           | "fieldName"                                           | Y       |
| onKeyDownRegex | "/^[a-zA-Z0-9]+$/"                                    | N       |
| onChange | props.onChange props for `checkbox` type | N |
| initialOption  | { value: "initial", label: "Please select" }         | N       |
| options        | [{ value: "value1", label: "Option 1" },<br>{ value: "value2", label: "Option 2" }] | N       |

