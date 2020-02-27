import { Directive, ElementRef, OnInit, AfterViewInit } from '@angular/core';
//declare var $: any;
import * as $ from 'jquery/dist/jquery';

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
