import { AbstractControl } from '@angular/forms'

export class YearValidation {
    static isValidYear(control: AbstractControl) {
        const fecha = control.value;

        if (fecha.length < 10) {
            return;
        }

        const fechaUI = new Date(fecha);
        const hoy = new Date();
        let anioNaci = fechaUI.getFullYear();
        let anioActual = hoy.getFullYear();

        let edad = anioActual - anioNaci;

        if (edad < 0 || edad > 100) {
            return { isValidYear: true };
        } else {
            return null;
        }
    }
}