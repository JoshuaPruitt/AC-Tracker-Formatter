import inquirer from 'inquirer';
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

    attachDataFull(
        type: number, 
        name: string, 
        icon: string, 
        weather: number, 
        month: {
            north: number[],
            south: number[],
        }, 
        time_of_day: number[], 
        totalCatches: number,

        optional?: {
            bugLocation?: number,
            fishLocation?: number,

            seaCreatureShadowSize?: number,
            seaCreatureShadowMovement?: number,
        }
    ){
        if(type === 1 && optional && optional.bugLocation){
            const data = 
`
    {
        type : ${type},
        name : "${name}",
        icon : ${icon},
        weather: ${weather},
        month : {
            north: [${month.north}],
            south: [${month.south}],
        },
        time_of_day : [${time_of_day}],
        totalCatches: ${totalCatches},

        bugLocation: '${optional.bugLocation}'
    },
`;
            return data;

        } else if (type === 2 && optional && optional.fishLocation){
            const data = 
`
    {
        type : ${type},
        name : "${name}",
        icon : ${icon},
        weather: ${weather},
        month : {
            north: [${month.north}],
            south: [${month.south}],
        },
        time_of_day : [${time_of_day}],
        totalCatches: ${totalCatches},

        fishLocation: '${optional.fishLocation}',
    },
`;
        return data;
        } else if (type === 3 && optional && optional.seaCreatureShadowMovement && optional.seaCreatureShadowSize){
            const data = 
`
    {
        type : ${type},
        name : "${name}",
        icon : ${icon},
        weather: ${weather},
        month : {
            north: [${month.north}],
            south: [${month.south}],
        },
        time_of_day : [${time_of_day}],
        totalCatches: ${totalCatches},

        seaCreatureShadowMoveMent: '${optional.seaCreatureShadowMovement}',
        seaCreatureShadowSize: '${optional.seaCreatureShadowSize}',
    },
`;
        return data;
        } else {
            const data = 
`
    {
        type : ${type},
        name : "${name}",
        icon : ${icon},
        weather: ${weather},
        month : {
            north: [${month.north}],
            south: [${month.south}],
        },
        time_of_day : [${time_of_day}],
        totalCatches: ${totalCatches},
    },
`;
            return data;
        }
    };

    attachDataPartial(type: number, name: string, icon: string){
        if(type === 1){
            const data = 
`
    {
        type : ${type},
        name : "${name}",
        icon : ${icon},
        weather: 0,
        month : {
            north: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            south: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        time_of_day : [0, 24], 
        totalCatches: 20,

        bugLocation: '',
    },
`;
            return data;
        } else if (type === 2){
            const data = 
`
    {
        type : ${type},
        name : "${name}",
        icon : ${icon},
        weather: 0,
        month : {
            north: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            south: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        time_of_day : [0, 24], 
        totalCatches: 20,

        fishLocation: '',
    },
`;
            return data;
        } else if (type === 3){
            const data = 
`
    {
        type : ${type},
        name : "${name}",
        icon : ${icon},
        weather: 0,
        month : {
            north: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            south: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        time_of_day : [0, 24], 
        totalCatches: 20,

        seaCreatureShadowMoveMent: '',
        seaCreatureShadowSize: '',
    },
`;
            return data;
        } else {
            const data = 
`
    {
        type : ${type},
        name : "${name}",
        icon : ${icon},
        weather: 0,
        month : {
            north: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            south: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        time_of_day : [0, 24], 
        totalCatches: 20,
    },
`;
            return data
        }
    }

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

    //Will let users format data on their own
    async formatDataFull(data: string[], directory: string, dataName: string) {
        const bugPrompt: any[any] = [

            {
                type: 'rawlist',
                name: 'weather',
                message: "On what type of weather does the bug appear?",
                choices: [
                    'All weather',
                    'All except rain',
                    "Only on rain"
                ]
            },

            {
                type: 'checkbox',
                name: "month_north",
                message: "What months does this bug appear (northern hemisphere)",
                choices: [
                    'January',
                    "Febuary",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                ]
            },

            {
                type: 'checkbox',
                name: "month_south",
                message: "What months does this bug appear (Southern hemisphere)",
                choices: [
                    'January',
                    "Febuary",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                ]
            },

            {
                type: 'input',
                name: 'start_time',
                message: "What time does your bug start to appear?",
            },
        
            {
                type: 'input',
                name: 'end_time',
                message: "What time does your bug stop appearing?",
            },

            {
                type: 'input',
                name: 'total_catches',
                message: "How many catches does it take before you can see this bug?",
            },

            {
                type: 'list',
                name: 'location',
                message: "What time does your bug start to appear?",
                choices: [
                    'Flying',
                    'Flying near flowers',
                    "On the ground",
                    "On flowers",
                    "On trees (any kind)",
                    "Flying near water",
                    "On trees (hardwood and cedar)",
                    "On palm trees",
                    "Pushing snowballs",
                    "Disguised under trees",
                    "Underground",
                    "On rivers and ponds",
                    "On tree stumps",
                    "On rocks and bushes",
                    "From hitting rocks",
                    "Shaking trees",
                    "On/near spoiled turnips/candy/lolipops",
                    "Flying near trash or rotten turnips",
                    "Shaking trees (hardwood and cedar)",
                    "Disguised on shoreline",
                    "On beach rocks",
                    "Flying near light sources",
                    "On white flowers",
                    "Shaking non-fruit hardwood trees or cedar trees",
                    "Flying near blue, purple, and black flowers",
                    "On villagers",
                ]
            }
        ];

        const fishPrompt: any[any] = [
            {
                type: 'rawlist',
                name: 'weather',
                message: "On what type of weather does this fish appear?",
                choices: [
                    'All weather',
                    'All except rain',
                    "Only on rain"
                    ]
            },
        
            {
                type: 'checkbox',
                name: "month_north",
                message: "What months does this fish appear (northern hemisphere)",
                choices: [
                    'January',
                    "Febuary",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                ]
            },
        
            {
                type: 'checkbox',
                name: "month_south",
                message: "What months does this fish appear (Southern hemisphere)",
                choices: [
                    'January',
                    "Febuary",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
               ]
            },
        
            {
                type: 'input',
                name: 'start_time',
                message: "What time does your fish start to appear?",
            },
        
            {
                type: 'input',
                name: 'end_time',
                message: "What time does your fish stop appearing?",
            },
        
            {
                type: 'input',
                name: 'total_catches',
                message: "How many catches does it take before you can see this fish?",
            },
        
            {
                type: 'list',
                name: 'location',
                message: "Where does this fish appear?",
                choices: [
                    'River',
                    'Pond',
                    "River (Clifftop)",
                    "River (Mouth)",
                    "Sea",
                    "Pier"
                ]
            }
        ];

        const seaCreaturePrompt: any[any] = [

            {
                type: 'rawlist',
                name: 'weather',
                message: "On what type of weather does this sea creature appear?",
                choices: [
                    'All weather',
                    'All except rain',
                    "Only on rain"
                ]
            },

            {
                type: 'checkbox',
                name: "month_north",
                message: "What months does this sea creature appear (northern hemisphere)",
                choices: [
                    'January',
                    "Febuary",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                ]
            },

            {
                type: 'checkbox',
                name: "month_south",
                message: "What months does this sea creature appear (Southern hemisphere)",
                choices: [
                    'January',
                    "Febuary",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                ]
            },

            {
                type: 'input',
                name: 'start_time',
                message: "What time does this sea creature start to appear?",
            },

            {
                type: 'input',
                name: 'end_time',
                message: "What time does this sea creature bug stop appearing?",
            },

            {
                type: 'input',
                name: 'total_catches',
                message: "How many catches does it take before you can see this sea creature?",
            },

            {
                type: 'list',
                name: "seaCreatureShadowSpeed",
                message: "What speed does this sea creature move at?",
                choices: [
                    'Stationary',
                    "Very slow",
                    "Slow",
                    'Medium',
                    'Fast',
                    "Very Fast"
                ]
            },

            {
                type: 'list',
                name: "seaCreatureShadowSize",
                message: "What size is this sea creatures shadow?",
                choices: [
                    'Tiny',
                    "Small",
                    "Medium",
                    'Large',
                    'Very Large',
                ]
            }
        ];

        const uncategorizedPrompt: any[any] = [
            {
                type: 'rawlist',
                name: 'weather',
                message: "On what type of weather does the bug appear?",
                choices: [
                    'All weather',
                    'All except rain',
                    "Only on rain"
                ]
            },

            {
                type: 'checkbox',
                name: "month_north",
                message: "What months does this bug appear (northern hemisphere)",
                choices: [
                    'January',
                    "Febuary",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                ]
            },

            {
                type: 'checkbox',
                name: "month_south",
                message: "What months does this bug appear (Southern hemisphere)",
                choices: [
                    'January',
                    "Febuary",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                ]
            },

            {
                type: 'input',
                name: 'start_time',
                message: "What time does your bug start to appear?",
            },

            {
                type: 'input',
                name: 'end_time',
                message: "What time does your bug stop appearing?",
            },

            {
                type: 'input',
                name: 'total_catches',
                message: "How many catches does it take before you can see this bug?",
            },

            {
                type: 'list',
                name: 'location',
                message: "What time does your bug start to appear?",
                choices: [
                    'Flying',
                    'Flying near flowers',
                    "On the ground",
                    "On flowers",
                    "On trees (any kind)",
                    "Flying near water",
                    "On trees (hardwood and cedar)",
                    "On palm trees",
                    "Pushing snowballs",
                    "Disguised under trees",
                    "Underground",
                    "On rivers and ponds",
                    "On tree stumps",
                    "On rocks and bushes",
                    "From hitting rocks",
                    "Shaking trees",
                    "On/near spoiled turnips/candy/lolipops",
                    "Flying near trash or rotten turnips",
                    "Shaking trees (hardwood and cedar)",
                    "Disguised on shoreline",
                    "On beach rocks",
                    "Flying near light sources",
                    "On white flowers",
                    "Shaking non-fruit hardwood trees or cedar trees",
                    "Flying near blue, purple, and black flowers",
                    "On villagers",
                ]
            }
        ]

        const header = this.attachHeader(dataName);
        const footer = this.attachFooter();
        let formattedData: string = '';

        formattedData += header

        let parentDirChunk = path.dirname(directory)
        parentDirChunk = path.dirname(parentDirChunk)
        // parentDirChunk = parentDirChunk.replace(/\\/g, '/');

        for(let i = 0; i < data.length; i++){
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

            console.log("\nCreature Name:", UcurrentItemName)

            // console.log("parent dir path:", updatedParentDirPath)

            if(updatedParentDirPath == 'bug' || updatedParentDirPath == 'bugs'){
                const answers = await inquirer.prompt(bugPrompt)
                const {weather, month_north, month_south, start_time, end_time, total_catches, location} = answers
                console.log(`Weather: ${weather}`)
                console.log(`Month (North): ${month_north}`)
                console.log(`Month (South): ${month_south}`)
                console.log(`Start Time: ${start_time}`)
                console.log(`End Time: ${end_time}}`)
                console.log(`Total Catches: ${total_catches}`)
                console.log(`Total Catches: ${location}`)

                const time_of_day = [start_time, end_time]
                const weatherData = this.changeWeatherToData(weather)
                const monthsData = this.changeMonthsToData(month_north, month_south)
                const entryData = this.attachDataFull(1, UcurrentItemName, itemImportName, weatherData, {north: monthsData.northern_hemiStart, south: monthsData.southern_hemiStart},time_of_day, total_catches, {bugLocation: location})
                formattedData += entryData


            } else if (updatedParentDirPath == 'fish' || updatedParentDirPath == 'fishes') {
                const answers = await inquirer.prompt(fishPrompt)
                const {weather, month_north, month_south, start_time, end_time, total_catches, location} = answers
                console.log(`Weather: ${weather}`)
                console.log(`Month (North): ${month_north}`)
                console.log(`Month (South): ${month_south}`)
                console.log(`Start Time: ${start_time}`)
                console.log(`End Time: ${end_time}}`)
                console.log(`Total Catches: ${total_catches}`)

                const time_of_day = [start_time, end_time]
                const weatherData = this.changeWeatherToData(weather)
                const monthsData = this.changeMonthsToData(month_north, month_south)
                const entryData = this.attachDataFull(2, UcurrentItemName, itemImportName, weatherData, {north: monthsData.northern_hemiStart, south: monthsData.southern_hemiStart},time_of_day, total_catches, {fishLocation: location})
                formattedData += entryData

            } else if (updatedParentDirPath == 'sea-creature' || updatedParentDirPath == 'sea-critter' || updatedParentDirPath == 'sea-creatures' || updatedParentDirPath == 'sea-critters'){
                const answers = await inquirer.prompt(seaCreaturePrompt)
                const {weather, month_north, month_south, start_time, end_time, total_catches, seaCreatureShadowSpeed, seaCreatureShadowSize} = answers
                console.log(`Weather: ${weather}`)
                console.log(`Month (North): ${month_north}`)
                console.log(`Month (South): ${month_south}`)
                console.log(`Start Time: ${start_time}`)
                console.log(`End Time: ${end_time}}`)
                console.log(`Total Catches: ${total_catches}`)

                const time_of_day = [start_time, end_time]
                const weatherData = this.changeWeatherToData(weather)
                const monthsData = this.changeMonthsToData(month_north, month_south)
                const entryData = this.attachDataFull(3, UcurrentItemName, itemImportName, weatherData, {north: monthsData.northern_hemiStart, south: monthsData.southern_hemiStart},time_of_day, total_catches, {seaCreatureShadowMovement: seaCreatureShadowSpeed, seaCreatureShadowSize: seaCreatureShadowSize})
                formattedData += entryData

            } else {
                const answers = await inquirer.prompt(uncategorizedPrompt)
                const {weather, month_north, month_south, start_time, end_time, total_catches} = answers
                console.log(`Weather: ${weather}`)
                console.log(`Month (North): ${month_north}`)
                console.log(`Month (South): ${month_south}`)
                console.log(`Start Time: ${start_time}`)
                console.log(`End Time: ${end_time}}`)
                console.log(`Total Catches: ${total_catches}`)

                const time_of_day = [start_time, end_time]
                const weatherData = this.changeWeatherToData(weather)
                const monthsData = this.changeMonthsToData(month_north, month_south)
                const entryData = this.attachDataFull(0, UcurrentItemName, itemImportName, weatherData, {north: monthsData.northern_hemiStart, south: monthsData.southern_hemiStart},time_of_day, total_catches)
                formattedData += entryData
            }
        }
        console.log("chunk",parentDirChunk)

        formattedData += footer
        return formattedData
    }

    changeWeatherToData(weather: any){
        if(weather == 'All weather'){
            return 0
        } else if (weather == "All except rain"){
            return 1
        } else if (weather == "Only on rain"){
            return 2
        } else {
            return 0
        }
    }

    changeMonthsToData(northern_hemisphere: string[], southern_hemisphere: string[]){
        let northern_hemiStart: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let southern_hemiStart: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

        for(let i = 0; i < northern_hemisphere.length; i++){
            if(northern_hemisphere[i] == "January"){
                northern_hemiStart[0] = 1;
            } else if(northern_hemisphere[i] == "Febuary"){
                northern_hemiStart[1] = 1;
            } else if(northern_hemisphere[i] == "March"){
                northern_hemiStart[2] = 1;
            } else if(northern_hemisphere[i] == "April"){
                northern_hemiStart[3] = 1;
            } else if(northern_hemisphere[i] == "May"){
                northern_hemiStart[4] = 1;
            } else if(northern_hemisphere[i] == "June"){
                northern_hemiStart[5] = 1;
            } else if(northern_hemisphere[i] == "July"){
                northern_hemiStart[6] = 1;
            } else if(northern_hemisphere[i] == "August"){
                northern_hemiStart[7] = 1;
            } else if(northern_hemisphere[i] == "September"){
                northern_hemiStart[8] = 1;
            } else if(northern_hemisphere[i] == "October"){
                northern_hemiStart[9] = 1;
            } else if(northern_hemisphere[i] == "November"){
                northern_hemiStart[10] = 1;
            } else if(northern_hemisphere[i] == "December"){
                northern_hemiStart[11] = 1;
            }
            // switch(northern_hemisphere[i]){
            //     case "January":
            //         northern_hemiStart[0] = 1
            //     case "Febuary":
            //         northern_hemiStart[1] = 1
            //     case "March":
            //         northern_hemiStart[2] = 1 
            //     case "April":
            //         northern_hemiStart[3] = 1 
            //     case "May":
            //         northern_hemiStart[4] = 1
            //     case "June":
            //         northern_hemiStart[5] = 1  
            //     case "July":
            //         northern_hemiStart[6] = 1
            //     case "August":
            //         northern_hemiStart[7] = 1
            //     case "September":
            //         northern_hemiStart[8] = 1
            //     case "October":
            //         northern_hemiStart[9] = 1
            //     case "November":
            //         northern_hemiStart[10] = 1
            //     case "December":
            //         northern_hemiStart[11] = 1
            // }
        }

        for(let i = 0; i < southern_hemisphere.length; i++){
            if(southern_hemisphere[i] == "January"){
                southern_hemiStart[0] = 1;
            } else if(southern_hemisphere[i] == "Febuary"){
                southern_hemiStart[1] = 1;
            } else if(southern_hemisphere[i] == "March"){
                southern_hemiStart[2] = 1;
            } else if(southern_hemisphere[i] == "April"){
                southern_hemiStart[3] = 1;
            } else if(southern_hemisphere[i] == "May"){
                southern_hemiStart[4] = 1;
            } else if(southern_hemisphere[i] == "June"){
                southern_hemiStart[5] = 1;
            } else if(southern_hemisphere[i] == "July"){
                southern_hemiStart[6] = 1;
            } else if(southern_hemisphere[i] == "August"){
                southern_hemiStart[7] = 1;
            } else if(southern_hemisphere[i] == "September"){
                southern_hemiStart[8] = 1;
            } else if(southern_hemisphere[i] == "October"){
                southern_hemiStart[9] = 1;
            } else if(southern_hemisphere[i] == "November"){
                southern_hemiStart[10] = 1;
            } else if(southern_hemisphere[i] == "December"){
                southern_hemiStart[11] = 1;
            }
            // switch(southern_hemisphere[i]){
            //     case "January":
            //         southern_hemiStart[0] = 1
            //     case "Febuary":
            //         southern_hemiStart[1] = 1
            //     case "March":
            //         southern_hemiStart[2] = 1 
            //     case "April":
            //         southern_hemiStart[3] = 1 
            //     case "May":
            //         southern_hemiStart[4] = 1
            //     case "June":
            //         southern_hemiStart[5] = 1  
            //     case "July":
            //         southern_hemiStart[6] = 1
            //     case "August":
            //         southern_hemiStart[7] = 1
            //     case "September":
            //         southern_hemiStart[8] = 1
            //     case "October":
            //         southern_hemiStart[9] = 1
            //     case "November":
            //         southern_hemiStart[10] = 1
            //     case "December":
            //         southern_hemiStart[11] = 1
            // }
        }

        return {northern_hemiStart, southern_hemiStart}
    }
}

export default FileBuild;