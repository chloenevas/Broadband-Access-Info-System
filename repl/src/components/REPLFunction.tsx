export interface REPLFunction {    
    (args: Array<string>): Promise<string | string[]>
}
