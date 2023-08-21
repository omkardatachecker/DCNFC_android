package com.example.dcnfclib.ui;

import static com.example.dcnfclib.util.PermissionUtil.REQUEST_CODE_MULTIPLE_PERMISSIONS;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;

import com.example.dcnfclib.DCNFCLib;
import com.example.dcnfclib.R;
import com.example.dcnfclib.mlkit.camera.CameraSource;
import com.example.dcnfclib.mlkit.camera.CameraSourcePreview;
import com.example.dcnfclib.mlkit.other.GraphicOverlay;
import com.example.dcnfclib.mlkit.text.TextRecognitionProcessor;
import com.example.dcnfclib.model.Constants;
import com.example.dcnfclib.util.AppUtil;
import com.example.dcnfclib.util.PermissionUtil;

import org.jmrtd.lds.icao.MRZInfo;

import java.io.IOException;

public class CaptureActivity extends AppCompatActivity implements TextRecognitionProcessor.ResultListener, DCNFCLib.DCNFCLibInternal {



    private CameraSource cameraSource = null;
    private CameraSourcePreview preview;
    private GraphicOverlay graphicOverlay;

    private ActionBar actionBar;

    public static final String MRZ_RESULT = "MRZ_RESULT";
    public static final String DOC_TYPE = "DOC_TYPE";

    private static final int APP_SETTINGS_ACTIVITY_REQUEST_CODE = 550;

    private static final int MY_CAMERA_REQUEST_CODE = 100;
    public DCNFCLib.DCNFCLibInternal dcnfcLibInternal;



    private static String TAG = "CaptureActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_capture);


        preview = findViewById(R.id.camera_source_preview);
        if (preview == null) {
            Log.d(TAG, "Preview is null");
        }
        graphicOverlay = findViewById(R.id.graphics_overlay);
        if (graphicOverlay == null) {
            Log.d(TAG, "graphicOverlay is null");
        }

        dcnfcLibInternal = this;
        requestPermissionForCamera();
    }

    private void requestPermissionForCamera() {
        String[] permissions = { Manifest.permission.CAMERA };
        boolean isPermissionGranted = PermissionUtil.hasPermissions(this, permissions);

        if (!isPermissionGranted) {
            AppUtil.showAlertDialog(this, getString(com.example.dcnfclib.R.string.permission_title), getString(com.example.dcnfclib.R.string.permission_description), getString(com.example.dcnfclib.R.string.button_ok), false, (dialogInterface, i) -> ActivityCompat.requestPermissions(this, permissions, REQUEST_CODE_MULTIPLE_PERMISSIONS));
        } else {
            createCameraSource();
            startCameraSource();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.d(TAG, "onResume");
        startCameraSource();
    }

    /** Stops the camera. */
    @Override
    protected void onPause() {
        super.onPause();
        preview.stop();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (cameraSource != null) {
            cameraSource.release();
        }
    }

    private void createCameraSource() {

        if (cameraSource == null) {
            cameraSource = new CameraSource(this, graphicOverlay);
            cameraSource.setFacing(CameraSource.CAMERA_FACING_BACK);
        }

        cameraSource.setMachineLearningFrameProcessor(new TextRecognitionProcessor( this));
    }

    private void startCameraSource() {
        if (cameraSource != null) {
            try {
                if (preview == null) {
                    Log.d(TAG, "resume: Preview is null");
                }
                if (graphicOverlay == null) {
                    Log.d(TAG, "resume: graphOverlay is null");
                }
                preview.start(cameraSource, graphicOverlay);
            } catch (IOException e) {
                Log.e(TAG, "Unable to start camera source.", e);
                cameraSource.release();
                cameraSource = null;
            }
        }
    }

    @Override
    public void onSuccess(MRZInfo mrzInfo) {
        Log.d("MRZ Info read Success", "Success: " + mrzInfo.getDocumentNumber());
        Intent returnIntent = new Intent();
        returnIntent.putExtra(MRZ_RESULT, mrzInfo);
        setResult(Activity.RESULT_OK, returnIntent);
        finish();
    }

    @Override
    public void onError(Exception exp) {

    }

    @Override
    public void onPointerCaptureChanged(boolean hasCapture) {
        super.onPointerCaptureChanged(hasCapture);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode == MY_CAMERA_REQUEST_CODE) {
            int result = grantResults[0];
            if (result == PackageManager.PERMISSION_DENIED) {
                if (!PermissionUtil.showRationale(this, permissions[0])) {
                    Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
                    Uri uri = Uri.fromParts("package", getPackageName(), null);
                    intent.setData(uri);
                    startActivityForResult(intent, APP_SETTINGS_ACTIVITY_REQUEST_CODE);
                } else {
                    requestPermissionForCamera();
                }
            } else if (result == PackageManager.PERMISSION_GRANTED) {
                createCameraSource();
                startCameraSource();
            }
        }
    }

    @Override
    public void onSuccessMRZScan(MRZInfo mrzInfo) {
        Intent intent = new Intent(this, ScanNFCDocumentActivity.class);
//        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_TASK_ON_HOME);
        intent.putExtra(MRZ_RESULT, mrzInfo);
        startActivity(intent);
//        this.finish();
    }

    @Override
    public void onFailure(Constants.ERROR_CODE error) {

    }
}