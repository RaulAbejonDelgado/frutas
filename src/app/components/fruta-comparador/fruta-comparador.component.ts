import { Component, OnInit } from '@angular/core';
import { FrutaService } from '../../provider/frutas.service';
import { Frutas } from 'src/app/model/fruta';

@Component({
  selector: 'app-fruta-comparador',
  templateUrl: './fruta-comparador.component.html',
  styleUrls: ['./fruta-comparador.component.scss']
})
export class FrutaComparadorComponent implements OnInit {
  arrayFrutas : Frutas[];
  frutaSeleccionada : Frutas;
  frutaSeleccionada2 : Frutas;
  carrito : Frutas[];
  totalPrecioFrutasClickados : number;

  constructor(private frutasService: FrutaService) { 
    this.frutaSeleccionada = new Frutas();
    this.frutaSeleccionada2 = new Frutas();
    this.carrito = [];
    this.getAllFrutas();
  }

  ngOnInit() {
  }

  getAllFrutas(){
    this.frutasService.getAll().subscribe(data => {
      this.arrayFrutas = data;
    })
  }


  mostrarFrutas(frutaSelecionada: Frutas){
    // console.log("FrutaComparadorComponent - mostrarFrutas %o", frutaSelecionada)
    // this.frutaSeleccionada = frutaSelecionada;
    this.frutaSeleccionada2 = this.frutaSeleccionada
    this.frutaSeleccionada = frutaSelecionada;

  }

  actualizarCarrito(event: Event) {

    console.debug('SelectorJuegosComponent actualizarCarro Recivimos evento de componente hijo');
    console.log(event);
    let frutaClick = event['frutaClick'];
    let indice = this.carrito.indexOf(frutaClick);
    let f = this.carrito.find(f => f.nombre === frutaClick.nombre);
    if (indice != -1) {
      this.totalPrecioFrutasClickados += frutaClick.precio;
      console.log(frutaClick.precio);
      this.carrito[indice].cantidad += 1;
      this.carrito[indice].total = frutaClick.cantidad * frutaClick.precio;
    } else {

      this.totalPrecioFrutasClickados += frutaClick.precio;
      console.log(frutaClick.precio);
      frutaClick.cantidad += 1;
      frutaClick.total = frutaClick.cantidad * frutaClick.precio;
      this.carrito.push(frutaClick);
    }
  }



}
