import {createFile, getAllFiles, createFileWithExtraSteps} from "./components/createFile"
import FileBuild from "./components/fileStucture";
import inquirer from "inquirer"


inquirer
    .prompt([
        {
            type: 'input',
            message: "What do you wish to name the file?",
            name: 'fileName',
        },

        {
            type: "input",
            message: "Where is the directory of the files you wish to use?",
            name: 'directory'
        },

        {
            type: "confirm",
            message: "Do you want to enter the data for each item?",
            name: 'fullChoice'
        }
    ])
    .then(({fileName, directory, fullChoice}) => {
        //get files
        const files = getAllFiles(directory)

        console.log(fullChoice)

        //create formatted data
        const newFile = new FileBuild
        const data = newFile.formatData(files, directory, fileName)
        
        if(fullChoice == true){
            createFileWithExtraSteps('./output/', fileName, data)
        } else {
            //create an output file
            createFile("./output/", fileName, data)
        }
    })
    .catch((err) => {
        if (err.isTtyError){
            console.error("Error with inquirer:", err)
        } else {
            console.error("Error with inquirer:", err)
        }
    });


// const runFormatter = () => {
//     console.log("Formatter started!")
//     createFile("./output/","data.ts")
// }

// //initialize
// runFormatter()