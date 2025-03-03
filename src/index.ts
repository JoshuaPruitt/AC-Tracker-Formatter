import {createFile, getAllFiles} from "./components/createFile"
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
        if(fullChoice == true){
            // const newFile = new FileBuild
            // const data = await newFile.formatDataFull(files, directory, fileName)
            // createFile('./output/', fileName, data)

            writeDataFull(files, directory, fileName)

        } else {
            const newFile = new FileBuild
            const data = newFile.formatData(files, directory, fileName)
            createFile('./output/', fileName, data)
        }

    })
    .catch((err) => {
        if (err.isTtyError){
            console.error("Error with inquirer:", err)
        } else {
            console.error("Error with inquirer:", err)
        }
});

const writeDataFull = async (files: any, directory: any, fileName: any) => {
    const newFile = new FileBuild
    const data = await newFile.formatDataFull(files, directory, fileName)
    createFile('./output/', fileName, data)
};
