import fs from 'fs';
import path from 'path';

const data = 
`
const data = [
    {
        name : "book1"
    }
]
`;

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

const writeFile = (folder: string, fileName: string, outDir: string) => {
    fs.writeFile(folder += fileName, data, {flag: 'wx'},
        (err) => {
        if (err){
            i++;
            console.log("File Already Exists! Adding number to file name.");
            fileName = fileName.slice(0, fileName.length) + `${i}` + '.ts';
            createFile(folder, fileName, outDir);
            } else {
                console.log('File was written to Successfully!');
            }
        })
}

export default function createFile (folder: string, fileName: string, outDir: string) {
    console.log(outDir)
    if (checkfolderExists(folder)){
        writeFile(folder, fileName, outDir)
    } else {
        createFolder(folder)
        createFile(folder, fileName, outDir)
    }
}