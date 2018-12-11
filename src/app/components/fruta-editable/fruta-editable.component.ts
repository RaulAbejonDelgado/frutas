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
  

  constructor(private route: ActivatedRoute,public frutaService : FrutaService) {
    this.color= new FormControl();
    this.colorNuevo = new FormControl();
    this.formulario = new FormGroup({
      nombre : new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(45)]),
      precio : new FormControl(0,[Validators.required,Validators.minLength(1),Validators.maxLength(5)]),
      calorias : new FormControl(0,[Validators.required,Validators.minLength(0)]),
      colores: new FormArray(  [this.crearColorFormGroup()] ),// quito para que inicialmente solo aparezca un campo color al inicializarse, this.crearColorFormGroup(),
      oferta : new FormControl(false),
      descuento : new FormControl(0),
      imagen: new FormControl('https://picsum.photos/300/300/?random', [ Validators.required, Validators.pattern('^(http(s?):\/\/).+(\(.png|.jpg|j.peg|random))$')]),
      coloresNuevos : new FormArray([ this.crearColorNuevoFormGroup() ])})
   }

  ngOnInit() {
    console.trace("CardComponent -ngOnInit")
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      // llamar provider para conseguir datos a traves del id
      this.obtenerPorId(this.id);
    });
  }

  obtenerPorId(id:number){
    this.frutaService.obtenerFrutaPorId(id).subscribe(data =>{
      this._objeto = data;
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
                
                color: new FormControl(this.color.value)
        });
  }

  crearColorNuevoFormGroup(){
    console.log(this.colorNuevo.value);
    return new FormGroup({
        colorNuevo : new FormControl(this.colorNuevo.value)
    })
  }

  nuevoColor(){    
    let arrayColores = this.formulario.get('coloresNuevos') as FormArray;
    let arrayObjetoColores = this._objeto.colores;
    console.log(arrayColores);
    console.log(this._objeto.colores);

    arrayColores.push(new FormGroup({color: new FormControl(this.color.value)}));
  }

  eliminarColorExistente(index:number){
    let arrayColores = this.formulario.get('coloresNuevos') as FormArray;
    if ( this.objeto.colores.length > 1 ){
      this.objeto.colores.splice(index, 1);
      console.log(this.objeto.colores);
    }
    //this.getColores();  
  }

  eliminarColorNuevo( index: number){
    let arrayColores = this.formulario.get('coloresNuevos') as FormArray;
    if ( arrayColores.length > 1 ){
      arrayColores.removeAt(index);
    }  
  }

  actualizar(){
    console.log("modificar - sumitar %o",  this.formulario);
    let fruta = new Frutas();

    fruta.id = this.id;
    fruta.nombre = this.formulario.controls.nombre.value;
    fruta.precio = this.formulario.controls.precio.value;
    fruta.calorias = this.formulario.controls.calorias.value;
    fruta.colores = this.formulario.controls.colores.value;
    //agregamos los valores
    this.formulario.controls.coloresNuevos.value.forEach(element => {
      
        fruta.colores.push(element);
          
    });
    fruta.descuento = this.formulario.controls.descuento.value;
    fruta.imagen = this.formulario.controls.imagen.value;
    fruta.oferta = this.formulario.controls.oferta.value;
    this.frutaService.actualizar(fruta).subscribe(data =>{
      console.debug(data);
      this._objeto = data;
    })

  
    

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
    this.objeto.colores[indice] = this.color.value;

    
  }



}
