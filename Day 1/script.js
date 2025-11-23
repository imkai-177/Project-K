// Challenge 1,2
// const massMark = 78;
// const heightMark=1.59;

// const massJohn=92;
// const heightJohn=1.95;

// const BMIMark = massMark / (heightMark*heightMark);

// const BMIJohn= massJohn/ (heightJohn*heightJohn);

// const markHigherBMI= BMIMark>BMIJohn;

// if(BMIMark > BMIJohn){
//     console.log(`Mark's BMI (${BMIMark})is higher than John's (${BMIJohn})!`);
// } else {
//     console.log(`John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})!`);
// }

// Challenge 3
// const dolphins1 = 97;
// const dolphins2 = 112;
// const dolphins3 = 101;

// const scoreDolphins = (dolphins1+dolphins2+dolphins3)/3;

// const koalas1 = 109;
// const koalas2 = 95;
// const koalas3 = 106;

// const scoreKoalas = (koalas1+koalas2+koalas3)/3;

// console.log(scoreDolphins, scoreKoalas);

// if((scoreDolphins>scoreKoalas)&&scoreDolphins>=100){
//     console.log("Dolphins win the trophy");
// } else if((scoreKoalas>scoreDolphins)&&scoreKoalas>=100){
//     console.log("Koalas win the trophy");
// } else if((scoreDolphins===scoreKoalas)&&scoreDolphins>=100&&scoreKoalas>=100){
//     console.log("Both win the trophy");
// } else {
//     console.log("No one win the trophy!");
// }

// Challenge 4
const bill = 430;
const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2 ;

console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${bill+tip}`);
