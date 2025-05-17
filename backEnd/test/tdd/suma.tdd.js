import logger from "../../src/helpers/logger.helper.js"


const sumarNumeros = (...nums) => {
    if(nums.length === 0) {
        return 0
    }
    const hayNoNumeros = nums.some(num => typeof num !== 'number')
    if( hayNoNumeros) {
        return null
    }
    const sumatoria = nums.reduce((acc, num) => acc + num)
    return sumatoria
    
}

//T1 devuelve null si alguno de los numeros no es un numero
const test1 = () => {
    const resultado = sumarNumeros(1, 'a')
    if (resultado === null) {
        logger.info('Test 1: OK');
        //console.log('Test 1: OK');
    } else {
        //console.log('Test 1: no paso');
        logger.ERROR('Test 1: no paso');
    }
}
//T2 devuelve 0 si no recibe ningun numero
const test2 = () => {
    const resultado = sumarNumeros()
    if (resultado === 0) {
        //console.log('Test 2: OK');
        logger.INFO('Test 2: OK');
    } else {
        //console.log('Test 2: no paso');
        logger.ERROR('Test 2: no paso');
    }
}
//T3 devuelve correctamente la suma de dos numeros
const test3 = () => {
    const resultado = sumarNumeros(1, 2)
    if (resultado === 3) {
        //console.log('Test 3: OK');
        logger.INFO('Test 3: OK');
    } else {
        //console.log('Test 3: no paso');
        logger.ERROR('Test 3: no paso');
    }
}
//T4 devuelve correctamente la suma de caulquier cantidad de numeros
const test4 = () => {
    const resultado = sumarNumeros(1, 2, 3, 4, 5)
    if (resultado === 15) {
        //console.log('Test 4: OK');
        logger.INFO('Test 4: OK');
    } else {
        //console.log('Test 4: no paso');
        logger.ERROR('Test 4: no paso');
    }
}

test1()
test2()
test3()
test4()