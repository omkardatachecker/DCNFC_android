package com.example.myapplication;

import static com.example.dcnfclib.util.PermissionUtil.REQUEST_CODE_MULTIPLE_PERMISSIONS;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import android.Manifest;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;

import com.example.dcnfclib.DCNFCLib;
import com.example.dcnfclib.model.Constants;

import com.example.dcnfclib.model.EDocument;
import com.example.dcnfclib.util.AppUtil;
import com.example.dcnfclib.util.PermissionUtil;

public class MainActivity extends AppCompatActivity implements DCNFCLib.DCNFCLibResultListnerClient {
    private Button scanDocumentButton;

    private static final int APP_CAMERA_ACTIVITY_REQUEST_CODE = 150;
    private static final int APP_SETTINGS_ACTIVITY_REQUEST_CODE = 550;


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
//            requestPermissionForCamera();
            dcnfcLib.startMRZScanning();
        });



    }

    private void requestPermissionForCamera() {
        String[] permissions = { Manifest.permission.CAMERA };
        boolean isPermissionGranted = PermissionUtil.hasPermissions(this, permissions);

        if (!isPermissionGranted) {
            AppUtil.showAlertDialog(this, getString(com.example.dcnfclib.R.string.permission_title), getString(com.example.dcnfclib.R.string.permission_description), getString(com.example.dcnfclib.R.string.button_ok), false, (dialogInterface, i) -> ActivityCompat.requestPermissions(this, permissions, REQUEST_CODE_MULTIPLE_PERMISSIONS));
        } else {
            dcnfcLib.startMRZScanning();
        }
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

//    @Override
//    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
//        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
//
//        if (requestCode == PermissionUtil.REQUEST_CODE_MULTIPLE_PERMISSIONS) {
//            int result = grantResults[0];
//            if (result == PackageManager.PERMISSION_DENIED) {
//                if (!PermissionUtil.showRationale(this, permissions[0])) {
//                    Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
//                    Uri uri = Uri.fromParts("package", getPackageName(), null);
//                    intent.setData(uri);
//                    startActivityForResult(intent, APP_SETTINGS_ACTIVITY_REQUEST_CODE);
//                } else {
////                    requestPermissionForCamera();
//                    dcnfcLib.startMRZScanning();
//                }
//            } else if (result == PackageManager.PERMISSION_GRANTED) {
//                dcnfcLib.startMRZScanning();
//            }
//        }
//    }
}