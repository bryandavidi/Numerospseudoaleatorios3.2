import { data } from "./data.js";

class VarianceTest{ 

    constructor(data){
        this.data = data;
        this.aceptation = 0.95;
        this.error = 0.05;
        this.n = this.data.lenght;

    }

    calculateAverage(){
        let average = 0;
        for(let i = 0; i<this.data.length;i++){
            average += this.data[i]
        }   
        return average/this.data.length;
    }


    calculateVarS(){
        return(formulajs.VARS(this.data))
    }

    async calculateLI(){
        let probability = this.error/2
        let libertyDegrees = this.data.length -1
        let data = await axios.get(`http://localhost:5000/chi/${probability}/${libertyDegrees}`)
        let chiInv = data.data
        return (chiInv/(12*(this.data.length-1)))
    }

    async calculateLS(){
        let probability = 1-(this.error/2)  
        let libertyDegrees = this.data.length -1
        let data = await axios.get(`http://localhost:5000/chi/${probability}/${libertyDegrees}`)
        let chiInv = data.data
        return (chiInv/(12*(this.data.length-1)))
    }

    async check(){
        let variance = this.calculateVarS()
        let li = await this.calculateLI()
        let ls = await this.calculateLS()
        return ((variance <= ls) && (variance>=li)) ? true : false
    }

}

let button = document.getElementById('button-variance')

button.addEventListener('click',async()=>{
    let varianceTest = new VarianceTest(data)
    let average = document.querySelector('#variance_average')
    let li = document.querySelector('#variance_Li')
    let ls = document.querySelector('#variance_Ls')
    let variance = document.querySelector('#variance_variance')
    let check = document.querySelector('#variance_check')

    average.innerHTML = varianceTest.calculateAverage()
    li.innerHTML = await varianceTest.calculateLI()
    ls.innerHTML = await varianceTest.calculateLS()
    variance.innerHTML = varianceTest.calculateVarS()
    check.innerHTML = await varianceTest.check()
})

