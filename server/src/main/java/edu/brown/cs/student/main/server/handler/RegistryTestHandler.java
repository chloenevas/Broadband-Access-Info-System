package edu.brown.cs.student.main.server.handler;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

import spark.Request;
import spark.Response;
import spark.Route;


public class RegistryTestHandler implements Route {
    /**
     * Fake/test handler for adding to registry
     */


    public RegistryTestHandler() {
    }

    /**
     * As a class implementing Route, handle is used to view the entire parsed file.
     * a Moshi instance builds and adapts to take on a Map<String,Object> format, since this is what
     * the view map result will use. For a successful query, the value from accessing
     * sharedData's current loaded file will be added to the view result map.
     * For an unsuccessful one, (such no file was previously loaded) an informative message will be
     * included in the view result map. The view result map will then be returned to the user.
     * map.
     * @param request information to be obtained
     * @param response
     * @return serialized map indicating success of data loading
     */

    @Override
    public Object handle(Request request, Response response) {
        String value = request.queryParams("value");

        Moshi moshi = new Moshi.Builder().build();

        Type mapStringString = Types.newParameterizedType(Map.class, String.class, String.class);
        JsonAdapter<Map<String, String>> adapter = moshi.adapter(mapStringString);

        Map<String, String> map = new HashMap<>();


    try {
      map.put("type", "success");
      System.out.println("poop");
      map.put("data", value);
      return adapter.toJson(map);

    } catch(Exception e){
      map.put("type", "error");
      return adapter.toJson(map);
    }
    }
}