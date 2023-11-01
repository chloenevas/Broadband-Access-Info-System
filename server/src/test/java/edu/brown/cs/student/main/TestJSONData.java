package edu.brown.cs.student.main;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import edu.brown.cs.student.main.data.JSONDataSource;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
import spark.utils.Assert;

public class TestJSONData {

  /**
   * This test is a basic check that the json has been properly processed
   * and loaded so that its contents can be queried.
   * @throws IOException
   */
  @Test
  public void testLoadedJSON() throws IOException {
    String jsonData = "{\"Name\" : \"Savannah\", \"Eye Color\" : "
        + "\"Blue\",\"Height\" : "
        + "\"Unknown\","
        + "\"Hair Color\" : \"Blonde\"}";
    JSONDataSource jsonDataSource = new JSONDataSource(jsonData);

    Map<String,Object> result = jsonDataSource.getJSONData();

    assertEquals("Savannah", result.get("Name"));
    assertEquals("Blue", result.get("Eye Color"));
    assertEquals("Unknown", result.get("Height"));
    assertEquals("Blonde", result.get("Hair Color"));
    assertNull(result.get("Tattoos"));

  }

  /**
   * This test looks at different types of values, including doubles and another
   * map. We aren't fully sure of how to work with nested maps but made
   * an attempt here.
   * @throws IOException
   */
  @Test
  public void testLoadedJSON2() throws IOException {
    String jsonData = "{\"Name\":\"Alice\", "
        + "\"Age\":25, "
        + "\"Address\":{\"City\":\"New York\",\"ZipCode\":10001}, "
        + "\"IsStudent\":true}";
    JSONDataSource jsonDataSource = new JSONDataSource(jsonData);

    Map<String, Object> result = jsonDataSource.getJSONData();

    assertEquals("Alice", result.get("Name"));
    assertEquals(25.0, result.get("Age"));
    Map<String,Object>  address = new HashMap<>();
    address.put("City", "New York");
    address.put("ZipCode", 10001.0);

    assertEquals(address,result.get("Address"));
  }

}
