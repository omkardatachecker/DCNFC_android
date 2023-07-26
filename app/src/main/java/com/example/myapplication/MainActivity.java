package com.example.myapplication;


import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.widget.Button;

import com.example.dcnfclib.DCNFCLib;
import com.example.dcnfclib.model.Constants;
import com.example.dcnfclib.model.EDocument;

public class MainActivity extends AppCompatActivity implements DCNFCLib.DCNFCLibResultListnerClient {
    private Button scanDocumentButton;



    DCNFCLib dcnfcLib;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        dcnfcLib = new DCNFCLib(this, this);
        String received = dcnfcLib.returnGreet("Omkar");
        Log.d("MainActivity", received);

        scanDocumentButton = findViewById(R.id.btn_scan_document);
        scanDocumentButton.setOnClickListener(view -> {
            dcnfcLib.startMRZScanning();
        });
    }
    @Override
    protected void onResume() {
        super.onResume();
    }

    @Override
    public void onSuccess(EDocument eDocument) {
        Log.d("MainActivity", eDocument.getPersonDetails().getName());
    }

    @Override
    public void onFailure(Constants.ERROR_CODE error) {
        Log.d("Error", error.name());
    }
}