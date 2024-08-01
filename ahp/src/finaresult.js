import React, { useEffect, useState } from "react";
import './containers/Criteria_Matrix/normal_matrix.css';
import "./finalresult.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line, Radar, Bar, Pie } from "react-chartjs-2";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Configuración de ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Filler,
  Legend
);

class TableSingleRow {
  constructor(width, criteriaName, tableData, tableTitle) {
    this.width = width;
    this.criteriaName = criteriaName;
    this.tableData = tableData;
    this.tableTitle = tableTitle;
  }

  TableStruct() {
    const maxValue = Math.max(...this.tableData);
    const titleRow = this.criteriaName.map(e => (<th className="border border-slate-600 bg-slate-300">{e}</th>));
    const valueRow = this.tableData.map(e => (
      <td 
        className={`centreContent border border-slate-700 bg-slate-50 ${e === maxValue ? 'bg-sky-200 font-bold' : ''}`}
      >
        {e}
      </td>
    ));
    return (
      <div className="TableSingleRow font-sans my-4">
        <div className="centreContent text-2xl font-semibold">{this.tableTitle}</div>
        <table className="tableStruct w-full max-w-4xl text-lg border-collapse border border-slate-500 bg-slate-300 mx-auto">
          <thead>
            <tr>
              <th className="border w-1/5 border-slate-600 bg-slate-300">Nombre del criterio</th>
              {titleRow}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="centreContent border font-semibold border-slate-600 bg-slate-300">Valores</td>
              {valueRow}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export const critOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Prioridades de criterios",
    },
  },
};

export const altOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Prioridades de Alternativas",
    },
  },
};

export const radarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Radar de Prioridades de Alternativas',
    },
  },
  scales: {
    r: {
      ticks: {
        display: true,
        beginAtZero: true,
      },
    },
  },
};

export const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Prioridades de Alternativas - Gráfico de Barras',
    },
  },
};

export const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Prioridades de Criterios - Gráfico Circular',
    },
  },
};

export const histOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Distribución de Prioridades de Criterios - Gráfico de barras',
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Criterios'
      }
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Prioridad'
      }
    }
  }
};

