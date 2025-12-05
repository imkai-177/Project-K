'use strict';

// Challenge #1 
// const calcAverage = (point1, point2, point3) => (point1+point2+point3)/3 ;

// const checkWinner = function(d1, d2, d3, k1, k2, k3) {

//     const avgDolphins= calcAverage(d1, d2, d3);
//     const avgKoalas=calcAverage(k1, k2, k3);

//     if(avgDolphins>=2*avgKoalas) {
//         console.log(`Dolphins win(${avgDolphins} vs. ${avgKoalas})`);
//     } 
//     else if (avgKoalas>=2*avgDolphins) {
//         console.log(`Koalas win(${avgKoalas} vs. ${avgDolphins})`);
//     } else {
//         console.log(`No one win.`);
//     }
// }

// checkWinner(44,23,71,65,54,49);
// checkWinner(85,54,41,23,34,27);

// Challenge #2
// const calcTip= function(bill) {
//     if(bill>=50 && bill<=300){
//         return bill*0.15;
//     } else {
//         return bill*0.20;
//     }
// }
// console.log(calcTip(100));

// const bill=[125, 555, 44];
// const tip =[calcTip(bill[0]), calcTip(bill[1]), calcTip(bill[2])];
// const total = [bill[0]+tip[0], bill[1]+tip[1], bill[2]+tip[2]];

// console.log(bill);
// console.log(tip);
// console.log(total);

// Challenge #3
// const mark= {
//     fullName: 'Mark Miller',
//     mass: 92,
//     height: 1.95,
//     calcBMI: function(){
//         this.bmi = this.mass / (this.height*this.height);
//         return this.bmi;
//     }
// };

// const john = {
//     fullName: 'John Smith',
//     mass: 78,
//     height: 1.69,
//     calcBMI: function(){
//         this.bmi = this.mass / (this.height*this.height);
//         return this.bmi;
//     }
// };

// mark.calcBMI();
// john.calcBMI();

// console.log(mark.bmi>john.bmi ? `${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s BMI (${john.bmi})!` : `${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s BMI (${mark.bmi})!`);

// Challenge #4
const bill=[22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tip=[];
const total=[];

for(let i=0; i<bill.length; i++) {
    const calcTip= function(bill) {
    if(bill>=50 && bill<=300){
        return bill*0.15;
        } else {
        return bill*0.20;
        }
    };
    tip.push(calcTip(bill[i]));
    total.push(bill[i]+tip[i]);
};

console.log(bill, tip, total);

// Bonus 
const arr=[10,20,30,40,50,60,70,80,90];
const calcAverage= function(arr) {
    let sum=0;
    for(let i=0;i<arr.length;i++){
        sum=sum+arr[i];
    };
    return sum/arr.length;
};

console.log(calcAverage(arr));

console.log(calcAverage(total));
