import { Directive, ElementRef, OnInit, AfterViewInit } from '@angular/core';
declare var $: any;


@Directive({
  selector: '[appDropdownInit]'
})
export class DropdownInitDirective implements AfterViewInit {

  constructor(private element: ElementRef) {
   }

  ngAfterViewInit(): void {
    $('.ui.dropdown').dropdown();
  }

}
