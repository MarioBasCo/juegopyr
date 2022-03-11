import { AbstractControl } from '@angular/forms'


export class AgeValidation {
    static isOlder(control: AbstractControl) {
        const fecha = control.value;

        if (fecha.length < 10) {
            return;
        }

        const fechaUI = new Date(fecha);
        const hoy = new Date();
        let anioNaci = fechaUI.getFullYear();
        let mesNaci = fechaUI.getMonth() + 1;
        let diaNaci = fechaUI.getDate();
        let anioActual = hoy.getFullYear();
        let mesActual = hoy.getMonth() + 1;
        let diaActual = hoy.getDate();

        let edad = anioActual - anioNaci;
        if (mesActual < mesNaci) {
            edad--;
        } else if (mesActual == mesNaci) {
            if (diaActual < diaNaci) {
                edad--;
            }
        }

        if (edad >= 18) {
            return null;
        } else {
            return { isOlder: true };
        }
    }
}