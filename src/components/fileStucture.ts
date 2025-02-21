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

            let updatedParentDirPath: string = parentDirPath.replace(directory, "")
            updatedParentDirPath = updatedParentDirPath.replace(/\\/g, '');
            updatedParentDirPath = updatedParentDirPath.toLowerCase()

            let currentItemName: string = currentFilePath.replace(parentDirPath, '')

            let UcurrentItemName = currentItemName.replace(/\\/g, ''); // replace all forward and backward slashes and make all lowercase
            UcurrentItemName = UcurrentItemName.toLowerCase()
            UcurrentItemName = UcurrentItemName.replace('_nh_icon.png', '');
            UcurrentItemName = UcurrentItemName.replace("_", ' ');
            UcurrentItemName = UcurrentItemName.charAt(0).toUpperCase() + UcurrentItemName.slice(1) // change first letter to uppercase

            console.log("Item name!", currentItemName)

            console.log("parent dir path:", updatedParentDirPath)

            if (updatedParentDirPath == "bugs" || updatedParentDirPath == "bug"){
                const item = this.attachDataPartial(1, UcurrentItemName, parentDirPath + currentItemName)
                console.log(item)
                formattedData += item

            } else if (updatedParentDirPath == 'fish' || updatedParentDirPath == 'fishes'){
                const item = this.attachDataPartial(2, UcurrentItemName, parentDirPath + currentItemName)
                console.log(item)
                formattedData += item

            } else if (updatedParentDirPath == 'sea-creature' || updatedParentDirPath == 'sea-critter' || updatedParentDirPath == 'sea-creatures' || updatedParentDirPath == 'sea-critters'){
                const item = this.attachDataPartial(3, UcurrentItemName, parentDirPath + currentItemName)
                console.log(item)
                formattedData += item

            } else {
                const item = this.attachDataPartial(0, UcurrentItemName, parentDirPath + currentItemName)
                console.log(item)
                console.log("Item is not a fish, bug, or sea creature!!")
                formattedData += item
            }
        };

        formattedData += footer
        return formattedData
    }
}

export default FileBuild;