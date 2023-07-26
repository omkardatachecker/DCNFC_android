package com.example.dcnfclib;

import static com.example.dcnfclib.ui.CaptureActivity.MRZ_RESULT;
import static com.example.dcnfclib.util.PermissionUtil.REQUEST_CODE_MULTIPLE_PERMISSIONS;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import com.example.dcnfclib.model.Constants;
import com.example.dcnfclib.model.EDocument;
import com.example.dcnfclib.ui.CaptureActivity;
import com.example.dcnfclib.ui.ScanNFCDocumentActivity;
import com.example.dcnfclib.util.AppUtil;
import com.example.dcnfclib.util.PermissionUtil;
import com.google.gson.Gson;

import org.jmrtd.lds.icao.MRZInfo;

public class DCNFCLib  {
    public static final String E_DOCUMENT = "EDocument";

    ActivityResultLauncher captureActivityResultLauncher;
    ActivityResultLauncher scanNFCDocumentActivityResultLauncher;
    DCNFCLibResultListnerClient dcnfcLibResultListnerClient;

    private ActivityResultContracts.StartActivityForResult startActivityForResult;

    AppCompatActivity appCompatActivity;
    MRZInfo mrzInfo;
    public DCNFCLib(AppCompatActivity appCompatActivity, DCNFCLibResultListnerClient dcnfcLibResultListnerClient) {
        this.appCompatActivity = appCompatActivity;
        this.dcnfcLibResultListnerClient = dcnfcLibResultListnerClient;
        startActivityForResult = new ActivityResultContracts.StartActivityForResult();
        setCaptureActivityResultLauncher();
        setScanNFCDocumentActivityResultLauncher();
    }

    private void setScanNFCDocumentActivityResultLauncher() {
        scanNFCDocumentActivityResultLauncher = appCompatActivity.registerForActivityResult(startActivityForResult, new ActivityResultCallback<ActivityResult>() {
            @Override
            public void onActivityResult(ActivityResult result) {
                Log.d("activityResultLauncher", "setScanNFCDocumentActivityResultLauncher activityResultLauncher called");
                if (result.getResultCode() == Activity.RESULT_OK) {
                    Intent returnIntent = result.getData();
                    Gson gson = new Gson();
                    EDocument eDocument = gson.fromJson(returnIntent.getStringExtra(E_DOCUMENT), EDocument.class);
                    Log.d("activityResultLauncher", "Name of the person is: "+eDocument.getPersonDetails().getName());
                    dcnfcLibResultListnerClient.onSuccess(eDocument);
                }
            }
        });
    }

    private void setCaptureActivityResultLauncher() {
        captureActivityResultLauncher = appCompatActivity.registerForActivityResult(startActivityForResult, new ActivityResultCallback<ActivityResult>() {
            @Override
            public void onActivityResult(ActivityResult result) {
                Log.d("activityResultLauncher", "setCaptureActivityResultLauncher activityResultLauncher called");
                if (result.getResultCode() == Activity.RESULT_OK) {
                    Intent returnIntent = result.getData();
                    mrzInfo = (MRZInfo) returnIntent.getSerializableExtra(MRZ_RESULT);
                    openScanNFCDocumentActivity();
                }
            }
        });
    }

    public String returnGreet(String name) {
        return "Hello world, by " + name;
    }

    public void startMRZScanning() {
        openCameraCaptureActivity();
    }

    private void openCameraCaptureActivity() {
        Intent intent = new Intent(appCompatActivity, CaptureActivity.class);
        captureActivityResultLauncher.launch(intent);
    }

    private void openScanNFCDocumentActivity() {
        Intent intent = new Intent(appCompatActivity, ScanNFCDocumentActivity.class);
        intent.putExtra(MRZ_RESULT, mrzInfo);
        scanNFCDocumentActivityResultLauncher.launch(intent);
    }

    public interface DCNFCLibResultListnerClient {
        void onSuccess(EDocument eDocument);
        void onFailure(Constants.ERROR_CODE error);
    }

    public interface DCNFCLibInternal {
        void onSuccessMRZScan(MRZInfo mrzInfo);
        void onFailure(Constants.ERROR_CODE error);
    }
}
