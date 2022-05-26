export class Todo{
  public id: number;
  public content: string;
  public title: string;
  public state: State;
}

export enum State{
  TODO = 'TODO', PROGRESS = 'PROGRESS', DONE = 'DONE'
}

export namespace State {
    export function valueOf(state: State): number {
        if(state === State.TODO){
          return 0;
        }

        if(state === State.PROGRESS){
          return 1;
        }

        if(state === State.DONE){
          return 2;
        }

        return -1;
    }
}

