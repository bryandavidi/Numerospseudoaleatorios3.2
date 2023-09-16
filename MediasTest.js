import { data } from "./data.js";

class MediaTest{ 

    constructor(data){
        this.data = data;
        this.aceptation = 0.95;
        this.error = 0.05;
        this.n = this.data.lenght;

    }

    // Este método calcula la media de la muestra de datos sumando todos los valores y dividiendo por el tamaño de la muestra.//
    calculateAverage(){
        let average = 0;
        for(let i = 0; i<this.data.length;i++){
            average += this.data[i]
        }
        return average/this.data.length;
    }

    //Este método calcula el valor crítico Z (z-score) correspondiente al nivel de aceptación y error
    // especificados utilizando la función NORMSINV de la biblioteca //
    calculateZ(){
        let value = (1-(this.error/2))
        return(formulajs.NORMSINV(value)) //Formulajs El valor Z se utiliza para definir el intervalo de confianza.
    }

    //Este método calcula el límite inferior del intervalo de confianza para la media utilizando el valor Z calculado y la fórmula apropiada.//
    calculateLI(){
        return ((1/2)-(this.calculateZ()*(1/Math.sqrt(12*this.data.length))))
    }

    //Este método calcula el límite superior del intervalo de confianza para la media utilizando el valor Z calculado y la fórmula apropiada.//
    calculateLS(){
        return ((1/2)+(this.calculateZ()*(1/Math.sqrt(12*this.data.length))))
    }

    //Este método verifica si la media de la muestra está dentro del intervalo de confianza definido por los límites inferior (LI) y superior (LS). Retorna true si la prueba es satisfactoria, y false en caso contrario.//
    check(){
        let average = this.calculateAverage()
        return ((average >= this.calculateLI()) && (average<=this.calculateLS())) ? true : false
    }

}

let button = document.getElementById('button-medias')

button.addEventListener('click',()=>{
    let mediaTest = new MediaTest(data)
    let average = document.querySelector('#medias_average')
    let li = document.querySelector('#medias_Li')
    let ls = document.querySelector('#medias_Ls')
    let check = document.querySelector('#medias_check')

    average.innerHTML = mediaTest.calculateAverage()
    li.innerHTML = mediaTest.calculateLI()
    ls.innerHTML = mediaTest.calculateLS()
    check.innerHTML = mediaTest.check()
})

