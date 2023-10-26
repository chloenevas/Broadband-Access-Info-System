import { filepathDictionary } from "./mockedJson";

/**
 * Takes in a filepath and returns result message along with the
 * parsed csv of that filepath
 *
 * @param broadbandEntry - entry to be searched from API
 * @returns success or error message along with the parsed csv data
 */
export function broadband(entry: string) {
  var trimmedEntry = entry.slice(10); // removes "load_file " from the string
  var value = filepathDictionary.get(trimmedEntry); // gets parsed csv data
  if (value !== undefined) {
    return ["success!", value];
  }
  return [
    "Please check that a valid file path has been given. " +
      '"' +
      trimmedEntry +
      '"' +
      " is incorrect.",
    null,
  ];
}
