import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LogeoService } from '../../services/logeo.service';
import { DatosService } from '../../services/datos.service';
import { Datos } from '../../interfaces/datos.interface';


@Component({
  selector: 'app-datos-logeado',
  templateUrl: './datos-logeado.component.html',
  styles: []
})
export class DatosLogeadoComponent implements OnInit {


  datos: Datos[];
  loading : boolean = true;

  constructor(
    public _logeoService: LogeoService,
    public _datosService: DatosService,
    private router: Router,
    private route : ActivatedRoute
  ) { 
    this._datosService.getDatos(this._logeoService.usuario.uid)
    .subscribe(datos => {
      console.log("Datos: ", datos);
      
      this.datos = datos
      this.loading = false;
    });
  }

  ngOnInit() {
  }

  borrarDato( key$ : string) {
    this._datosService.borrarDato(key$).subscribe( respuesta => {
      // console.log(respuesta);
      if (respuesta) {
        console.error(respuesta);
        
      } else {
        // si se borra
        console.log("Datos: ", this.datos);
        console.log("Borrar dato: ", this.datos[key$]);
        
        delete this.datos[key$];
      }
    });    
  }

}
