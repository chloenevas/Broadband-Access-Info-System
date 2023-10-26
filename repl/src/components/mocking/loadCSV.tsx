import { filepathDictionary } from "./mockedJson";

/**
 * Takes in a filepath and returns result message along with the
 * parsed csv of that filepath
 *
 * @param filePath of the csv that is being loaded
 * @returns success or error message along with the parsed csv data
 */
export function load(filePath: string) {
  var trimmedPath = filePath.slice(10); // removes "load_file " from the string
  var value = filepathDictionary.get(trimmedPath); // gets parsed csv data
  if (value !== undefined) {
    return ["success!", value];
  }
  return [
    "Please check that a valid file path has been given. " +
      '"' +
      trimmedPath +
      '"' +
      " is incorrect.",
    null,
  ];
}
