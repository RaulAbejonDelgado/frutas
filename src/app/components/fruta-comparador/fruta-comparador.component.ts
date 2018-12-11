import { Component, OnInit } from '@angular/core';
import { FrutaService } from '../../provider/frutas.service';
import { Frutas } from 'src/app/model/fruta';
import { NgForm } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-fruta-comparador',
  templateUrl: './fruta-comparador.component.html',
  styleUrls: ['./fruta-comparador.component.scss']
})
export class FrutaComparadorComponent implements OnInit {
  arrayFrutas : Frutas[];
  arrayFrutasOferta : Frutas [];
  frutasOferta : boolean;
  frutaSeleccionada : Frutas;
  frutaSeleccionada2 : Frutas;
  carrito : Frutas[];
  totalPrecioFrutasClickados : number;
  textoBusqueda:string;
  mostrarResultadoBusqueda: boolean;

  constructor(private frutasService: FrutaService) { 
    this.textoBusqueda = "";
    this.mostrarResultadoBusqueda = false;
    this.frutasOferta = false;
    this.arrayFrutasOferta = [];
    this.frutaSeleccionada = new Frutas();
    this.frutaSeleccionada2 = new Frutas();
    this.totalPrecioFrutasClickados = 0;
    this.carrito = [];
    this.getAllFrutas();
  }

  ngOnInit() {
  }

  getAllFrutas(){
    this.frutasService.getAll().subscribe(data => {
      this.arrayFrutas = data;
      this.frutaSeleccionada = this.arrayFrutas[0];
      this.frutaSeleccionada2 = this.arrayFrutas[1];

    })
    this.frutasOferta = false;
  }

  
  frutasOfertas(){
    this.arrayFrutasOferta = [];

    for(let fruta of this.arrayFrutas){
      if(fruta.oferta == true){
        this.arrayFrutasOferta.push(fruta);
        this.frutasOferta = true;
      }
    }
    
  }


  mostrarFrutas(frutaSelecionada: Frutas){

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
      //this.carrito[indice].cantidad += 1;
      this.carrito[indice].total = frutaClick.cantidad * frutaClick.precio;
    } else {

      this.totalPrecioFrutasClickados += frutaClick.precio;
      console.log(frutaClick.precio);
      //frutaClick.cantidad += 1;
      frutaClick.total = frutaClick.cantidad * frutaClick.precio;
      this.carrito.push(frutaClick);
    }
  }

  sumarUno(fruta: Frutas) {

    fruta.cantidad += 1;
    fruta.total = fruta.precio * fruta.cantidad;
    this.totalPrecioFrutasClickados += fruta.precio;

  }

  restarUno(fruta: Frutas) {
    if (fruta.cantidad <= 0) {
      this.carrito.forEach(data => {
      })
      alert("La cantidad del producto esta en 0 por lo que no puede segir restando productos");
    } else {
      fruta.cantidad -= 1;
      fruta.total -= fruta.precio ;
      this.totalPrecioFrutasClickados -= fruta.precio;
      
    }


  }


  buscarTexto(buscarTexto:NgForm){


     for(let fruta of this.arrayFrutas){
        console.log(fruta.nombre.toLowerCase()) +" - "+ buscarTexto.value.textoBusqueda.toLowerCase();
        if(fruta.nombre.toLowerCase() === buscarTexto.value.textoBusqueda.toLowerCase() ){
          this.frutaSeleccionada = fruta;
          this.mostrarResultadoBusqueda = true;


        }
     }
     if(buscarTexto.value.textoBusqueda ==''){
        console.log("campos Vacio");
        this.mostrarResultadoBusqueda = false;
     }
    

    

  }




}
