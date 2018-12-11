import { Component, OnInit, Input } from '@angular/core';
import { Frutas } from 'src/app/model/fruta';
import { FormGroup, FormControl, Validators, FormArray } from '../../../../node_modules/@angular/forms';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { FrutaService } from '../../provider/frutas.service';

@Component({
  selector: 'app-fruta-editable',
  templateUrl: './fruta-editable.component.html',
  styleUrls: ['./fruta-editable.component.scss']
})
export class FrutaEditableComponent implements OnInit {

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

  id: number;
  formulario : FormGroup;
  color : FormControl;
  colorNuevo : FormControl;
  frutaEditable : Frutas;
  

  constructor(private route: ActivatedRoute,public frutaService : FrutaService) {
    this.frutaEditable = new Frutas();
    this.color= new FormControl();
    this.colorNuevo = new FormControl();
    this.formulario = new FormGroup({
      id : new FormControl(),
      nombre : new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(45)]),
      precio : new FormControl(0,[Validators.required,Validators.minLength(1),Validators.maxLength(5)]),
      calorias : new FormControl(0,[Validators.required,Validators.minLength(0)]),
      colores: new FormArray([this.crearColorFormGroup()]),// quito para que inicialmente solo aparezca un campo color al inicializarse, this.crearColorFormGroup(),
      oferta : new FormControl(false),
      descuento : new FormControl(0),
      imagen: new FormControl('https://picsum.photos/300/300/?random', [ Validators.required, Validators.pattern('^(http(s?):\/\/).+(\(.png|.jpg|j.peg|random))$')]),
      coloresNuevos : new FormArray([ ])
    })
      
      
   }

  ngOnInit() {
    console.trace("CardComponent -ngOnInit")
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      // llamar provider para conseguir datos a traves del id
      this.obtenerPorId(this.id);
    });
    
  }
  

  cargarFormualario(){
    
    console.log(this._objeto);
    console.log(this.formulario);
    //this.formulario.setValue(this._objeto);
    // console.log(this.formulario.value);
    this.formulario.controls.nombre.setValue(this._objeto.nombre);
    this.formulario.controls.precio.setValue(this._objeto.precio);
    this.formulario.controls.oferta.setValue(this._objeto.oferta);
    this.formulario.controls.calorias.setValue(this._objeto.calorias);
    this.formulario.controls.descuento.setValue(this._objeto.descuento);
    this.formulario.controls.imagen.setValue(this._objeto.imagen);
    //this.formulario.controls.nombre.setValue(this._objeto.nombre);
    console.log(this.formulario);
    
    
  }

  obtenerPorId(id:number){
    this.frutaService.obtenerFrutaPorId(id).subscribe(data =>{
      this._objeto = data;
      this.cargarFormualario();
    });

  }

  crearColorExistenteFormGroup():FormArray{
    let arraycolores = this.formulario.get('colores2') as FormArray;
    
    this.objeto.colores.forEach(colort => {
      
       
      //this.formulario.setValue(new FormGroup({  color: new FormControl(colort)}));
      arraycolores.push(new FormGroup({  color: new FormControl(colort)}));
    })
    return arraycolores;

  }

  crearColorFormGroup(): FormGroup{
    //console.log(this._objeto.colores);
   
    console.log(this.color.value);
    return new FormGroup({
                
                color: new FormControl(this.colorNuevo.value)
        });
  }


  nuevoColor(){    
    let arrayColores = this.formulario.get('coloresNuevos') as FormArray;
    let arrayObjetoColores = this._objeto.colores;
    console.log(arrayColores);
    console.log(this._objeto.colores);
    console.log(this.colorNuevo);

    arrayColores.push(new FormGroup({color: new FormControl(this.colorNuevo.value)}));
  }

  eliminarColorExistente(index:number){
    let arrayColores = this.formulario.get('coloresNuevos') as FormArray;
    if ( this.objeto.colores.length > 0 ){
      this.objeto.colores.splice(index, 1);
      console.log(this.objeto.colores);
    }
    //this.getColores();  
  }

  eliminarColorNuevo( index: number){
    let arrayColores = this.formulario.get('coloresNuevos') as FormArray;
    if ( arrayColores.length > 0 ){
      arrayColores.removeAt(index);
    }  
  }

  actualizar(){
    console.log("modificar - sumitar %o",  this.formulario);
    //let fruta = new Frutas();

    this.frutaEditable.id = this.id;
    this.frutaEditable.nombre = this.formulario.controls.nombre.value;
    this.frutaEditable.precio = this.formulario.controls.precio.value;
    this.frutaEditable.calorias = this.formulario.controls.calorias.value;
    // fruta.colores = this.formulario.controls.coloresNuevos.value;
    this.juntarColores();
    this.frutaEditable.descuento = this.formulario.controls.descuento.value;
    this.frutaEditable.imagen = this.formulario.controls.imagen.value;
    this.frutaEditable.oferta = this.formulario.controls.oferta.value;
    this.frutaService.actualizar(this.frutaEditable).subscribe(data =>{
      console.debug(data);
      this._objeto = data;
    })
    let arrayColores = this.formulario.get('coloresNuevos') as FormArray;
    arrayColores.controls.splice(0);
    
  }

  juntarColores(){
      let arrayColores = this.formulario.get('coloresNuevos') as FormArray;
      if (arrayColores.length == 0){
        this.frutaEditable.colores = this.objeto.colores;
      }
      if(arrayColores.length > 0){

        for(let color of arrayColores.controls){
       
          this.frutaEditable.colores = this._objeto.colores;
          this.frutaEditable.colores.push(color.value);
        }
      }
    }
  
  agregarColores(value: any): any {
    value.array.forEach(element => {
      
    });
  }
 

  getColores(): string[]{
    let arrayColores =[];
     this._objeto.colores.forEach(color =>{
      arrayColores.push(color);
     })
    
    return this._objeto.colores;
  }

  getColoresFormArray(): FormArray{
     let arrayColores = this.formulario.get('colores') as FormArray;
     this.objeto.colores.forEach(el => {
      arrayColores.push(new FormGroup({color: new FormControl(el)}));
     })
     this.formulario.controls.colores.setValue(arrayColores);
     return this.formulario.get('colores') as FormArray;
  }
  
  editarColor(indice:number, color:string){
    console.log(this.color)
    let arrayColores = this.formulario.get('coloresNuevos') as FormArray;
    //this.objeto.colores[indice] = color;
    arrayColores.push(new FormGroup({color: new FormControl(color)}));
    this.eliminarColorExistente(indice);

    
  }



}
