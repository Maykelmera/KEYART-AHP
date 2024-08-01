import React from "react";
import { useSelector } from "react-redux";
import './alt_box.css'
// This reders the Consistency ratio box that is at the right side 
// of the input criteria matrix.


export default function Alt_box({tableNumber}){
    const display_filled = "La razón de consistencia actual es:"
    const display_notfilled = "Por favor, complete la matriz de comparación para ver el radio de consistencia."
    const CR_data = useSelector((state) => state.CR_Ratio);
    
    const status = (CR_data[tableNumber] === undefined) ? false : CR_data[tableNumber]["current_status"];
    const C_R = (CR_data[tableNumber] === undefined)? NaN : CR_data[tableNumber]["C_R"];
    const content = (status) ? display_filled : display_notfilled;
    // console.log(status);
    return(
       <div class="card card-1">
       <p class="heading"><h1 class="heading">Razón de consistencia</h1></p> 
         <div class="info">
          <i class="italics">La razón de consistencia garantiza que las puntuaciones asignadas en una matriz de comparación por pares sean consistentes y no violen el principio de transitividad. </i>
         </div>  
           <hr/> 
       
       <p className="dynamic-text">{content}</p>
       
       
       { (status) ? ((C_R < 0.1) ? (
         <div>
        <h3 class = "green-text">{C_R}</h3>
        <h3>R.C = I.C/IR</h3>
        <i class = "info">La razón de consistencia es aceptable. </i>
        </div>
       ) : (
         <div>
        <h3 class = "red-text">{C_R}</h3> 
        <h3>R.C = I.C/</h3>
        <i class = "info">La razón de consistencia <b>NO</b> es aceptable ya que es superior a 0,1. Por favor, compruebe las inconsistencias en la matriz.</i>
        </div>
       )) :(null)
       } 
       <a className="link" target="_blank" href="https://www.spicelogic.com/docs/ahpsoftware/intro/ahp-calculation-methods-396">
         Conozca más sobre la razón de consistencia.
       </a>
      </div>
     )
 }