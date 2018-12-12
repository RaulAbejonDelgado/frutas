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
  mostrarCarritoOk : boolean;

  constructor(private frutasService: FrutaService) { 
    this.mostrarCarritoOk = true;
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
    console.log(frutaClick);
    if (indice != -1) {
      if(frutaClick.oferta == true && frutaClick.descuento > 0,99){ //descuento
        let precioDescuento = this.calcularDescuento(frutaClick);

        this.totalPrecioFrutasClickados += precioDescuento;
        this.carrito[indice].cantidad += 1;
        this.carrito[indice].total = frutaClick.cantidad * precioDescuento;

      }else{//operacion normal en la primera vez que se añade una fruta al carrito
        this.totalPrecioFrutasClickados += frutaClick.precio;
        this.carrito[indice].cantidad += 1;
        this.carrito[indice].total = frutaClick.cantidad * frutaClick.precio;
      }

    } else { //fruta ya existente en el carro
        //si tiene descuento y esta en oferta
        if(frutaClick.oferta == true && frutaClick.descuento > 0,99){
          let precioDescuento = this.calcularDescuento(frutaClick);
          this.totalPrecioFrutasClickados += precioDescuento;
          frutaClick.cantidad += 1;
          frutaClick.total = frutaClick.cantidad * precioDescuento;
          this.carrito.push(frutaClick);
        }else{//si no tiene descuento y no tiene oferta
          this.totalPrecioFrutasClickados += frutaClick.precio;
          frutaClick.cantidad += 1;
          frutaClick.total = frutaClick.cantidad * frutaClick.precio;
        }
      
    }
  }

  sumarUno(fruta: Frutas) {

    if(fruta.oferta == true && fruta.descuento > 0.99){

      let precioDescuento = this.calcularDescuento(fruta);
      fruta.cantidad += 1;
      fruta.total = precioDescuento * fruta.cantidad;
      this.totalPrecioFrutasClickados += fruta.precio;

    }else{

      fruta.cantidad += 1;
      fruta.total = fruta.precio * fruta.cantidad;
      this.totalPrecioFrutasClickados += fruta.precio;

    }


    

  }

  restarUno(fruta: Frutas, indice:number) {
    if (fruta.cantidad <= 1) {

      alert("La cantidad del producto pasaria a estar a 0 por lo que no puede segir restando productos, si desea eliminar el producto pulse la papelera");
      //this.reActualizarCarrito();
    } else {
      if(fruta.oferta == true && fruta.descuento > 0.99){
        let precioDescuento = this.calcularDescuento(fruta);
        fruta.cantidad -= 1;
        fruta.total -= precioDescuento ;
        this.totalPrecioFrutasClickados -= precioDescuento;
      }else{
        fruta.cantidad -= 1;
        fruta.total -= fruta.precio ;
        this.totalPrecioFrutasClickados -= fruta.precio;
      }
      
      
    }


  }

  eliminarFrutaCarrito(indice:number){
    let fruta = this.carrito[indice];
    
    if (fruta.oferta == true && fruta.descuento > 0){
      let precioDescuento = this.calcularDescuento(fruta);
      this.totalPrecioFrutasClickados -= fruta.cantidad * precioDescuento ;
      
     
    }else{
      //actualizamos los valores del carrito antes de eliminar el item
      this.totalPrecioFrutasClickados -=  fruta.cantidad * fruta.precio;

    }
    
    this.carrito.splice(indice,1); // eliminamos la fruta del carrito
    fruta.cantidad = 0; // ponemos a 0 el contador de frutas
    
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

  mostrarCarrito(){
    let carrito = document.getElementById('carrito');
    if(carrito.style.display === 'block'){
      carrito.style.display = 'none';
    }else{
      carrito.style.display = 'block';
    }

  }

  calcularDescuento(frutaClick: Frutas) : number{
    if(frutaClick.oferta == true && frutaClick.descuento > 0,99){ //descuento
      let descuento = (frutaClick.descuento / 100);
      let precioDescuento = frutaClick.precio - (descuento * frutaClick.precio) ;
      return precioDescuento;
    }else{
      return frutaClick.precio;
    }

  }




}
