import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from "../user/user.model";
import {UserService} from "../user/user.service";

@Component({
    selector: 'user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

    @Input() user: User; // propriété d'entrée du composant
    roles: Array<string>; // types possibles

    constructor(private userService: UserService,
                private router: Router) {
    }

    ngOnInit() {
        // Initialisation de la propriété types
        this.roles = ['ROLE_ADMIN', 'ROLE_USER'];
    }

    // Détermine si le type passé en paramètres appartient ou non au pokémon en cours d'édition.
    hasRole(role: string): boolean {
        let index = this.user.roles.indexOf(role);
        return !!(~index);

    }

    // Méthode appelée lorsque l'utilisateur ajoute ou retire un type au pokémon en cours d'édition.
    selectRole($event: any, role: string): void {
        let checked = $event.target.checked;
        if (checked) {
            this.user.roles.push(role);
        } else {
            let index = this.user.roles.indexOf(role);
            if (~index) {
                this.user.roles.splice(index, 1);
            }
        }
    }

    // La méthode appelée lorsque le formulaire est soumis.
    onSubmit(): void {

        this.userService.post(this.user)
            .subscribe(data => {
                let link = ['/users'];
                this.router.navigate(link);
            });


    }

}