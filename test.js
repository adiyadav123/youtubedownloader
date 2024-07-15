let string = "learnjavascriptloopsinhackerrankweekofcode";
let a = string.split("");
let vowels = ["a", "e", "i", "o", "u"];

let vw = a.filter((v) => vowels.includes(v)).join("\n");
let c = a.filter((v) => !vowels.includes(v)).join("\n");

let newVar = (vw + c).split("\n");
