import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axios from 'axios';

class controlPrestamo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listPrestamo: [],
      fechaInicial: "",
      fechaCorte: ""
    }
  }

  render(){
    return(
      <section className = "App-section">
        <div class="form-row justify-content-center">
          <div class="form-group col-md-6">
            <label>Fecha Inicial</label>
            <input type="date" class="form-control"
              placeholder="dd-mm-aaaa"
              onChange={(value)=> this.setState({fechaInicial:value.target.value})}
            />
          </div>

          <div class="form-group col-md-6">
            <label>Fecha de Corte</label>
            <input type="date" class="form-control"
              placeholder="dd-mm-aaaa"
              onChange={(value)=> this.setState({fechaCorte:value.target.value})}
            />
          </div>

          <button type="submit" class="btn btn-primary" onClick={()=>this.findPrestamos()}>Consultar</button>
        </div>

        <br />

        <table class="table table-hover table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Id Préstamo</th>
              <th scope="col">Solicitante</th>
              <th scope="col">Procedencia</th>
              <th scope="col">Id Equipo</th>
              <th scope="col">Equipo</th>
              <th scope="col">Fecha de Préstamo</th>
              <th scope="col">Hora de Préstamo</th>
              <th scope="col">Fecha de Devolución</th>
              <th scope="col">Hora de Devolución</th>
              <th scope="col">Tipo de Préstamo</th>
            </tr>
          </thead>
          <tbody>
            {this.loadFillData()}
          </tbody>
        </table>
      </section>
    );
  }
   loadFillData(){
    return this.state.listPrestamo.map((data) => {
      return(
        <tr class="table table-light table-sm">
          <td>{data.ID_PRESTAMO}</td>
          <td>{data.SOLICITANTE}</td>
          <td>{data.PROCEDENCIA}</td>
          <td>{data.ID_EQUIPO}</td>
          <td>{data.EQUIPO}</td>
          <td>{data.FECHA_PRESTAMO}</td>
          <td>{data.HORA_PRESTAMO}</td>
          <td>{data.FECHA_DEVOLUCION}</td>
          <td>{data.HORA_DEVOLUCION}</td>
          <td>{data.TIPO_PRESTAMO}</td>
        </tr>
      )
    })
  }

  findPrestamos(){
    if (this.state.fechaInicial === "") {
      alert("Ingrese la Fecha Inicial");
    }
    else if (this.state.fechaCorte === "") {
      alert("Ingrese la Fecha de Corte");
    }else{
      const direccionUrl = "http://localhost:3000/prestamo/rango";

      const datosConsulta = {
        
        FechaInicial: this.state.fechaInicial,
        FechaCorte: this.state.fechaCorte
      }

      axios.post(direccionUrl, datosConsulta)
      .then(res => {
        if(res.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Préstamos realizados',
            text: 'Obteniendo los datos...',
            showConfirmButton: false,
            timer: 1000
          })
          const data = res.data.data
          this.setState({listPrestamo: data})
          this.render()
        }else{
        alert("Error web service")
        }
      })
      .catch(err => {
        alert("Error server" + err)
      })
    }
  }
}

export default controlPrestamo;
