import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import { Link } from "react-router-dom";
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'


class listComponent extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      listEquipment: []
    }
  }

  componentDidMount(){
   this.loadEquipment()
  }

  loadEquipment(){
     const url = "http://localhost:3000/equipo/prestado";
    axios.get(url)
    .then(res => {
      if(res.data.success) {
        const data = res.data.data
        this.setState({listEquipment: data})
      }else{
        alert("Error web service")
      }
    })
    .catch(err => {
      alert("Error server" + err)
    })
  }


  render()
  {
    return (
      <table class="table table-sm table -dark">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Num Inventario</th>
            <th scope="col">Tipo Equipo</th>
            <th scope="col">Marca</th>
            <th scope="col">Modelo</th>
            <th scope="col">Num Serie</th>
            <th scope="col">Estado</th>
            <th colspan="2">Action</th>
          </tr>
        </thead>
        <tbody>
          {this.loadFillData()}
        </tbody>
      </table>
    );
  }

  loadFillData(){
    return this.state.listEquipment.map((data) => {
      return(
        <tr class="table table-light table-sm">
          <th>{data.NUM_INVENTARIO}</th>
          <td>{data.TIPO}</td>
          <td>{data.MARCA}</td>
          <td>{data.MODELO}</td>
          <td>{data.NUM_SERIE}</td>
          <td>{data.DISPONIBILIDAD}</td>
          <td>
            <Link class="btn btn-outline-info "  to={"/edit/"+ data.NUM_INVENTARIO} >Editar</Link>
          </td>
          <td>
            <button class="btn btn-outline-danger" onClick={()=>this.onDelete(data.NUM_INVENTARIO)}> Eliminar </button>
          </td>
        </tr>
      )
    })
  }

   onDelete(id){
    Swal.fire({
      title: '¿Deseas eliminar este equipo?',
      text: 'Elige una opción',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {
        this.sendDelete(id)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'No se eliminó ningun equipo',
          'error'
        )
      }
    })
  }

  sendDelete(equipmentNum)
  {
    // url de backend
    const baseUrl = "http://localhost:3000/equipo/delete";   // parameter data post
    // network
    axios.post(baseUrl,{
      id:equipmentNum
    })
    .then(response =>{
      if (response.data.success) {
        Swal.fire(
          '¡Equipo Eliminado!',
          'Acabas de dar de baja un equipo',
          'success'
        )
        this.loadEquipment()
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }
}

export default listComponent;
