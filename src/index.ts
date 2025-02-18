import createFile from "./components/createFile"

const runFormatter = () => {
    console.log("Formatter started!")
    createFile("./output/","data.ts", "dir")
}

//initialize
runFormatter()