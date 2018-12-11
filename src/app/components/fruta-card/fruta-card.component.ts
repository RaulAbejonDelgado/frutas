import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Frutas } from '../../model/fruta';

@Component({
  selector: 'app-fruta-card',
  templateUrl: './fruta-card.component.html',
  styleUrls: ['./fruta-card.component.scss']
})
export class FrutaCardComponent implements OnInit {


  private _objeto: Frutas;
  @Input('_objeto')

  
  public get objeto(): Frutas {
    return this._objeto;
  }
  public set objeto(value: Frutas) {
    if(value){
      this._objeto = value;
    }else{
      this._objeto = new Frutas();
    } 
  }

  //Registramos evento de salida
  @Output() clickCompra = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  comprar() {
    console.trace('FrutaCardComponent comprar');
    //alert(`Lo sentimos pero de momento detemos esta opcion deshabilitada ## ${this.juego.titulo} ## `);

    // Emitimos eventos al componente padre y enviamos parametro 'frutaClick'
    this.clickCompra.emit( { frutaClick : this._objeto } );

  }

}
