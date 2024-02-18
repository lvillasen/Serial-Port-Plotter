let port;
let reader;
let isPortOpen = false;
var printData = 0;

let readingInterval; // Variable para almacenar el identificador del temporizador
var n_read = 0;
var time_update = parseInt(document.getElementById("time_update").value);
var data_out = document.getElementById("display_data");
var points_max = parseInt(document.getElementById("points_max").value)+1;
const connectButton = document.getElementById ('SerialConnectButton');

data_out.style.display = "none";

connectButton.addEventListener('click', connectToSerial );
const element = document.getElementById("plot_data");




var result1000 = [];
var result = [];
var data1000 = "" ; 
var data_tot = [];
var column;

var n_read = 0;

var chunk = "";

async function connectToSerial() {
    try {
        // Si el puerto ya está abierto, lo cerramos
        if (isPortOpen) {
            await closeSerialPort();
            return;
        }

        if (!port) {
            // Solicitar permiso para acceder al puerto serie
            port = await navigator.serial.requestPort();
        }

        await port.open({ baudRate: 230400,bufferSize: 1024  }); // Puedes cambiar la velocidad de baudios según necesites

        reader = port.readable.getReader();


        connectButton.value = 'Disconnect';

        isPortOpen = true;
        printData = 0;
        data_out.style.display = "none";
        element.scrollIntoView({
         behavior: "smooth",
          block: "start",
          inline: "nearest"
        });


        time_update = parseInt(document.getElementById("time_update").value);


        readingInterval = setInterval(readSerialData, time_update); // Cambia el valor del intervalo según lo desees
    } catch (error) {
        console.error('Error:', error);
    }
}

async function closeSerialPort() {
    try {
        clearInterval(readingInterval);

        if (reader) {
            await reader.cancel();
            await reader.releaseLock();
        }

        if (port) {
            await port.close();
        }

    
        connectButton.value = 'Connect';

        isPortOpen = false;
        printData = 1;
        print_data();

    } catch (error) {
        console.error('Error:', error);
    }
}

async function readSerialData() {
     
    try {
        const { value, done } = await reader.read();
        if (!done) {
            n_read = n_read + 1;
            chunk = new TextDecoder().decode(value); 
            data1000 = data1000 + chunk;
            result1000 = data1000.split(/\r?\n/);

            column = parseInt(document.getElementById("Column").value);
           
            points_max = parseInt(document.getElementById("points_max").value)+1;
            
            data_tot = [];
            if (result1000.length > points_max) {
                result = result1000.slice(result1000.length-points_max,result1000.length-1);
              
                for (let i = 0;i<result.length;i++){
                    data_tot.push(String(result[i]).split(' ')[column])
            }

            } else {
                result = result1000;
                for (let i = 0;i<result.length-1;i++){
                    data_tot.push(String(result[i]).split(' ')[column])
            }
            }


            updatePlot();
        }
    } catch (error) {
        printData = 1;
        updatePlot();
        console.error('Error:', error);
    }
}


function updatePlot(){
    var X_axis = [];
    for (var i = 0; i < data_tot.length; i++) {
   X_axis.push(i);
}

    var trace1 = {
x: X_axis,
y: data_tot,
  mode: 'lines',
  name: 'Red CD',
    line: {
    color: 'red',
    width: 2,
    dash: 'line'
  }
};
  


    var data1 =[trace1]
    var layout1 = {
              xaxis: {
                  //   range: [0, N],
                  title: "Sample Number"
              },
              yaxis: {
                  //    range: [-1, 1],
                  title: "Column " + String(column)
              },
              title: "Data from the Serial Port" ,font: {
    family: 'Arial, sans-serif;',
    size: 18,
    color: '#000'
  },
          };


          Plotly.purge("plot_data");
    Plotly.newPlot("plot_data", data1, layout1);
if (printData == 1){
    print_data();
}
}

function print_data(){



data_out.style.display = "block";

              data_out.textContent = "Row    Columns    \n";
              for (let i = 0;i<result.length ;i++){
                
                data_out.textContent += i + " " + String(result[i]) + "\n"
              }

             printData = 0;
            

}