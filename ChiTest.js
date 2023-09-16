import { data } from "./data.js";

class ChiTest{ 

    constructor(data){
        this.data = data;
        this.aceptation = 0.95;
        this.error = 0.05;
        this.n = this.data.lenght;
        this.table = {
            'initial': [],
            'final': [],
            'frecObt': [],
            'frecEsp': [],
            'chi': []
        }

    }

    /*: Este método calcula los grados de libertad para la prueba de chi-cuadrado. En este caso,
     parece estar utilizando la regla de Pearson para calcular los grados de libertad.*/
    libertyDegrees(){
        return Math.round(Math.sqrt(this.data.length))-1
    }

    // Este método calcula la suma de los valores de chi-cuadrado obtenidos. //
    sumChi(){
        let sum = 0
        for (let i = 0; i < this.table['chi'].length; i++) {
            sum = sum+this.table['chi'][i]
            
        }
        return sum;
    }

    //Este método cuenta cuántos valores en la secuencia están dentro de un intervalo dado.//
    valuesBetween(values,li,ls){
        let count = 0
        for(let i=0;i<values.length;i++){
            if((values[i]>=li) && (values[i]<=ls)){
                count ++;
            }
        }
        return count;
    }

    //Este método compara la suma de los valores de chi-cuadrado con el valor crítico obtenido de calculateChi() para
    // determinar si la prueba de chi-cuadrado es satisfactoria.//
    async calculateChi(){
        let data = await axios.get(`http://localhost:5000/chi/${0.95}/${this.libertyDegrees()}`)
        return data.data
    }

     //Este método divide la secuencia de datos en intervalos y calcula la frecuencia observada y esperada para cada intervalo,
    // así como el valor de chi-cuadrado para cada intervalo.//
    calculateIntervals(){
        let intervals = Math.round(Math.sqrt(this.data.length))
        let range = Math.max(...this.data)-Math.min(...this.data)
        let size = range/intervals
        console.log(intervals)
        console.log(Math.min(...this.data))
        let aux = Math.min(...this.data);
        for(let i=0;i<intervals;i++){
           console.log()
            console.log(this.table['initial'])
            this.table['initial'].push(aux) 
            this.table['final'].push(aux+size)
            let frecuenciaObtenida = this.valuesBetween(this.data,aux,aux+size)
            this.table['frecObt'].push(frecuenciaObtenida)
            let frecuenciaEsperada = this.data.length/intervals
            this.table['frecEsp'].push(frecuenciaEsperada)
            let chiValue = (Math.pow((frecuenciaObtenida-frecuenciaEsperada),2)) / (frecuenciaEsperada)
            this.table['chi'].push(chiValue)
            aux = aux+size;
        }

       return this.table
    }

    async check(){
        let chi = await this.calculateChi()

        if(this.sumChi() <= chi){
            return true
        }else{
            return false
        }
    }

}


let button = document.getElementById('button-chi')

button.addEventListener('click', async ()=>{
     let chiTest = new ChiTest(data)
     let values = chiTest.calculateIntervals()
    
    let sumchi = document.querySelector('#chi_sumchi')
    let ld = document.querySelector('#chi_ld')
    let chi = document.querySelector('#chi_chi')
    let check = document.querySelector('#chi_check')

    sumchi.innerHTML = chiTest.sumChi()
    ld.innerHTML = chiTest.libertyDegrees()
    chi.innerHTML = await chiTest.calculateChi()
    check.innerHTML = await chiTest.check()

    createTable(values)
})

function createTable(data) {
    console.log(data)
    var table = document.querySelector("#table-chi");
    var tbody = document.createElement("tbody")

    console.log(table)
    if(table.childElementCount>1){
        table.replaceChild(tbody,table.lastChild)
    }else{
        table.appendChild(tbody)
    }

console.log( data['initial'].length)

    let contentTable = []
    for (let j = 0; j < data['initial'].length; j++) {
        var tr = document.createElement("tr");
        
            var tdnum = document.createElement("td");
            var valuenum = document.createTextNode(j+1);
            tdnum.appendChild(valuenum);
           
            var tdinitial = document.createElement("td");
            var valueinitial = document.createTextNode(data['initial'][j])
            tdinitial.appendChild(valueinitial);
            
            var tdfinal = document.createElement("td");
            var valuefinal = document.createTextNode(data['final'][j])
            tdfinal.appendChild(valuefinal);
            
            var tdfrecobt = document.createElement("td");
            var valuefrecobt = document.createTextNode(data['frecObt'][j])
            tdfrecobt.appendChild(valuefrecobt);
            
            var tdfrecesp = document.createElement("td");
            var valuefrecesp = document.createTextNode(data['frecEsp'][j])
            tdfrecesp.appendChild(valuefrecesp);
            
            var tdchi = document.createElement("td");
            var valuechi = document.createTextNode(data['chi'][j])
            tdchi.appendChild(valuechi);
            
            tr.appendChild(tdnum)
            tr.appendChild(tdinitial)
            tr.appendChild(tdfinal)
            tr.appendChild(tdfrecobt)
            tr.appendChild(tdfrecesp)
            tr.appendChild(tdchi)
            contentTable.push(tr)    
    }


    tbody.append(...contentTable);
}

