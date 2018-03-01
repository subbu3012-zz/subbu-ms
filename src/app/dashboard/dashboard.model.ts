export class Customer {
    $key: string;
    name: string;
    age: number;
    active: boolean = true;
}

export class Employee {
    $key: string;
    name: string;
    position: string;
    office: string;
    salary: number;
}

export class Note {
    $key: string;
    noteDesc: string;
    updatedTime: Date;
}