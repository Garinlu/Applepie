import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'userRoleColor'
})
export class UserRoleColorPipe implements PipeTransform {

    transform(value: string): string {
        let color: string;
        switch (value) {
            case 'administrateur':
                color = '#db2828';
                break;
            case 'utilisateur':
                color = '#1b95e0';
                break;
            default:
                color = 'grey';
                break;
        }

        return color;

    }
}