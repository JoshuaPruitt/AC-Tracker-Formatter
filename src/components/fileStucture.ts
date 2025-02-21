import fs from 'fs';
import path from 'path';
// The pieces that will be put together to create a data file

class FileBuild {
    // type: number

    // constructor(data: any){
    //     this.type = data.type
    // }

    attachHeader(name: string) {
        return 
`
export const ${name} = [
`;
    };

    attachDataFull(type: number, name: string, description: string, month: number, time_of_day: number){
    
        return 
`
    {
        type : ${type},
        name : "${name}",
        description : "${description}",
        month : ${month},
        time_of_day : ${time_of_day}
    }
`;
    };

    attachDataPartial(type: number, name: string){
        return
`
    {
        type : ${type},
        name : "${name}",
        description : "",
        month : 1,
        time_of_day : 1
    }
`;
    };

    attachFooter(){
        return
`
];
`;
    };

    formatData(data: string[], directory: string) {
        const header = this.attachHeader;
        const footer = this.attachFooter;
        let formattedData: string = '';

        formattedData += header

        for (let i = 0; i < data.length; i++){
            const currentFilePath = data[i] // Gets the full path of the current file
            const parentDirPath = path.dirname(currentFilePath); // Extracts the parent directory path
            const updatedParentDirPath: string = parentDirPath.replace(directory, "")

            const currentItemName: string = currentFilePath.replace(directory += updatedParentDirPath, '')
            console.log("Item name!", currentItemName)

            console.log("parent dir path:", updatedParentDirPath)

            if (parentDirPath == "\bugs" || "\bug"){
                const item = this.attachDataPartial(1, currentItemName)
                formattedData += item

            } else if (parentDirPath == '\fish' || '\fishes'){
                const item = this.attachDataPartial(2, currentItemName)
                formattedData += item

            } else if (parentDirPath == '\sea-creature' || '\sea-critter'){
                const item = this.attachDataPartial(3, currentItemName)
                formattedData += item

            } else {
                const item = this.attachDataPartial(0, currentItemName)
                console.log("Item is not a fish, bug, or sea creature!!")
                formattedData += item
            }
        };

        formattedData += footer
        return formattedData
    }
}


// export const dataHeader = 
// `
// export const data = [
// `;

// export const dataFooter = 
// `
// ];
// `;

// export function dataEntry(type: number, name: string, description: string, month: number, time_of_day: number, full: boolean){
//     if (full){
//         return 
// `
//     {
//         type : ${type},
//         name : "${name}",
//         description : "${description}",
//         month : ${month},
//         time_of_day : ${time_of_day}
//     }
// `;
//     };
    
//     return
// `
//     {
//         type : ${type},
//         name : "${name}",
//         description : "",
//         month : 1,
//         time_of_day : 1
//     }
// `;
// } 

export default FileBuild;