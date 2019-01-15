export default class GA {
    GenomCounts = 0;
    chPopulations = [];
    private ng = [];
    logicFunc;
    inputCount = [];
    dec = 0;
    generationCount = 0;
    crossOverP = 0;
    mutationP = 0;
    initChromosome:String = "";
    position:Number = 0;
    constructor(inputCount, logic, decimal = 0, population, generationCount, crossOverP, mutationP, initChromosome:String, position:Number) {
        this.generateGenomCount(inputCount, decimal);
        this.setInitChromosome(initChromosome);
        this.setPosition(position);
        this.setPopulation(population);
        this.logicFunc = logic;
        this.inputCount = inputCount;
        this.dec = decimal;
        this.setGenerationCount(generationCount);
        this.generationCount = generationCount;
        this.setCrossOverP(crossOverP);
        this.setMutaionP(mutationP);
    }
    setCrossOverP(crossOverP) {
        this.crossOverP = crossOverP;
    }
    setMutaionP(mutationP) {
        this.mutationP = mutationP;
    }

    setPopulation(value) {
        this.chPopulations = [];
        for (let i = 0; i < value; i++)
            this.chPopulations.push(this.generateChrom());
    }

    setGenerationCount(value) {
        this.generationCount = value;
    }

    generateGenomCount(inputCount, decimal) {
        let total = 0;
        inputCount.forEach((item, i) => {
            total += this.population(inputCount, decimal, i);
        });
        this.GenomCounts = total;
    }
    generateChrom() {
        let str:String = "";
        for (let i = 0; i < this.GenomCounts; i++)
            str += Math.random() > 0.5 ? '1' : '0';
        return manipulateChromosome(str);
    }
    population(inputCount, decimal, inputIndex) {
        return Math.ceil(Math.log2((inputCount[inputIndex][1] - inputCount[inputIndex][0]) * (Math.pow(10, decimal))));
    }
    binReal(ch, ranges) {
        return ranges[0] + this.binDec(ch) * (ranges[1] - ranges[0]) / (Math.pow(2, ch.length) - 1);
    }
    binDec(genoms) {
        let length = genoms.length - 1;
        let dec = 0;
        while (length >= 0) {
            dec += parseInt(genoms[length]) * Math.pow(2, genoms.length - length - 1);
            length--;
        }
        return dec;
    }
    eval() {
        for (let k = 0; k < this.generationCount; k++) {
            let sum = 0;
            let probablies = [];
            let qprobables = [];
            for (let i = 0; i < this.chPopulations.length; i++) {
                let results = [];
                let ch = this.chPopulations[i];
                results = this.converetChToDecimals(ch);
                let p = this.logicFunc.call(this, ...results);
                probablies.push(p);
                sum += p;
                results = [];
            }
            for (let i = 0; i < this.chPopulations.length; i++) {
                probablies[i] = sum == 0 ? 0 : probablies[i] / sum;
                qprobables[i] = 0;
                for (let j = 0; j <= i; j++) {
                    qprobables[i] += probablies[j];
                }
                const rand = Math.random();
                if (rand < qprobables[0]) this.ng.push(this.chPopulations[0]);
                for (let j = 0; j < this.chPopulations.length; j++) {

                    if (rand >= qprobables[j]) {
                        let selected = j + 1;
                        this.ng.push(this.chPopulations[selected]);
                        break;
                    }
                }
            }
            this.chPopulations = [...this.ng];
            this.ng = [];
            //mutation
            for (let i = 0; i < this.chPopulations.length; i++) {
                for (let j = 0; j < this.GenomCounts; j++) {
                    if (Math.random() < this.mutationP) {
                        this.chPopulations[i] = this.chPopulations[i].substr(0, j) + this.mutation(this.chPopulations[i][j]) + this.chPopulations[i].substr(j + 1);

                    }
                }
                if (Math.random() < this.crossOverP) {
                    const i1 = this.selectRandomIndex;
                    const i2 = this.selectRandomIndex;
                    const ch1 = this.chPopulations[i1];
                    const ch2 = this.chPopulations[i2];
                    const crossovered = this.crossOver(ch1, ch2);
                    this.chPopulations[i1] = crossovered[0];
                    this.chPopulations[i2] = crossovered[1];
                }
            }
        }
        let max = {
            all: [],
            answer: null,
            inputs: []
        };
        // show data
        for (let i = 0; i < this.chPopulations.length; i++) {
            let results = [];
            let ch = this.chPopulations[i];
            results = this.converetChToDecimals(ch);
            let p = this.logicFunc.call(this, ...results);
            if (max.answer == null || p > max.answer) {
                max.answer = p;
                max.inputs = results;
            }
            max.all.push({ answer: p, inputs: results });
            results = [];
        }
        return max;
    }

    crossOver(c1, c2) {
       // const defVal1 = this.logicFunc.call(this, ...this.converetChToDecimals(c1));
       // const defVal2 = this.logicFunc.call(this, ...this.converetChToDecimals(c2));
        let point = Math.ceil(Math.random() * c1.length);
        let t1 = c1.substr(point);
        let t2 = c2.substr(point);
        let d1 = c1.substr(0, point) + t2;
        let d2 = c2.substr(0, point) + t1;
        // const newVal1 = this.logicFunc.call(this, ...this.converetChToDecimals(d1))
        // const newVal2 = this.logicFunc.call(this, ...this.converetChToDecimals(d2));
        // if (newVal1 >= defVal1 && newVal2>= defVal2) return [d1, d2];
        return [d1,d2];
    }

    mutation(c1) {
        return c1 == '1' ? '0' : '1';
    }

    get selectRandomIndex() {
        return Math.ceil(Math.random() * this.chPopulations.length - 1);
    }

    converetChToDecimals(ch) {
        let result = [];
        let start = 0;
        let innerChRanges = this.inputCount.map((item, index) => {
            return this.population(this.inputCount, this.dec, index);
        });
        for (let j = 0; j < innerChRanges.length; j++) {
            let arg = ch.substr(start, innerChRanges[j]);
            start += innerChRanges[j];
            result.push(this.binReal(arg, this.inputCount[j]));
        }
        return result;
    }
    getChResult(ch){
       return this.eval(...this.converetChToDecimals(ch));
    }
    setInitChromosome(n:String){
        this.initChromosome = n;
    }
    setPosition(n:Number){
        this.position = n;
    }
    manipulateChromosome(str:String){
        let temp:String = "";
        if(!this.initChromosome.length)
            return str;
        if(!this.position)
            temp = this.initChromosome;
        else if(this.position){
            temp += str.substr(0, this.position);
            temp += this.initChromosome;
        }
        temp += str.substr(this.position + this.initChromosome.length);
        return temp;
    }
}
