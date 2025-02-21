import fs from 'fs';
import path from 'path';
// The pieces that will be put together to create a data file

class FileBuild {

    attachHeader(name: string) {
        const data = 
`
export const ${name} = [
`;
        return data;
    };

    attachDataFull(type: number, name: string, icon: string, description: string, month: number, time_of_day: number){
        const data = 
`
    {
        type : ${type},
        name : "${name}",
        icon : "${icon}",
        description : "${description}",
        month : ${month},
        time_of_day : ${time_of_day}
    },
`;
        return data;
    };

    attachDataPartial(type: number, name: string, icon: string){
        const data = 
`
    {
        type : ${type},
        name : "${name}",
        icon : "${icon}",
        description : "",
        month : 1,
        time_of_day : 1
    },
`;
        return data;
    };

    attachFooter(){
        const data = 
`
];
`;
        return data;
    };

    formatData(data: string[], directory: string, dataName: string) {
        const header = this.attachHeader(dataName);
        const footer = this.attachFooter();
        let formattedData: string = '';

        formattedData += header

        for (let i = 0; i < data.length; i++){
            const currentFilePath = data[i] // Gets the full path of the current file
            const parentDirPath = path.dirname(currentFilePath); // Extracts the parent directory path
            const updatedParentDirPath: string = parentDirPath.replace(directory, "")
            const currentItemName: string = currentFilePath.replace(updatedParentDirPath, '')

            console.log("Item name!", currentItemName)

            console.log("parent dir path:", updatedParentDirPath)

            if (parentDirPath == "\bugs" || "\bug"){
                const item = this.attachDataPartial(1, currentItemName, directory)
                console.log(item)
                formattedData += item

            } else if (parentDirPath == '\fish' || '\fishes'){
                const item = this.attachDataPartial(2, currentItemName, directory)
                console.log(item)
                formattedData += item

            } else if (parentDirPath == '\sea-creature' || '\sea-critter'){
                const item = this.attachDataPartial(3, currentItemName, directory)
                console.log(item)
                formattedData += item

            } else {
                const item = this.attachDataPartial(0, currentItemName, directory)
                console.log(item)
                console.log("Item is not a fish, bug, or sea creature!!")
                formattedData += item
            }
        };

        formattedData += footer
        console.log(formattedData)
        return formattedData
    }
}

export default FileBuild;