import { Route } from '@angular/router';
import { Basic } from './basic/basic'
import { CheckboxRadio } from './checkbox-radio/checkbox-radio'
import { Choices } from './choices/choices'
import { Clipboard } from './clipboard/clipboard'
import { Flatepicker } from './flatepicker/flatepicker'
import { Validation } from './validation/validation'
import { Wizard } from './wizard/wizard'
import { Fileuploads } from './fileuploads/fileuploads'
import { Editors } from './editors/editors'
import { InputMask } from './input-mask/input-mask'
import { RangeSlider } from './range-slider/range-slider'

export const FORMS_ROUTES: Route[] = [
  {
    path: 'basic',
    component: Basic,
    data: { title: 'Form Basic Element' },
  },
  {
    path: 'checkbox-radio',
    component: CheckboxRadio,
    data: { title: 'Checkbox & Radio' },
  },
  {
    path: 'choices',
    component: Choices,
    data: { title: 'Form Select' },
  },
  {
    path: 'clipboard',
    component: Clipboard,
    data: { title: 'Clipboard' },
  },
  {
    path: 'flatepicker',
    component: Flatepicker,
    data: { title: 'Flatepicker' },
  },
  {
    path: 'validation',
    component: Validation,
    data: { title: 'Form Validation' },
  },
  {
    path: 'wizard',
    component: Wizard,
    data: { title: 'Wizard' },
  },
  {
    path: 'fileuploads',
    component: Fileuploads,
    data: { title: 'File Uploads' },
  },
  {
    path: 'editors',
    component: Editors,
    data: { title: 'Editors' },
  },
  {
    path: 'input-mask',
    component: InputMask,
    data: { title: 'Input Mask' },
  },
  {
    path: 'range-slider',
    component: RangeSlider,
    data: { title: 'Range Slider' },
  },
];
