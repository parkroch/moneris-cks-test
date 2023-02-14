package com.example.moneris.utils;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

public class JsonUtils {

    public static JsonObject convertStringToJSON(String json){
        return new Gson().fromJson(json, JsonObject.class);
    }
}
