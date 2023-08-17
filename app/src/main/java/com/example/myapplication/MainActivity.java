package com.example.myapplication;


import static com.example.dcnfclib.DCNFCLib.E_DOCUMENT;
import static com.example.myapplication.db.DBHelper.COLUMN_NAME;
import static com.example.myapplication.db.DBHelper.ID;
import static com.example.myapplication.db.DBHelper.TABLE_NAME;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.ViewModelProvider;

import android.app.Activity;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;
import android.widget.Button;

import com.example.dcnfclib.DCNFCLib;
import com.example.dcnfclib.model.Constants;
import com.example.dcnfclib.model.EDocument;
import com.example.dcnfclib.ui.CaptureActivity;
import com.example.myapplication.db.DBHelper;
import com.example.myapplication.viewmodel.ImageDataViewModel;
import com.google.gson.Gson;

import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;

public class MainActivity extends AppCompatActivity implements DCNFCLib.DCNFCLibResultListnerClient {
    private Button scanDocumentButton;
    private Button documentCaptureButton;
    private ActivityResultContracts.StartActivityForResult startActivityForResult;

    public static final String IMAGE_DATA = "IMAGE_DATA";

    ActivityResultLauncher documentCaptureResultListner;


    DCNFCLib dcnfcLib;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        startActivityForResult = new ActivityResultContracts.StartActivityForResult();
        setDocumentCaptureResultListner();


        dcnfcLib = new DCNFCLib(this, this);
        String received = dcnfcLib.returnGreet("Omkar");
        Log.d("MainActivity", received);

        scanDocumentButton = findViewById(R.id.btn_scan_document);

        scanDocumentButton.setOnClickListener(view -> {
            dcnfcLib.startMRZScanning();
        });

        documentCaptureButton = findViewById(R.id.btn_document_capture);
        documentCaptureButton.setOnClickListener(view -> {
            openDocumentCaptureActivity();
        });

        ImageDataViewModel viewModel = new ViewModelProvider(this).get(ImageDataViewModel.class);
        LiveData<ImagesModel> data = viewModel.getData();
        data.observe(this, newData -> {
            // Process newData
            Log.d("ImageDataViewModel" , newData.images.get(0));
        });
    }

    void setDocumentCaptureResultListner() {
        documentCaptureResultListner = this.registerForActivityResult(startActivityForResult, new ActivityResultCallback<ActivityResult>() {
            @Override
            public void onActivityResult(ActivityResult result) {
                Log.d("activityResultLauncher", "setScanNFCDocumentActivityResultLauncher activityResultLauncher called");
                if (result.getResultCode() == Activity.RESULT_OK) {
                    Intent returnIntent = result.getData();
                    long imageData = returnIntent.getLongExtra(IMAGE_DATA, 1);
                    Log.d("MainActivity", "Received image data is : " + imageData);
//                    Gson gson = new Gson();
//                    EDocument eDocument = gson.fromJson(returnIntent.getStringExtra(E_DOCUMENT), EDocument.class);
//                    Log.d("activityResultLauncher", "Name of the person is: "+eDocument.getPersonDetails().getName());
//                    dcnfcLibResultListnerClient.onSuccess(eDocument);

                    DBHelper dbHelper = new DBHelper(MainActivity.this);
                    SQLiteDatabase db = dbHelper.getReadableDatabase();

                    String[] projection = { COLUMN_NAME };
                    String selection =  ID + " = " + imageData;
                    String[] selectionArgs = { String.valueOf(1) };

//                    Cursor cursor = db.query(TABLE_NAME, projection, selection, selectionArgs, null, null, null);
                    Cursor cursor = db.query(TABLE_NAME, null, null, null, null, null, null);

                    String data = "";
                    if (cursor.moveToFirst()) {
                        data = cursor.getString(cursor.getColumnIndexOrThrow(COLUMN_NAME));
                        // Handle the retrieved data
                        Gson gson = new Gson();
                        ImagesModel imagesModel = gson.fromJson(data, ImagesModel.class);
                        scanCapturedDoc(imagesModel.getImages().get(0));
                    }
                    cursor.close();
                }
            }
        });
    }

    public static ByteBuffer convert(Bitmap bitmap) {
        int bytes = bitmap.getByteCount();
        ByteBuffer buffer = ByteBuffer.allocateDirect(bytes);
        bitmap.copyPixelsToBuffer(buffer);
        buffer.flip(); // Prepare the buffer for reading

        return buffer;
    }

    void scanCapturedDoc(String data){
        ByteBuffer byteBuffer = convert(StringToBitMap(data));
        dcnfcLib.scanImage(data, MainActivity.this);
    }

    private void openDocumentCaptureActivity() {
        Intent intent = new Intent(this, DocumentCaptureActivity.class);
        documentCaptureResultListner.launch(intent);
    }

    public Bitmap StringToBitMap(String encodedString) {
        try {
            byte[] encodeByte = Base64.decode(encodedString, Base64.DEFAULT);
            Bitmap bitmap = BitmapFactory.decodeByteArray(encodeByte, 0, encodeByte.length);
            return bitmap;
        } catch (Exception e) {
            e.getMessage();
            return null;
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
}