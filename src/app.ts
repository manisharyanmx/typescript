//interface for Validation
interface Validate{
    value: string|number;
    required: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validatableInput : Validate){
    let isValid = true;
    if(validatableInput.required){
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if(validatableInput.minLength != null && typeof validatableInput.value === 'string'){
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if(validatableInput.maxLength != null && typeof validatableInput.value === 'string'){
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if(validatableInput.min != null && typeof validatableInput.value === 'number' ){
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if(validatableInput.max != null && typeof validatableInput.value === 'number' ){
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}

//autobind decorator
function autobind(_:any, _2:string, descriptor:PropertyDescriptor){
    const originalMethod = descriptor.value;
    const adjDescriptor : PropertyDescriptor = {
        configurable : true,
        get(){
            const boundFunc = originalMethod.bind(this);
            return boundFunc;
        }
    }
    return adjDescriptor;
}

class Project {

    projectTemplate : HTMLTemplateElement;
    projectDiv : HTMLDivElement;
    projectForm : HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor(){
        this.projectTemplate = document.getElementById('project-input')! as HTMLTemplateElement;
        this.projectDiv = document.getElementById('app')! as HTMLDivElement;
        const importedNode = document.importNode(this.projectTemplate.content,true);
        this.projectForm = importedNode.firstElementChild as HTMLFormElement;
        this.projectForm.id = 'user-input';
        this.titleInputElement = this.projectForm.querySelector("#title") as HTMLInputElement;
        this.descriptionInputElement = this.projectForm.querySelector("#description") as HTMLInputElement;
        this.peopleInputElement = this.projectForm.querySelector("#people") as HTMLInputElement;
        this.configure();
        this.diplayDiv();
    }
    
    private diplayDiv() {
        this.projectDiv.insertAdjacentElement('afterbegin',this.projectForm);
    }

    private gatherUserInput() : [string,string,number]|void {

        const eneteredTitle = this.titleInputElement.value;
        const eneteredDescription = this.descriptionInputElement.value;
        const eneteredPeople = this.peopleInputElement.value;

        const titleValidate : Validate = {
            value : eneteredTitle,
            required : true,
        }
        const descriptionValidate : Validate = {
            value : eneteredTitle,
            required : true,
            minLength : 5,
        }
        const peopleValidate : Validate = {
            value : eneteredTitle,
            required : true,
            min:1,
            max:5,
        }

        if( !validate(titleValidate) ||
            !validate(descriptionValidate) || 
            !validate(peopleValidate)){
            alert("Please enter a value");
            return;
        }
        else {
            return [eneteredTitle, eneteredDescription, +eneteredPeople];
        }
    }

    private clearInputs(){
        this.titleInputElement.value = '';
        this.descriptionInputElement.value ='';
        this.peopleInputElement.value ='';
    }
    @autobind
    private submitHandler(event:Event){
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if(Array.isArray(userInput)){
            const [eneteredTitle,eneteredDescription, eneteredPeople] = userInput;
            console.log(eneteredTitle,eneteredDescription,eneteredPeople);
        }
        this.clearInputs();
    }

    private configure(){
        this.projectForm.addEventListener('submit',this.submitHandler);
    }

    
    
}
let projectInput = new Project();