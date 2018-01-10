export class User {
    constructor(public id: number, public username: string, public firstname: string, public lastname: string,
                public roles: Array<string>, public gender: string, public phone:string) {

    }
}