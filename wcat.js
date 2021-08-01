// Build wcat commnad

// It is used to display or make a copy content of one or more files in the terminal 


// General Syntax:
// node wcat.js [options] [filepaths]
// option to remove big line break (-s)
// option to add line number to non empty lines (-b)
// option to add line numbers to all lines (-n) 

// Commands:
// 1- node wcat.js filepath => displays content of the file in the terminal 
// 2- node wcat.js filepath1 filepath2 filepath3... => displays content of all files in the terminal 
//in (contactinated form) in the given order.
// 3- node wcat.js -s filepath => convert big line breaks into a singular line break
// 4- node wcat.js -n filepath => give numbering to all the lines 
// 5- node wcat -b filepath => give numbering to non-empty lines
// We can mix and match the options.

// Edge cases:
// 1- If file entered is not found then it gives file does not exist error.
// 2- -n and -b are 2 options which are mutually exclusive so if user types both of them together 
//only the first enter option should work.
// 3- 

let fs = require("fs");


// 1. MANAGING INPUT
let inputArr = process.argv.slice(2);
let optionsArr = [];
let filesArr = [];
for(let i = 0 ; i < inputArr.length ; i++){
    let firstchar = inputArr[i].charAt(0);
    if(firstchar == '-'){
        optionsArr.push(inputArr[i]);
    }
    else{
        filesArr.push(inputArr[i]);
    }
}
// let isBothPresent = optionsArr.includes("-n") && optionsArr.includes("-b");
// if(isBothPresent == true){
//     console.log("EITHER ENTER -n OR -b COMMAND");
//     return;
// }

// 2. MANAGING FIRST TWO COMMANDS
let content = "";
for(let i = 0 ; i < filesArr.length ; i++){
    let ans = fs.existsSync(filesArr[i]);
    if(ans == false){
        console.log(`FILE ${filesArr[i]} DOES NOT EXIST`);
        return;
    }
    content = content + fs.readFileSync(filesArr[i]) + "\r\n";
}
console.log("DISPLAYING THE CONTENT OF FILE");
console.log(content);


// 3. IMPLEMENTING -S COMMAND
let contentArr = content.split("\r\n");
// console.log(contentArr);
let isSPresent = optionsArr.includes("-s");
if(isSPresent == true){
    for(let i = 1 ; i < contentArr.length ; i++){
        if(contentArr[i] == "" && contentArr[i-1] == ""){
            contentArr[i] = null;
        }
        else if(contentArr[i] == "" && contentArr[i-1] == null){
            contentArr[i] = null;
        }
    }
    let tempArr = [];
    for(let i = 0 ; i < contentArr.length ; i++){
        if(contentArr[i] != null){
            tempArr.push(contentArr[i]);
        }
    }
    contentArr = tempArr;
    console.log("AFTER IMPLEMENTING -S COMMAND");
    console.log(contentArr.join("\n"));
}


// 4. IMPLEMENTING -N COMMAND
function ncommand(){
    // let isNPresent = optionsArr.includes("-n");
    //   if(isNPresent == true){
      for(let i = 0 ; i < contentArr.length ; i++){
          contentArr[i] = `${i + 1} ${contentArr[i]} `;
        }
        console.log("AFTER IMPLEMENTING -N COMMAND");
        console.log(contentArr.join("\n"));
     }
// }

// 5 . IMPLEMENTING -B COMMAND
function bcommand(){
    // let isBPresent = optionsArr.includes("-b");
    // if(isBPresent == true){
       let counter = 1;
       for(let i = 0 ; i < contentArr.length ; i++){
            if(contentArr[i] != ""){
            contentArr[i] = `${counter} ${contentArr[i]}`;
            counter++;
        }
    }
       console.log("AFTER IMPLEMENTING -B COMMAND");
       console.log(contentArr.join("\n")); 
    }
// }
let indexOfN = optionsArr.indexOf("-n");
let indexOfB = optionsArr.indexOf("-b");
let finaloption = "";
if(indexOfB > -1 && indexOfN > -1){
    if(indexOfN < indexOfB){
        finaloption = "-n";
    }
    else{
        finaloption = "-b";
    }
}
else{
    if(indexOfN > -1){
        finaloption = "-n";
    }
    else if(indexOfB > -1){
        finaloption = "-b";
    }
}
if(finaloption == "-n"){
    ncommand();
}
else if(finaloption == "-b"){
    bcommand();
}

