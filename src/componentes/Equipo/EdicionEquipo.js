import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'

class EditComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dataEquipment:{},
      numInventario: "",
      tipo: "",
      marca: "",
      modelo: "",
      numSerie: "",
    }
  }

  componentDidMount(){
    //Parámetros del Id
    let equipmentNum= this.props;
    const url = "http://localhost:3000/equipo/get/"+ equipmentNum
    axios.get(url)
    .then(res => {
      if (res.data.success) {
        const data = res.data.data[0]
        this.setState({
          dataEquipment:data,
          numInventario: data.NUM_INVENTARIO,
          tipo: data.TIPO,
          marca: data.MARCA,
          modelo: data.MODELO,
          numSerie: data.NUM_SERIE
        })
      }else {
        alert("Error web service")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  }

  render(){
   return (
    <div>
      <div class="form-row justify-content-center">
        <div class="form-group col-md-6">
          <label for="inputPassword4">Num Inventario </label>
            <input type="text" class="form-control"
              placeholder="Numero Inventario Equipo"
              value={this.state.numInventario}
              onChange={(value)=> this.setState({numInventario:value.target.value})}
            />
          </div>

         <div class="form-group col-md-6">
           <label for="inputEmail4">Tipo de Equipo</label>
            <select
            class="form-control" value={this.state.tipo} onChange={(value)=> this.setState({tipo:value.target.value})}>
            <option selected>Tipo de Equipo...</option>
            <option value="Laptop">Laptop</option>
            <option value="Video Proyector">Video Proyector</option>
            <option value="Extensión">Extensión</option>
            <option value="Regulador">Regulador</option>
            <option value="Bocinas">Bocinas</option>
            <option value="Tarjeta Inalámbrica">Tarjeta Inalámbrica</option>
            <option value="Impresora">Impresora</option>
          </select>
          </div>

          <div class="form-group col-md-6">
            <label for="inputEmail4">Marca</label>
            <input type="email" class="form-control"
              placeholder="Marca"
              value={this.state.marca}
              onChange={(value)=> this.setState({marca:value.target.value})}
            />
         </div>

         <div class="form-group col-md-6">
           <label for="inputEmail4">Modelo</label>
           <input type="email" class="form-control"
            placeholder="Modelo"
            value={this.state.modelo}
            onChange={(value)=> this.setState({modelo:value.target.value})}
           />
         </div>
       </div>

       <div class="form-row">

         <div class="form-group col-md-6">
           <label for="inputEmail4">Numero de Serie</label>
           <input type="number" class="form-control"
            placeholder="Numero Serie"
            value={this.state.numSerie}
            onChange={(value)=> this.setState({numSerie:value.target.value})}
            />
         </div>
       </div>
       <button type="submit" class="btn btn-primary" onClick={()=>this.sendUpdate()}>Actualizar</button>
     </div>
   );
 }

  sendUpdate(){
    ///  get parameter id
    let equipmentNum = this.props.match.params.id;
    console.log(equipmentNum);
    // url de backend
    const baseUrl = "http://localhost:3000/equipo/update/"+equipmentNum;
    // parametros de datos post
    const datapost = {
        NumInventario: this.state.numInventario,
        Tipo: this.state.tipo,
        Marca: this.state.marca,
        Modelo: this.state.modelo,
        NumSerie: this.state.numSerie
    }

    axios.post(baseUrl,datapost)
    .then(response=>{
      if (response.data.success===true) {
        Swal.fire({
          icon: 'success',
          title: 'Actualizar datos del Equipo',
          text: response.data.message,
          showConfirmButton: false,
          timer: 1500
        })

        this.limpiarCampos()
      }
      else {
        alert("Error")
      }
    })
    .catch(error=>{
      alert("Error 34 "+error)
    })
  }

  limpiarCampos() {
    this.setState({numInventario:""})
    this.setState({tipo:""})
    this.setState({marca:""})
    this.setState({modelo:""})
    this.setState({numSerie:""})
    this.render()
  }
}

export default EditComponent;
