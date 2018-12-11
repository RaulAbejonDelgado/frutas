

export class Frutas {

     private _id: number;
   

    private _nombre: string;
   
    private _precio: number;
    
    private _calorias: number;
    
    private _colores: string[];
    
    private _oferta: boolean;

    private _descuento: number;
    

    private _imagen: string;

    private _cantidad: number;
    private _total: number;
   
    constructor(){
        this._nombre = "";
        this._precio = 0;
        this._calorias = 0;
        this._oferta = false;
        this._descuento = 0;
        this._imagen = "";
        this._cantidad = 0;
        this._total = 0;
    }
    


    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get colores(): string[] {
        return this._colores;
    }
    public set colores(value: string[]) {
        this._colores = value;
    }
    public get calorias(): number {
        return this._calorias;
    }
    public set calorias(value: number) {
        this._calorias = value;
    }

    public get precio(): number {
        return this._precio;
    }
    public set precio(value: number) {
        this._precio = value;
    }
    public get nombre(): string {
        return this._nombre;
    }
    public set nombre(value: string) {
        this._nombre = value;
    }

    public get oferta(): boolean {
        return this._oferta;
    }
    public set oferta(value: boolean) {
        this._oferta = value;
    }

    public get descuento(): number {
        return this._descuento;
    }
    public set descuento(value: number) {
        this._descuento = value;
    }

    public get imagen(): string {
        return this._imagen;
    }
    public set imagen(value: string) {
        this._imagen = value;
    }
    public get cantidad(): number {
        return this._cantidad;
    }
    public set cantidad(value: number) {
        this._cantidad = value;
    }
    public get total(): number {
        return this._total;
    }
    public set total(value: number) {
        this._total = value;
    }

}