function CreateTable({ data1, data2, name1, name2 }) {
  for (let i = 0; i < data1.length; i++) {
    data1[i] = Number(data1[i].toFixed(3));
  }

  const critSize = data1.length,
    altSize = data2.length / data1.length;

  let finalPriorityVector = new Array(altSize);
  finalPriorityVector.fill(0);

  for (let i = 0; i < altSize; i++) {
    let index = i;
    for (let j = 0; j < critSize; j++) {
      finalPriorityVector[i] += data1[j] * data2[index];
      finalPriorityVector[i] = Number(finalPriorityVector[i].toFixed(3));
      index += altSize;
    }
  }

  let maxPriority = Math.max(...finalPriorityVector);
  let maxPriorityName;
  let index = 0;

  for (let altPriority in finalPriorityVector) {
    if (maxPriority === finalPriorityVector[altPriority]) {
      maxPriorityName = name2[index];
    }
    index++;
  }

  const altChartName = name2.slice(0, altSize);

  let labels = [...altChartName];

  const altChartData = {
    labels,
    datasets: [
      {
        fill: true,
        data: [...finalPriorityVector],
        borderColor: "rgb(45, 179, 0)",
        backgroundColor: "rgba(64, 255, 0, 0.3)",
      },
    ],
  };

  const radarData = {
    labels: [...name1],
    datasets: altChartName.map((altName, idx) => ({
      label: altName,
      data: data2.slice(idx * critSize, (idx + 1) * critSize),
      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
    })),
  };

  const barData = {
    labels: [...altChartName],
    datasets: [
      {
        label: 'Prioridades',
        data: finalPriorityVector,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  labels = [...name1];
  const critChartData = {
    labels,
    datasets: [
      {
        fill: true,
        data: [...data1],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const pieData = {
    labels: [...name1],
    datasets: [
      {
        label: 'Prioridades',
        data: data1,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const histData = {
    labels: [...name1],
    datasets: [
      {
        label: 'Prioridades',
        data: data1,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const altTableData = new TableSingleRow(altSize, altChartName, finalPriorityVector, "Prioridades de Alternativas");
  const critTableData = new TableSingleRow(critSize, name1, data1, "Prioridades de criterios");

  const handleGeneratePDF = async () => {
    const pdf = new jsPDF('p', 'pt', 'a4');
    pdf.setFontSize(18);
    pdf.text('Reporte de selección de proveedores', 20, 30);
    let yOffset = 60; // Ajustado para incluir título
    const margin = 20;  // Margen para mantener los gráficos dentro de los límites de la página

    // Agregar mensaje del ganador
    pdf.setFontSize(14);
    pdf.text(`La mejor alternativa es ${maxPriorityName} con una puntuación final de ${maxPriority}`, margin, yOffset);
    yOffset += 30; // Espacio después del mensaje

    // Renderización de cada gráfico y tabla por separado
    const charts = document.querySelectorAll('.chart-container');
    for (const chart of charts) {
      const canvas = await html2canvas(chart, { useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 555.28; // Ancho de la imagen dentro del marco de la hoja A4
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      if (yOffset + imgHeight > pdf.internal.pageSize.height - margin) { // Cambiar de página si el contenido excede el tamaño de la página
        pdf.addPage();
        yOffset = margin;
      }
      
      pdf.addImage(imgData, 'PNG', margin, yOffset, imgWidth, imgHeight);
      yOffset += imgHeight + 20; // Espacio entre gráficos
    }

    // Agregar las tablas
    const tables = document.querySelectorAll('.TableSingleRow');
    for (const table of tables) {
      const canvas = await html2canvas(table, { useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 555.28; // Ancho de la imagen dentro del marco de la hoja A4
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      if (yOffset + imgHeight > pdf.internal.pageSize.height - margin) { // Cambiar de página si el contenido excede el tamaño de la página
        pdf.addPage();
        yOffset = margin;
      }
      
      pdf.addImage(imgData, 'PNG', margin, yOffset, imgWidth, imgHeight);
      yOffset += imgHeight + 20; // Espacio entre tablas
    }

    // Agregar fecha de generación al final del PDF
    const date = new Date();
    pdf.setFontSize(12);
    pdf.text(`Fecha de generación: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`, margin, pdf.internal.pageSize.height - margin);

    pdf.save("reporte_seleccion_proveedores.pdf");
  };


  return (
    <div className="p-6 font-sans">
      <div className="flex flex-col items-center justify-center">
        <div className="text-neutral-700 text-center my-10 justify-center text-xl">
          La alternativa que debe ser considerada finalmente de acuerdo con el proceso de AHP es {<b className="text-lime-600">{maxPriorityName}</b>}{" "}
          con una puntuación final de {" "}
          {<b className="text-lime-600">{maxPriority}</b>}{" "}
        </div>
      </div>

      <div className="chart-container w-full max-w-4xl mx-auto mb-8" style={{ height: '400px' }}>
        <Line options={altOptions} data={altChartData} />
      </div>
      {altTableData.TableStruct()}
      <hr />

      <div className="flex flex-wrap justify-center w-full max-w-4xl mx-auto mb-8">
        <div className="chart-container w-full md:w-1/2 p-2" style={{ height: '400px' }}>
          <Radar data={radarData} options={radarOptions} />
        </div>
        <div className="chart-container w-full md:w-1/2 p-2" style={{ height: '400px' }}>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
      <hr />

      <div className="chart-container w-full max-w-4xl mx-auto mb-8" style={{ height: '400px' }}>
        <Line options={critOptions} data={critChartData} />
      </div>
      {critTableData.TableStruct()}
      <hr />

      <div className="flex flex-wrap justify-center w-full max-w-4xl mx-auto mb-8">
        <div className="chart-container w-full md:w-1/2 p-2" style={{ height: '400px' }}>
          <Pie data={pieData} options={pieOptions} />
        </div>
        <div className="chart-container w-full md:w-1/2 p-2" style={{ height: '400px' }}>
          <Bar data={histData} options={histOptions} />
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <button
          onClick={handleGeneratePDF}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Generar Reporte PDF
        </button>
      </div>
    </div>
  );
}

export default function FinalResult() {
  const [showResult, setShowResult] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [renderData, setRenderData] = useState({
    critResponse: null,
    altResponse: null,
  });

  useEffect(() => {
    async function fetchCritAlt() {
      try {
        let critResponse = await localStorage.getItem('localCriteriaEigen');
        critResponse = JSON.parse(critResponse);
        let altResponse = await localStorage.getItem('localAlternativeEigen');
        altResponse = JSON.parse(altResponse);

        setRenderData({ critResponse, altResponse });
      } catch (error) {
        console.error(error);
      }
    }
    fetchCritAlt();
  }, [trigger]);

  const handleShowResult = () => {
    setTrigger(trigger + 1);
    setShowResult(!showResult);
  };

  if (showResult) {
    let critArray = [];
    let critName = [];
    let altArray = [];
    let altName = [];

    for (let key in renderData.critResponse) {
      critArray.push(Number(renderData.critResponse[key]["value"]));
      critName.push(renderData.critResponse[key]["fieldName"]);
    }

    for (let key in renderData.altResponse) {
      const tempArray = renderData.altResponse[key];
      for (let newkey in tempArray) {
        altArray.push(Number(tempArray[newkey]["value"]));
        altName.push(tempArray[newkey]["fieldName"]);
      }
    }

    return (
      <div className="mx-2 my-2 rounded border-2">
        <div>
          <CreateTable
            data1={critArray}
            data2={altArray}
            name1={critName}
            name2={altName}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="mx-auto my-2 p-36 textClass rounded border-2 font-sans">
        <div className="text-5xl text-center">
          Después de asegurarse de que los datos son consistentes, haga clic en obtener el resultado final
        </div>
        <button
          type="button"
          className="mt-8 text-4xl mb-4 buttonConfirm rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mx-auto block"
          onClick={handleShowResult}
        >
          Obtener el resultado final
        </button>
      </div>
    );
  }
}