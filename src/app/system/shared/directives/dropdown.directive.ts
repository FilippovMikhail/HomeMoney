import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor() {
  }

  @HostBinding('class.open') isOpen = false;

/*  @HostListener('mouseenter') onMouseEnter(){
    this.isOpen = !this.isOpen;
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.isOpen = !this.isOpen;
  }*/

  @HostListener('click') onClick(){
    this.isOpen = !this.isOpen;
  }
}
