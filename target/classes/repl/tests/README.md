# SERVER README

## Project Details

    Name: Mock
    Estimated time: 16 hours
    Repo: https://github.com/cs0320-f23/mock-cnevas-rgonza27.git

## Design Choices

### Class/Interface Relationships

    For this program we used 9 Typescript files and 2 CSS files. For starters we have the
    App file which is in charge of displaying the overall main structure of the webpage.
    Here, we have the Header Design and the text that explains the funcitonality for the
    whole webpage. At last we call on REPL.

    The REPL File handles the visuals for the
    command line and the history view which contains the past queries and responses.
    Additionally, to make the user experience better we decided to implement a scroll view
    for the past queries and responses. Before returning the updated view with all of the
    elements, REPL makes sure that the view of the vertical scroll always displays the last
    element in the history.

    History itself is also another file which has as its main data
    structure an arraylist that can take both Strings and list of list of Strings. It then
    return either a single parragraph element view for when it is a string or a table view
    for when it is a row(s) of a CSV. To do the latter, we use .map to loop through all of
    the elements in the list of list of strings and then place them into table cells. For
    the entry of new elements to the history and in order to handle the queries REPL calls
    REPL input.

    In the REPLinput file we first have an interface called InputaProps which provides us with information on which parameters the main REPLinput function takes in. In this case we have the following: queryHistory(Which is used to keep track of the user inputs and which will be use to implement the arrows functinality), history(which keeps track of all of the user inputs and responses from the website), setHistory(that lets us change the value of history), setNotification(Which allows us to display a notification), setQueryHistory(Which allows us to change the query history), scrollHistoryToBottom(A function created in REPL and passed to Handler to determine when to scroll to the bottom). Inside the main funciton of the file REPLinput we have the userEffect function which listens for key presses from the up and down arrow key. Then we have the navigate history function which keeps track of which entry of the queryHistory list we are on. Then it returns the value and it updates it on the textfield. This is helpful because it lets us recall previous queries without having to type them again. Then we have the submitt function which, sets up the information necesary to call handler when we press the Submit button or when pressing the enter key.

    The handler class has one function and this one is in charge of keeping track of the mode of the responses (brief and verbose). It also identifies if a command is called Either load_file, view or search. Then it calls the respective classes. Since load_file handles providing the rows view funcitonality (just returning the data from load_file) is handled in this class.

    The load function is in charged of mocking the load funcitonality. It returns success if the file is within the mocked ones, other wise it returns file not found. This is done by using hashmaps.

    Search uses the rows from the CSV load mock and then uses hashmaps to return mock responses for general and edge cases.

    At last we have mockedJson which contains all of the mock information and hashmaps for our fake funcitonality

### Data Structures/High Level Explanations

    The history prop is a list that can be comprised of either strings or list of list of strings. This way, when loading the history list, a string can be loaded, but a list of list of strings can also be loaded in the case of loading parsed csv data. Once in the History file, the History function uses a map to go through the history prop and check whether each item is a string or string[][]. If a string, it simply returns it as a paragraph. If it's a string[][], it maps the item into an HTML table so that it can be viewed more easily by the user.

    Our mockedJson file uses dictionaries to map csv files to their parsed data. We have a main dictionary that maps each csv filepath to its own dictionary. In each of the specific dictionaries, it maps to the result lists. When using search or view, we use filepath as the key for mainSearchDict to get the specificDict, and either display that for view or if it's search, then we enter the header + value as the key.

## Errors/Bugs

    No errors found! :)

## Tests

    We tested various different basic cases as well as edge cases. In App.spec.ts, we carry out very preliminary  tests, such as ensuring that the title of the page is accurate, making sure text can be entered into the command line, and ensuring that the button appears as expected.
    REPL.spec.ts is where the majority of our testing occurs. We test that loading a valid file will produce a success message, and that loading an invalid file will produce an error message.
    We also test the basic cases of loading and then viewing, as well as loading and then searching with searches including column IDs and not including column IDs. In addition, we test trying to search for a column index that is out of bounds (both greater than # of columns and negative inices). We carry out these view/search tests on both csv's that do and do not have headers. We test that trying to search or view without loading a file will produce an error.
    In terms of reachable states, we test many of these tests in brief mode, yet we do additional repeat tests in verbose mode to ensure that our modes our operating properly. Further, we have tests that will mix up commands (such as load, then mode, then view) to ensure that it won't affect the output. We also test that different files are able to be loaded and that it will update accordingly when viewing/searching.
    We also test empty responses that result from invalid search inputs, as well as a csv that only has one column.

## How to...

### Run the tests:

    To run the tests, first make sure that you're in the mock directory. Then, run "npx playwright test" which
    will run through all the tests and produce the result of passed/failed tests in the terminal. To get more
    information about the tests, you can run "npx playwright show-report". "npx playwright test --ui" can also be used to see the web app while the tests are running. Additionally, the tests can be run using the Testing tab of VSCode.

### Run the program:

    To run the program, first make sure that you're in the mock directory. Then, run "npm start"
    and click on the local host link. Once on the website, directions for using the command-line
    will be given.
