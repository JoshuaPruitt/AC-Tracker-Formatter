import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';


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
    let filePath = path.join(folder, fileName);
    let ext = path.extname(fileName);
    let baseName = path.basename(fileName, ext)
    let counter = 1;

    console.log('folder:', folder)
    console.log("0:", path.join(folder, fileName))

    const tryWriteFile = (currentPath: string) => {
        fs.writeFile(currentPath, data, {flag: 'wx'}, (err) => {
            if (err){
                if (err.code === "EEXIST"){
                    const newFilePath = path.join(folder, `${baseName} (${counter})${ext}`);
                    counter++;
                    tryWriteFile(newFilePath);
                } else {
                    console.error("Error writing file:", err);
                }
            } else {
                console.log('File was written successfully:', currentPath);
            }
        })
    }

    tryWriteFile(filePath)
}

export function createFile (folder: string, fileName: string, data: any) {
    // const updatedData = stringify(data)
    if (checkfolderExists(folder)){
        writeFile(folder, fileName, data)
    } else {
        createFolder(folder)
        createFile(folder, fileName, data)
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
  