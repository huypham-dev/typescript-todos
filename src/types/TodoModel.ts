import { State } from './Enums';

interface ITodo {
    id: string;
    name: string;
    state: State;
}

export class Todo implements ITodo {
    id: string;
    name: string;
    state: State;
    constructor(id: string, name: string, state: State = State.Active) {
        this.id = id;
        this.name = name;
        this.state = state;
    }
}