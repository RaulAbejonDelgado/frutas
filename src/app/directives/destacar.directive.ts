import { Directive } from '@angular/core';

@Directive({
  selector: '[destacar]'
})
export class DestacarDirective {

  constructor() {

    console.trace("DestacarDirective - constructor");
   }

}
