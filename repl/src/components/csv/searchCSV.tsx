import { mainSearchDict } from "../data/mockedJson";
import { filepathDictionary } from "../data/mockedJson";


/**
 * Searches for a specific value in a CSV data set based on user input.
 *
 * @param {string} input - The input string provided by the user.
 * @param {string} data - The name of the CSV data set to search in.
 * @returns {string} - The search result or an error message.
 */
export function search(input: string, data: string) {
  var search = input.slice(7); // Remove "search " from the input
  var searchComps: string[] = [];
  // Create an array containing the header & search value - split it based on
  // where there are quotations so that two-word headers or entries can be used
  // when surrounded by quotes

  // credit for regex:
  // https://stackoverflow.com/questions/16261635/javascript-split-string-by-space-but-ignore-space-in-quotes-notice-not-to-spli
  const matches = search.match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g);

  if (matches !== null) {
    searchComps = matches;
  }

  var header = "";
  var value = "";

  // If the user entered a header
  if (searchComps.length === 2) {
    header = searchComps[0].toLowerCase();
    // If the header has quotes at the beginning and end (meaning it's a multi-word entry)
    if (header[0] === '"' && header[header.length - 1] === '"') {
      header = header.substring(1, header.length - 1).toLowerCase();
    }
    header = header + ","; // Add a comma just for consistency with mocked key entries
    value = searchComps[1].toLowerCase();
  }

  // If there's no header, ignore it
  else if (searchComps.length === 1) {
    header = "";
    value = searchComps[0].toLowerCase();
  }

  // Handle if the value is a multi-word entry
  if (value[0] === '"' && value[value.length - 1] === '"') {
    value = value.substring(1, value.length - 1);
  }

  var specificDict = mainSearchDict.get(data); // Get the dictionary of this CSV file
  if (specificDict === undefined) {
    return "Please Load a File First!";
  }
  var response = specificDict.get(header + value); // Get the specific search entry from this CSV

  if (response === undefined) {
    return "Value was not found";
  }

  return response;
}
