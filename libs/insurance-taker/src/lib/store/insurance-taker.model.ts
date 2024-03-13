import { formField } from "../lib"

export class InsuranceTakerModel {
  firstName = formField('', { name: 'firstName', disabled: false, label: 'First name' })
  lastName = formField('', { name: 'lastName', disabled: false, label: 'Last name' })
}
