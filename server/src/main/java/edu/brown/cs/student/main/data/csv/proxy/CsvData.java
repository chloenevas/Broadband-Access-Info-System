package edu.brown.cs.student.main.data.csv.proxy;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;


/**
 * This is the state class that will contain information that will be shared
 * between the csv handlers. It will receive information that already went defensive
 * programming, but adds an extra layer of buffering.
 */

public class CsvData{

    /**
     * The proxyData variable acts as a container for the actual csv data, allowing its
     * contents to be accessed or modified as necessary.
     */

    private final List<List<List<String>>> proxyData = new ArrayList<>();

    private int sessionID = 0;

    private Map<Integer, List<List<String>>> sessionData = new HashMap<>();

   public CsvData(){

    }

    /**
     * This method ensures that each time the loadHandler is called, whichever data
     * the user inputs (whether invalid or not) is stored (or at least an attempt is made) in
     * the proxyData container. First, it removes previous data, replacing it with the parsed
     * data.
     * @param data
     */
    public void loadProxyData(List<List<String>> data){
        clearData();
        this.sessionData.put(this.sessionID, data);
        this.proxyData.add(data);
    }
    /**
     * This accessor retrieves the csv list of list of string content from the container,
     * returning it as necessary.
     * @return contents; csv parsed data
     */

    public List<List<String>> getProxyData(int sessID){
        return this.sessionData.get(sessID);
    }

    /**
     * Boolean method used to check whether the proxy data contains a parsed csv result.
     * @return boolean indicating whether data is loaded
     */

    public Boolean isLoaded() {
        return this.proxyData.size() != 0;
    }
    
    /**
     * Sets the session ID of the backend
     */
    public void setSessionID(int sessionID) {
        this.sessionID = sessionID;
    }

    /**
     * Gets the session ID of the backend
     */
    public int getSessionID() {
        return this.sessionID;
    }
    

    /**
     * This is a helper method used to remove the contents of the proxyData container (i.e.
     * the current csv file) when necessary, such as for testing or to load a new file.
     */
    public void clearData(){
        if(isLoaded()){
            this.proxyData.remove(0);
        }
    }

}