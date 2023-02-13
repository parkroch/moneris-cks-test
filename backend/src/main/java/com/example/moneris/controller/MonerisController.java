package com.example.moneris.controller;

import com.example.moneris.model.MonerisResponse;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/moneris")
public class MonerisController {

    private static final DecimalFormat df = new DecimalFormat("0.00");

    @Autowired
    private Environment env;

    @GetMapping(value="/pre-load")
    public MonerisResponse initMonerisCheckout(@RequestParam double amount){

        Map<String,String> resultMap = new HashMap<>();
        resultMap.put("store_id",env.getProperty("moneris.store.id"));
        resultMap.put("api_token",env.getProperty("moneris.api.token"));
        resultMap.put("checkout_id",env.getProperty("moneris.checkout.id"));
        resultMap.put("environment",env.getProperty("moneris.env"));
        resultMap.put("txn_total",df.format(amount));
        resultMap.put("action","preload");

        RestTemplate restTemplate = new RestTemplate();
        String test = restTemplate.postForObject(env.getProperty("moneris.url"),resultMap, String.class);

        Gson gson = new Gson();
        return gson.fromJson(test, MonerisResponse.class);
    }
}