import {Business} from '../business/business.model';
export class User {
    constructor(public id, public username: string, public firstname: string, public lastname: string, public business: Business[]) {

    }
}