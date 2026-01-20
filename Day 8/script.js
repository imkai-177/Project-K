'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// function
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
          i + 1
        } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// username
const createUserNames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserNames(accounts);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((sum, mov) => sum + mov, 0);
  labelSumIn.textContent = `${income}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((sum, mov) => sum + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
const updateUI = function (acc) {
  // Display Movement
  displayMovements(acc.movements);

  // Display Balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

/////////////////////////////////////
// Event Handlers
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value,
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display welcome
    labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 1;
  }

  // clear input
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();

  // Update
  updateUI(currentAccount);
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const rcvAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    rcvAcc &&
    currentAccount.balance >= amount &&
    rcvAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    rcvAcc.movements.push(amount);
  }

  // update
  updateUI(currentAccount);
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov > amount * 0.1)) {
    // add money
    currentAccount.movements.push(amount);

    // update
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username,
    );
    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// /////////////////////////////////////////////////
// //

// ///////////////////////////////////////
// // Coding Challenge #1

/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
const julia = [3, 5, 2, 12, 7];
const kate = [4, 1, 15, 8, 3];
const juliaCorrected = julia.slice(1, 3);

const checkDogs = function (arr1, arr2) {
  // const allDogs = [...juliaCorrected, ...kate];
  const allDogs = juliaCorrected.concat(kate);
  allDogs.forEach(function (age, i) {
    if (age >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};
checkDogs(juliaCorrected, kate);

// Callback fn in arrow
const eurToUsd = 1.1;
const movementsUSD = movements.map(mov => mov * eurToUsd);
console.log(movements);
console.log(movementsUSD);

// practises
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const withdrawal = movements.filter(mov => mov < 0);
console.log(withdrawal);

///////////////////////////////////////
// Coding Challenge #2

/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// using array methods
// const calcAverageHumanAge = arr => {
//   const humanAge = [];
//   arr.forEach(function (age) {
//     if (age <= 2) {
//       humanAge.push(2 * age);
//     } else {
//       humanAge.push(16 + age * 4);
//     }
//   });
//   const adult = humanAge.filter(function (age) {
//     return age >= 18;
//   });
//   const average =
//     adult.reduce(function (acc, val) {
//       return acc + val;
//     }, 0) / adult.length;
//   console.log(average);
// };

// Challenge 3
// using map,filter,reduce
const calcAverageHumanAge = arr => {
  return arr
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, val, _, arr) => acc + val / arr.length, 0);
};
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

const out = movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
labelSumOut.textContent = `${Math.abs(out)}€`;

///////////////////////////////////////
// Coding Challenge #4

/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/

const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];

// 1
const huskyWeight = breeds.find(arr => arr.breed === 'Husky').averageWeight;
console.log(huskyWeight);

// 2
const dogBothActivities = breeds.find(
  arr => arr.activities.includes('running') && arr.activities.includes('fetch'),
).breed;
console.log(dogBothActivities);

// 3
const allActivities = breeds.map(breeds => breeds.activities).flat();
console.log(allActivities);

// 4
const uniqueActivities = [...new Set(allActivities)];
console.log(uniqueActivities);

// 5
const swimmingAdjacent = [
  ...new Set(
    breeds
      .filter(breeds => breeds.activities.includes('swimming'))
      .flatMap(breeds => breeds.activities)
      .filter(activity => activity !== 'swimming'),
  ),
];
console.log(swimmingAdjacent);

// 6
console.log(breeds.every(breed => breed.averageWeight > 10));

// 7
console.log(breeds.some(breed => breed.activities.length >= 3));

// BONUS
const likeFetch = breeds
  .filter(breed => breed.activities.includes('fetch'))
  .map(breed => breed.averageWeight);

const heaviestFetchBreed = Math.max(...likeFetch);

console.log(likeFetch);
console.log(heaviestFetchBreed);

///////////////////////////////////////
// Coding Challenge #5

/*
Julia and Kate are still studying dogs. This time they are want to figure out if the dogs in their are eating too much or too little food.

- Formula for calculating recommended food portion: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
- Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
- Eating an okay amount means the dog's current food portion is within a range 10% above and below the recommended portion (see hint).

YOUR TASKS:
1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion (recFood) and add it to the object as a new property. Do NOT create a new array, simply loop over the array (We never did this before, so think about how you can do this without creating a new array).
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much (ownersTooMuch) and an array with all owners of dogs who eat too little (ownersTooLittle).
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
9. Group the dogs by the number of owners they have
10. Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1
dogs.forEach(dog => (dog.recFood = Math.floor(dog.weight ** 0.75 * 28)));

console.log(dogs);

// 2
const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(
  `Its eating too ${sarahDog.curFood > sarahDog.recFood ? 'much' : 'little'}`,
);

// 3
const ownersTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);

const ownersTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);

console.log(ownersTooLittle);
console.log(ownersTooMuch);

// 4
console.log(`${ownersTooLittle.join(' and ')}'s dogs eat too little`);
console.log(`${ownersTooMuch.join(' and ')}'s dogs eat too Much`);

// 5
console.log(dogs.some(dog => dog.curFood === dog.recFood));

// 6
console.log(
  dogs.every(
    dog => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1,
  ),
);

// 7
const okAmount = dogs.filter(
  dog => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1,
);

console.log(okAmount);

// 8
const result = Object.groupBy(dogs, dog => {
  if (dog.curFood === dog.recFood) return 'exact';
  else if (dog.curFood > dog.recFood) return 'too much';
  else if (dog.curFood < dog.recFood) return 'too little';
});
console.log(result);

// 9
const groupedOwners = Object.groupBy(dogs, dog => dog.owners.length);
console.log(groupedOwners);

// 10
const sortByRecFood = dogs.toSorted((a, b) => a.recFood - b.recFood);
console.log(sortByRecFood);
