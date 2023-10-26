export const filepathDictionary = new Map<string, any>();
export const incomeDictionary = new Map<string, string[][]>();
export const starsDictionary = new Map<string, string[][]>();
export const mainSearchDict = new Map<string, Map<string, any>>();

// INCOME CSV SETUP
var incomeOutput: string[][] = new Array();
var incomeRow1: string[] = new Array();
var incomeRow2: string[] = new Array();
var incomeRow3: string[] = new Array();
var incomeRow4: string[] = new Array();
var incomeRow5: string[] = new Array();
var incomeRow6: string[] = new Array();
var incomeRow7: string[] = new Array();

incomeRow1.push(
  "state",
  "data type",
  "average weekly earnings",
  "number of workers",
  "earnings disparity",
  "employed percent"
);
incomeRow2.push(
  "ri",
  "white",
  '" $1,058.47 "',
  "395773.6521",
  "  $1.00 ",
  " 75%"
);
incomeRow3.push("ri", "black", "  $770.26 ", " 30424.80376", "  $0.73 ", " 6%");
incomeRow4.push(
  "ri",
  " native american/american indian",
  "  $471.07 ",
  " 2315.505646",
  "  $0.45",
  " 0%"
);
incomeRow5.push(
  "ri",
  " asian-pacific islander",
  '" $1,080.09 "',
  " 18956.71657",
  "  $1.02 ",
  " 4%"
);
incomeRow6.push(
  "ri",
  " hispanic/latino",
  "  $673.14 ",
  " 74596.18851",
  "  $0.64 ",
  " 14%"
);
incomeRow7.push(
  "ri",
  " multiracial",
  "  $971.89 ",
  " 8883.049171",
  "  $0.92 ",
  " 2%"
);
incomeOutput.push(
  incomeRow1,
  incomeRow2,
  incomeRow3,
  incomeRow4,
  incomeRow5,
  incomeRow6,
  incomeRow7
);

filepathDictionary.set(
  "/Users/chloenevas/Documents/mock-cnevas-rgonza27/mock/src/components/data/income.csv",
  incomeOutput
);

// STARS CSV SETUP
var starsOutput: string[][] = new Array();
var starsRow1: string[] = new Array();
var starsRow2: string[] = new Array();
var starsRow3: string[] = new Array();
var starsRow4: string[] = new Array();
var starsRow5: string[] = new Array();
var starsRow6: string[] = new Array();
var starsRow7: string[] = new Array();
var starsRow8: string[] = new Array();
var starsRow9: string[] = new Array();
var starsRow10: string[] = new Array();

starsRow1.push("0", "Sol", "0", "0", "0");
starsRow2.push("1", " 282.43485", " 0.00449", " 5.36884");
starsRow3.push("2", " 43.04329", " 0.00285", " -15.24144");
starsRow4.push("3", " 277.11358", " 0.02422", " 223.27753");
starsRow5.push("3759", " 96 G. Psc", " 7.26388", " 1.55643", " 0.68697");
starsRow6.push(
  "70667",
  " Proxima Centauri",
  " -0.47175",
  " -0.36132",
  " -1.15037"
);
starsRow7.push(
  "71454",
  " Rigel Kentaurus B",
  " -0.50359",
  " -0.42128",
  " -1.1767"
);
starsRow8.push(
  "71457",
  " Rigel Kentaurus A",
  " -0.50362",
  " -0.42139",
  " -1.17665"
);
starsRow9.push(
  "87666",
  " Barnard's Star",
  " -0.01729",
  " -1.81533",
  " 0.14824"
);
starsRow10.push("118721", "", " -2.28262", " 0.64697", " 0.29354");

starsOutput.push(
  starsRow1,
  starsRow2,
  starsRow3,
  starsRow4,
  starsRow5,
  starsRow6,
  starsRow7,
  starsRow8,
  starsRow9,
  starsRow10
);

filepathDictionary.set(
  "/Users/chloenevas/Documents/mock-cnevas-rgonza27/mock/src/components/data/stars.csv",
  starsOutput
);

// DATA FOR INCOME CSV

// RI in any column
incomeDictionary.set("ri", [
  incomeRow1,
  incomeRow2,
  incomeRow3,
  incomeRow4,
  incomeRow5,
  incomeRow6,
  incomeRow7,
]);

// RI in the first column (0)
incomeDictionary.set("0,ri", incomeOutput);

// RI in the first column (State)
incomeDictionary.set("state,ri", incomeOutput);

// White in any column
incomeDictionary.set("white", [incomeRow2]);

// White in the second column (1)
incomeDictionary.set("1,white", [incomeRow2]);

// White in the second column (Data Type)
incomeDictionary.set("data type,white", [incomeRow2]);

// DATA FOR STARS CSV

// 3759 in any column
starsDictionary.set("3759", [starsRow5]);

// 3759 in the first column (0)
starsDictionary.set("0,3759", [starsRow5]);

// 0 in any column
starsDictionary.set("0", [starsRow1]);

// 0 in third column
starsDictionary.set("2,0", [starsRow1]);

// sets up mainSearchDict which maps the filepath dictionaries to their results
mainSearchDict.set(
  filepathDictionary.get(
    "/Users/chloenevas/Documents/mock-cnevas-rgonza27/mock/src/components/data/income.csv"
  ),
  incomeDictionary
);
mainSearchDict.set(
  filepathDictionary.get(
    "/Users/chloenevas/Documents/mock-cnevas-rgonza27/mock/src/components/data/stars.csv"
  ),
  starsDictionary
);
