package edu.brown.cs.student.main.data;


import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;


public class JSONDataSource {
  private String jsonData;

  /**
   * This class implements basic processing of JSON files such that
   * they can be used for other purposes (i.e. searching)
   * @param jsonData JSON file
   */
  public JSONDataSource(String jsonData){
    this.jsonData = jsonData;
  }

  /**
   * This method converts data from a JSON into a format that can be
   * used for purposes such as searching or viewing. It uses moshi building
   * and an adapter to convert the data into a more usable format.
   * @return
   * @throws IOException
   */
  public Map<String,Object> getJSONData() throws IOException {
    Moshi moshi = new Moshi.Builder().build();
    Type mapStringObject = Types.newParameterizedType(Map.class, String.class, Object.class);
    JsonAdapter<HashMap<String,Object>> adapter = moshi.adapter(mapStringObject);

    return adapter.fromJson(this.jsonData);
  }



}
