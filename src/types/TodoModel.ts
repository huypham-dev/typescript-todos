import { State } from './Enums';

interface ITodo {
    id: number;
    name: string;
    state: State;
}

export class Todo implements ITodo {
    id: number;
    name: string;
    state: State;
    constructor(id: number, name: string, state: State = State.Active) {
        this.id = id;
        this.name = name;
        this.state = state;
    }
}