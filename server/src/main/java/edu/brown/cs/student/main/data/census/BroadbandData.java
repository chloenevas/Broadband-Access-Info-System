package edu.brown.cs.student.main.data.census;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import jdk.jfr.Percentage;

/**
 * Record representing the data returned by API for broadband information. Stored in a record
 * for flexibility and testing purposes, allowing mock data to be passed in as necessary.
 * @param data from API result
 */

public record BroadbandData(List<List<Object>> data) {



}


