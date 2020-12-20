"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}
function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFunc = originalMethod.bind(this);
            return boundFunc;
        }
    };
    return adjDescriptor;
}
class Project {
    constructor() {
        this.projectTemplate = document.getElementById('project-input');
        this.projectDiv = document.getElementById('app');
        const importedNode = document.importNode(this.projectTemplate.content, true);
        this.projectForm = importedNode.firstElementChild;
        this.projectForm.id = 'user-input';
        this.titleInputElement = this.projectForm.querySelector("#title");
        this.descriptionInputElement = this.projectForm.querySelector("#description");
        this.peopleInputElement = this.projectForm.querySelector("#people");
        this.configure();
        this.diplayDiv();
    }
    diplayDiv() {
        this.projectDiv.insertAdjacentElement('afterbegin', this.projectForm);
    }
    gatherUserInput() {
        const eneteredTitle = this.titleInputElement.value;
        const eneteredDescription = this.descriptionInputElement.value;
        const eneteredPeople = this.peopleInputElement.value;
        const titleValidate = {
            value: eneteredTitle,
            required: true,
        };
        const descriptionValidate = {
            value: eneteredTitle,
            required: true,
            minLength: 5,
        };
        const peopleValidate = {
            value: eneteredTitle,
            required: true,
            min: 1,
            max: 5,
        };
        if (!validate(titleValidate) ||
            !validate(descriptionValidate) ||
            !validate(peopleValidate)) {
            alert("Please enter a value");
            return;
        }
        else {
            return [eneteredTitle, eneteredDescription, +eneteredPeople];
        }
    }
    clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [eneteredTitle, eneteredDescription, eneteredPeople] = userInput;
            console.log(eneteredTitle, eneteredDescription, eneteredPeople);
        }
        this.clearInputs();
    }
    configure() {
        this.projectForm.addEventListener('submit', this.submitHandler);
    }
}
__decorate([
    autobind
], Project.prototype, "submitHandler", null);
let projectInput = new Project();
//# sourceMappingURL=app.js.map