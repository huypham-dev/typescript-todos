import { State } from './enums';

interface ITodo {
    id: number;
    name: string;
    description: string;
    state: State;
}

export class Todo implements ITodo {
    id: number;
    name: string;
    description: string;
    state: State;
    constructor(id: number, name: string, description: string, state: State) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.state = state;
    }
}