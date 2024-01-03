var animalList = [
    { name: "Simba", species: "Lion" },
    { name: "Dumbo", species: "Elephant" },
    { name: "Melman", species: "Giraffe" },
    { name: "Shere Khan", species: "Tiger" },
    { name: "Skipper", species: "Penguin" },
    { name: "Kangaroo Jack", species: "Kangaroo" },
    { name: "Flipper", species: "Dolphin" },
    { name: "Koala Bear", species: "Koala" },
    { name: "Marty", species: "Zebra" },
    { name: "Curious George", species: "Monkey" }
]

var names =  animalList.map((x) => x.name )

console.log(names)


var amountList = [
    { amount: 10 },
    { amount: 5 },
    { amount: 8 },
    { amount: 15 },
    { amount: 3 },
    { amount: 7 }
]

var totalAmount = amountList.reduce((sum, order) => {
    return sum + order.amount

}, 0)