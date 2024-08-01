import React, {useState} from "react";
import { useSelector } from "react-redux";
// import './cr_ratio.css'
export default function Cr_Ratio(){
   
  const CR = useSelector(state => state.Cr_Ratio   );
  // console.log(CR);
  console.log("BUSTED")

  // The greate R.C ratio logic;
  
  return(
        <div class="card card-1">
         <p class="heading"><h1 class="heading">Razón de consistencia</h1></p> 
           <div class="info">
            <i class="italics">La razón de consistencia garantiza que las puntuaciones asignadas en una matriz de comparación por pares sean consistentes y no violen el principio de transitividad. </i>
           </div>  
             <hr/> 
         <h3 class="CR-head">CR:</h3>
         <p>This is where the current consistency ration will be displayed:</p>
         <h3>R.C = I.C/IR</h3>
         <div class="info">
            <i class="italics">Your R.C is <b>higher</b>/ R.C is lower </i>
           </div>  
        </div>);
}