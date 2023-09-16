import { data } from "./data.js";

class KsTest{


    constructor(data){
        this.kstable = [0.0, 0.97500,0.84189,0.70760,0.62394,0.56328,0.51926,0.48342,0.45427,0.43001,0.40925,0.39122,0.37543,0.36143,0.34890,0.33750,0.32733,0.31796,0.30936,0.30143,0.29408,0.28724,0.28087,0.27490,0.26931,0.26404,0.25908,0.25438,0.24993,0.24571,0.24170,0.23788,0.23424,0.23076,0.22743,0.22425,0.22119,0.21826,0.21544,0.21273,0.21012,0.20760,0.20517,0.20283,0.20056,0.19837,0.19625,0.19420,0.19221,0.19028,0.18841]

        this.data = data;
        this.aceptation = 0.95;
        this.error = 0.05;
        this.n = this.data.lenght;
        this.table = {
            'initial': [],
            'final': [],
            'frecObt': [],
            'frecObtAcu': [],
            'probObt': [],
            'frecEspAcu': [],
            'probEsp': [],
            'diff': []
        }

    }

    //Este método cuenta cuántos valores en la muestra están dentro de un intervalo dado.//
    valuesBetween(values,li,ls){
        let count = 0
        for(let i=0;i<values.length;i++){
            if((values[i]>=li) && (values[i]<=ls)){
                count ++;
            }
        }
        return count;
    }

    //Este método devuelve el valor máximo de las diferencias absolutas entre las probabilidades observadas y las
    // probabilidades esperadas en la tabla de resultados.//
    maxDiff(){
        return Math.max(...this.table['diff'])
    }

    //Este método devuelve el valor crítico máximo de la tabla de valores KS (usualmente utilizado para comparar con maxDiff).//
    maxProbDiff(){
        return this.kstable[this.data.length]
    }

    //Este método divide la muestra de datos en intervalos y calcula varias cantidades para cada intervalo, incluyendo
    // frecuencia observada acumulativa, probabilidad observada, frecuencia esperada acumulativa, probabilidad esperada\
    // y la diferencia absoluta entre las probabilidades observadas y esperadas.//
    calculateIntervals(){
        let intervals = Math.round(Math.sqrt(this.data.length))
        let range = Math.max(...this.data)-Math.min(...this.data)
        let size = range/intervals
        console.log(intervals)
        console.log(Math.min(...this.data))
        let aux = Math.min(...this.data);
        let frecObtAcu = 0
        let frecEspAcu = 0
        for(let i=0;i<intervals;i++){
           console.log()
            console.log(this.table['initial'])
            this.table['initial'].push(aux)
            this.table['final'].push(aux+size)
            let frecuenciaObtenida = this.valuesBetween(this.data,aux,aux+size)
            this.table['frecObt'].push(frecuenciaObtenida)
            frecObtAcu = frecObtAcu + frecuenciaObtenida
            this.table['frecObtAcu'].push(frecObtAcu)
            let probObt = frecObtAcu/this.data.length
            this.table['probObt'].push(probObt)
            let frecuenciaEsperada = this.data.length/intervals
            frecEspAcu = frecEspAcu + frecuenciaEsperada
            this.table['frecEspAcu'].push(frecEspAcu)
            let probEsp = frecEspAcu/this.data.length
            this.table['probEsp'].push(probEsp)
            let diff = Math.abs(probEsp-probObt)
            this.table['diff'].push(diff)
            aux = aux+size;
        }
        console.log('lol')
        console.log(this.kstable.length)
       return this.table
    }

    check(){
        return (this.maxDiff()<this.maxProbDiff()?true:false)
    }

}


let button = document.getElementById('button-ks')

button.addEventListener('click', async ()=>{
     let ksTest = new KsTest(data)
     let values = ksTest.calculateIntervals()

    let maxdiff = document.querySelector('#ks_max_diff')
    let maxprobdiff = document.querySelector('#ks_maxprob_diff')
    let check = document.querySelector('#ks_check')

    maxdiff.innerHTML = ksTest.maxDiff()
    maxprobdiff.innerHTML = ksTest.maxProbDiff()
    check.innerHTML = ksTest.check()


    createTable(values)
})

function createTable(data) {
    console.log(data)
    var table = document.querySelector("#table-ks");
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

            var tdfrecobtAcu = document.createElement("td");
            var valuefrecobtacu = document.createTextNode(data['frecObtAcu'][j])
            tdfrecobtAcu.appendChild(valuefrecobtacu);

            var tdprobObt = document.createElement("td");
            var valueprobObt = document.createTextNode(data['probObt'][j])
            tdprobObt.appendChild(valueprobObt);

            var tdfrecesp = document.createElement("td");
            var valuefrecesp = document.createTextNode(data['frecEspAcu'][j])
            tdfrecesp.appendChild(valuefrecesp);

            var tdprobesp = document.createElement("td");
            var valueprobesp = document.createTextNode(data['probEsp'][j])
            tdprobesp.appendChild(valueprobesp);

            var tddiff = document.createElement("td");
            var valuediff = document.createTextNode(data['diff'][j])
            tddiff.appendChild(valuediff);

            tr.appendChild(tdnum)
            tr.appendChild(tdinitial)
            tr.appendChild(tdfinal)
            tr.appendChild(tdfrecobt)
            tr.appendChild(tdfrecobtAcu)
            tr.appendChild(tdprobObt)
            tr.appendChild(tdfrecesp)
            tr.appendChild(tdprobesp)
            tr.appendChild(tddiff)
            contentTable.push(tr)
    }


    tbody.append(...contentTable);
}

