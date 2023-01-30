import { Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[pkmnBorderCard]'
})
export class BorderCardDirective {

  private initialColor : string = '#f5f5f5';
  private defaultColor: string = '#009688';
  private defaultHeight : number = 180;


  constructor(private el : ElementRef){
    this.setBorder(this.initialColor);
    this.setHeight(this.defaultHeight);
  
  }
  @Input('pkmnBorderCard') borderColor? : string;


  @HostListener('mouseenter') onMouseEnter(){
    this.setBorder(this.borderColor||this.defaultColor );
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.setBorder(this.initialColor);
  }
//Methode pour que chaque card aient la même huateur 
  private setHeight(height: number){
    this.el.nativeElement.style.height= height + 'px';
  }
  //Methode pour rajouter une bordure verte lorsque l'utilisateur est sur la card
  private setBorder(color:string){
    let border = 'solid 4px' + color;
    this.el.nativeElement.style.border= border;
  }
}
