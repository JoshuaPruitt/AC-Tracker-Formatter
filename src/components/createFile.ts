import fs from 'fs';
import path from 'path';

import { stringify } from 'querystring';

// const data = 
// `
// const data = [
//     {
//         name : "book1"
//     }
// ]
// `;

let i = 0;

const checkfolderExists = (folderPath: string) => {
    try {
        fs.accessSync(folderPath, fs.constants.F_OK);
        return true;
    } catch (error) {
        return false;
    }
}

const createFolder = (folderPath: string) => {
    fs.mkdir(folderPath, (err) => {
        if(err){
            console.error("Folder could not be created!", err)
        } else {
            console.log("folder created successfully!")
        }
    })
    console.log("Creating folder")
}

const writeFile = (folder: string, fileName: string, data: any) => {
    console.log('folder:', folder)
    console.log("0:", folder += fileName)
    // Bug causing written files to have the name appended to the end of the file name
    fs.writeFile(folder += fileName, data, {flag: 'wx'},
        (err) => {
        if (err){
            let updatedFileName;
            i++;
            console.log("File Already Exists! Adding number to file name.");
            console.log("1", fileName)
            updatedFileName = fileName.replace('.ts', '')
            console.log("2", updatedFileName)
            updatedFileName = updatedFileName + `${i}` + '.ts';
            console.log("3", updatedFileName)
            writeFile(folder, updatedFileName, data);
            } else {
                console.log('File was written to Successfully!');
            }
        })
}

export function createFile (folder: string, fileName: string, data: any) {
    const updatedData = stringify(data)
    if (checkfolderExists(folder)){
        writeFile(folder, fileName, updatedData)
    } else {
        createFolder(folder)
        createFile(folder, fileName, updatedData)
    }
}

export function getAllFiles(dirPath: string, fileList: [] | never = []) {
    const files = fs.readdirSync(dirPath);
  
    for (const file of files) {
      const filePath: string = path.join(dirPath, file);
      const fileStat = fs.statSync(filePath);
  
      if (fileStat.isDirectory()) {
        getAllFiles(filePath, fileList); 
      } else {
        // @ts-ignore
        fileList.push(filePath);
      }
    }
    
    // console.log(fileList)
    return fileList;
};
  
//   const directoryPath = './your_directory';
//   const allFiles = getAllFiles(directoryPath);
//   console.log(allFiles);