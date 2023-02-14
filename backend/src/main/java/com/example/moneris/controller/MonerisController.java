package com.example.moneris.controller;

import com.example.moneris.model.MonerisResponse;
import com.example.moneris.utils.JsonUtils;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/moneris")
public class MonerisController {

    private static final DecimalFormat df = new DecimalFormat("0.00");

    @Autowired
    private Environment env;

    @GetMapping(value="/pre-load")
    public JsonObject initMonerisCheckout(@RequestParam double amount){

        Map<String,String> resultMap = new HashMap<>();
        resultMap.put("store_id",env.getProperty("moneris.store.id"));
        resultMap.put("api_token",env.getProperty("moneris.api.token"));
        resultMap.put("checkout_id",env.getProperty("moneris.checkout.id"));
        resultMap.put("environment",env.getProperty("moneris.env"));
        resultMap.put("txn_total",df.format(amount));
        resultMap.put("action","preload");

        RestTemplate restTemplate = new RestTemplate();
        String json = restTemplate.postForObject(env.getProperty("moneris.url"),resultMap, String.class);

        return JsonUtils.convertStringToJSON(json);
    }

    @GetMapping(value="receipt")
    public JsonObject receiptRequest(@RequestParam String ticket){
        Map<String,String> resultMap = new HashMap<>();
        resultMap.put("store_id",env.getProperty("moneris.store.id"));
        resultMap.put("api_token",env.getProperty("moneris.api.token"));
        resultMap.put("checkout_id",env.getProperty("moneris.checkout.id"));
        resultMap.put("ticket",ticket);
        resultMap.put("environment",env.getProperty("moneris.env"));
        resultMap.put("action","receipt");

        RestTemplate restTemplate = new RestTemplate();
        String json = restTemplate.postForObject(env.getProperty("moneris.url"),resultMap, String.class);

        return JsonUtils.convertStringToJSON(json);
    }
}