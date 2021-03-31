import { yellow } from "chalk";
import { readFileSync, existsSync, writeFileSync } from "fs";
import { join } from "path";
import { table as Table } from 'table'


export class LongProjectList {
    private readonly store:string;

    /**
     * @constructor
     */
    constructor() {
        this.store = join(__dirname, "json", "store.json")
        const storeExists = this.checkFileExistence(this.store)

        // Check if the store exists, if not
        // no projects are created or saved
        if(!storeExists){
            console.log(yellow("It seems like you haven't created any project"))
            process.exit()
        }

        const data = readFileSync(this.store).toString()
        // if the data is not convertable to json
        // rewrite the file
        if(!this.convertToJson(data)){
            writeFileSync(
                this.store,
                JSON.stringify({
                  projects: [],
                })
            );
        }
        const project = JSON.parse(data).projects
        this.throwProjectList(project)
        process.exit()
    }

    /**
     * @private
     * 
     * Throws all the projects in the project list
     * 
     * @param project All the projects
     * @returns Dummy value
     */
    private throwProjectList = (project:Array<Object>):boolean => {
        for(let projectIndex=0; projectIndex<project.length; projectIndex++){
            console.log(project)
        }
        return true
    }

    /**
     * @private
     * 
     * Checks if a string can be parsed into
     * json data without any errors
     * 
     * @param data The data to check the conversion
     * @returns Returns a boolean
     */
    private convertToJson = (data:string):boolean => {
          try {
            let json = JSON.parse(data);
            return true;
          } catch (error) {
            return false;
          }
    }

    /**
     * @private
     * 
     * Check whether a file exists or not
     * 
     * @param filepath The path to check the existence
     * @returns Whether the file exists or not
     */
    private checkFileExistence = (filepath:string):boolean => {
        try {
            return existsSync(filepath)
        } catch(error){
            return false
        }
        return false
    }
}