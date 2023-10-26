# REPL-cnevas-kwalke19

## Project Details

    Name: REPL
    Estimated time: 20 hours
    Repo: https://github.com/cs0320-f23/repl-cnevas-kwalke19

## Design Choices

### Class/Interface Relationships

    This program combines the functionality of our past sprints, server & mock, by combining
    the frontend and backend.
    The frontend is comprised of typescript files, while the backend is done using Java.
    On the frontend, we have the App file which is in charge of displaying the overall main 
    structure of the webpage. Here, we have the Header Design and the text that explains the 
    funcitonality for the whole webpage. At last we call on REPL.

    The REPL File handles the visuals for the command line and the history view which contains the 
    past queries and responses.

    History itself is also another file which has as its main data
    structure an arraylist that can take both Strings and list of list of Strings. It then
    return either a single parragraph element view for when it is a string or a table view
    for when it is a row(s) of a CSV. To do the latter, we use .map to loop through all of
    the elements in the list of list of strings and then place them into table cells. For
    the entry of new elements to the history and in order to handle the queries REPL calls
    REPL input.

    In the REPLinput file we first have an interface called InputProps which provides us with information on which parameters the main REPLinput function takes in. In this case we have the following: queryHistory(Which is used to keep track of the user inputs and which will be use to implement the arrows functinality), history(which keeps track of all of the user inputs and responses from the website), setHistory(that lets us change the value of history), setNotification(Which allows us to display a notification), setQueryHistory(Which allows us to change the query history), scrollHistoryToBottom(A function created in REPL and passed to Handler to determine when to scroll to the bottom).Then we have the navigate history function which keeps track of which entry of the queryHistory list we are on. Then it returns the value and it updates it on the textfield. This is helpful because it lets us recall previous queries without having to type them again. Then we have the submit function which, sets up the information necesary to call handler when we press the Submit button or when pressing the enter key.

    The CommandRegistry class is responsible for setting up a dictionary that 
    maps commands to the function that they should perform. It pre-loads commands that we have been working with (such as load, view, search, & broadband) and then provides a function for another developer to add their own commands. Additionally, we set up our backend so that every time the front end restarts, the backend gets paired with a new session ID so that previous loads/views/searches/... don't carry over into the new frontend session. So, in the CommandRegistry class we generate a new session ID. 

    The handler class has one function and this one is in charge of keeping track of the mode of the responses (brief and verbose). It is also responsible for changing the handler to used mocked data, if requested by the user (primarily for testing purposes). If in mocked mode, Handler identifies if a command is called either load_file, view or search. Then it calls the respective classes. Since load_file handles providing the rows view funcitonality (just returning the data from load_file) is handled in this class. These operations all happen with 
    the mocked data from mockedJson.ts.

    If not in mocked mode, then Handler will get the inputted command from CommandRegistry's functionDictionary, and assign that to a variable called replFunc so that it can keep track of the function that it should be execuing. The command name is removed before checking the registry, and then the replFunc's promise is fulfilled and inputted into the history.
 
### Data Structures/High Level Explanations

    The history prop is a list that can be comprised of either strings or list of list of strings. This way, when loading the history list, a string can be loaded, but a list of list of strings can also be loaded in the case of loading parsed csv data. Once in the History file, the History function uses a map to go through the history prop and check whether each item is a string or string[][]. If a string, it simply returns it as a paragraph. If it's a string[][], it maps the item into an HTML table so that it can be viewed more easily by the user.

    Our mockedJson file uses dictionaries to map csv files to their parsed data. We have a main dictionary that maps each csv filepath to its own dictionary. In each of the specific dictionaries, it maps to the result lists. When using search or view, we use filepath as the key for mainSearchDict to get the specificDict, and either display that for view or if it's search, then we enter the header + value as the key.

    The function dictionary in CommandRegistry is used to map commands to their functions, and can be expanded upon with the addToRegistry function. The sessionID in CommandRegistry is used to reset the backend information each time the frontend is started.

    In Handler, there is a "mock" boolean so that when true, the function will utilise the mocked data instead of making actual web requests. 

    We added several accessibility features as well. First, there is a scroll view for the past queries and responses. Before returning the updated view with all of the elements, REPL makes sure that the view of the vertical scroll always displays the last element in the history.
        In terms of keyboard shortcuts, 
        - ctrl l pre-writes the load_file command
        - ctrl w pre-writes the view command
        - ctrl s pre-writes the search command
        - ctrl b pre-writes the broadband command
        - ctrl c clears the history
        - typing the up/down arrows allows the user to navigate through the history so that those past commands can pop up in the command line (like using the up arrow in the terminal)

## Errors/Bugs

    One possible error is that for the sessionID, we generate a random number up to 100,000, which is not a perfect way to ensure that a new sessionID is created every time, because there is a chance that it could repeat. For the purposes of this project, we thought it was ok to take this risk, given that the likelihood of generating the same number is very low.

## Tests

    We tested various different basic cases as well as edge cases. All testing is done using a variety of mocking as well as actually making calls to the backend.

    CSV.spec.ts is where the testing for load, view, and search functions occurs. We test that loading a valid file will produce a success message, and that loading an invalid file will produce an error message.
    We also test the basic cases of loading and then viewing, as well as loading and then searching with searches including column IDs and not including column IDs. In addition, we test trying to search for a column index that is out of bounds (both greater than # of columns and negative inices). We carry out these view/search tests on both csv's that do and do not have headers. We test that trying to search or view without loading a file will produce an error.
    In terms of reachable states, we test many of these tests in brief mode, yet we do additional repeat tests in verbose mode to ensure that our modes our operating properly. Further, we have tests that will mix up commands (such as load, then mode, then view) to ensure that it won't affect the output. We also test that different files are able to be loaded and that it will update accordingly when viewing/searching.
    We also test empty responses that result from invalid search inputs, as well as a csv that only has one column.

    In Broadband.spec.ts we test that searching for a valid county + state produces the proper result. Also, searching for an invalid county + state gives an error, and trying to search without entering a county or state gives an error. Again, there is a mixture of mocking and actual backend calls. 

    In Backend.spec.ts, we unit test the addToRegistry function of CommandRegistry by using jest. We also unit test the load, view, and search commands 

## How to...

### Run the tests:

    To run the tests, first make sure that you're in the repl directory. Then, run "npx playwright test" which
    will run through all the tests and produce the result of passed/failed tests in the terminal. To get more
    information about the tests, you can run "npx playwright show-report". "npx playwright test --ui" can also be used to see the web app while the tests are running. Additionally, the tests can be run using the Testing tab of VSCode.

    To run the jest unit tests, type "npm test" in the terminal. To see the results of specific test suites, type h, then p, then the name of the test file.

### Run the program:

    To run the program, first navigate to the server package and the Server class, and then use the green play button to run the file and start up the backend server.
    Then, once in the repl directory, run "npm start" and click on the local host link. Once on the website, directions for using the command-line will be given.
