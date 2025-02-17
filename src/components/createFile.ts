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

export default function createFile (fileName: string, outDir: string) {
    console.log(outDir)
    fs.writeFile(fileName, data, {flag: 'wx'},
        (err) => {
        if (err){
            i++;
            console.log("File Already Exists! Adding number to file name.");
            fileName = fileName.slice(0, 15) + `${i}` + '.ts';
            createFile(fileName, outDir);
            } else {
                console.log('File was written to Successfully!');
            }
        })
}