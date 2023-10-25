/**
 * This interface is used to restrict the functionality
 * of any command function to be added to the registry. All
 * commands in the registry must implement this function by
 * receiving command lines as the argument and returning a promise.
 */
export interface REPLFunction {    
    (args: Array<string>): Promise<string>
}
