import path from 'path';
// The pieces that will be put together to create a data file

class FileBuild {

    attachImport(name: string, path: string) {
        const data =
`
import ${name} from "${path}";`;
        return data;
    };

    attachHeader(name: string) {
        let updatedName = name.replace('.ts', '');
        updatedName = updatedName.replace('-', '_');
        const data = 
`
export const ${updatedName} = [
`;
        return data;
    };

    attachDataFull(type: number, name: string, icon: string, description: string, month: number, time_of_day: number){
        const data = 
`
    {
        type : ${type},
        name : "${name}",
        icon : ${icon},
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
        icon : ${icon},
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

        let parentDirChunk = path.dirname(directory)
        parentDirChunk = path.dirname(parentDirChunk)
        // parentDirChunk = parentDirChunk.replace(/\\/g, '/');

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

            let iconPath = parentDirPath + currentItemName;
            iconPath = iconPath.replace(parentDirChunk, '../..'); // Replace the directory chunk with a ../ for imports
            iconPath = iconPath.replace(/\\/g, '/'); // replace all forward slashes with backslashes

            let itemImportName = UcurrentItemName + 'Icon';
            itemImportName = itemImportName.replace(' ', '');
            itemImportName = itemImportName.replace('-', '');
            itemImportName = itemImportName.replace("'", '');
            itemImportName = itemImportName.replace('(', "");
            itemImportName = itemImportName.replace(')', "");

            let importHead = this.attachImport(itemImportName, iconPath);
            formattedData = importHead + formattedData;


            console.log("Item name!", currentItemName)

            console.log("parent dir path:", updatedParentDirPath)

            if (updatedParentDirPath == "bugs" || updatedParentDirPath == "bug"){
                const item = this.attachDataPartial(1, UcurrentItemName, itemImportName)
                console.log(item)
                formattedData += item

            } else if (updatedParentDirPath == 'fish' || updatedParentDirPath == 'fishes'){
                const item = this.attachDataPartial(2, UcurrentItemName, itemImportName)
                console.log(item)
                formattedData += item

            } else if (updatedParentDirPath == 'sea-creature' || updatedParentDirPath == 'sea-critter' || updatedParentDirPath == 'sea-creatures' || updatedParentDirPath == 'sea-critters'){
                const item = this.attachDataPartial(3, UcurrentItemName, itemImportName)
                console.log(item)
                formattedData += item

            } else {
                const item = this.attachDataPartial(0, UcurrentItemName, itemImportName)
                console.log(item)
                console.log("Item is not a fish, bug, or sea creature!!")
                formattedData += item
            }
        };

        console.log("chunk",parentDirChunk)

        formattedData += footer
        return formattedData
    }
}

export default FileBuild;