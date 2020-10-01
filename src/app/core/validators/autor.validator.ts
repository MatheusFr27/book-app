import {Injectable} from '@angular/core'
import {AsyncValidatorFn} from '@angular/forms'
import {map, debounceTime, distinctUntilChanged, switchMap, first} from 'rxjs/operators'
import {AutorsService} from './../services/autors.service'

@Injectable({
    providedIn: 'root'
})
export class AutorValidator {

    constructor (
        private autorsService: AutorsService
    ) {}

    validatorUniqueAutorName(): AsyncValidatorFn {
        return control => control.valueChanges
        .pipe(
            debounceTime(400),
            distinctUntilChanged(),
            switchMap(value => this.autorsService.validatorUniqueAutorName(value)),
            map((response) => {
                if (response['data'] == 0 && control.value != null && control.value != ''){
                    return null
                } else {
                    return {'autorNameAlreadyExists': true}
                }
            }),
            first()
        )
    }
}