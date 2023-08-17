package com.example.dcnfclib;

import static androidx.constraintlayout.helper.widget.MotionEffect.TAG;
import static com.example.dcnfclib.ui.CaptureActivity.MRZ_RESULT;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.hardware.Camera;
import android.util.AttributeSet;
import android.util.Base64;
import android.util.Log;
import android.util.SparseArray;
import android.view.Surface;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.Toast;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.example.dcnfclib.mlkit.camera.CameraSource;
import com.example.dcnfclib.mlkit.other.FrameMetadata;
import com.example.dcnfclib.mlkit.other.GraphicOverlay;
import com.example.dcnfclib.mlkit.text.TextGraphic;
import com.example.dcnfclib.mlkit.text.TextRecognitionProcessor;
import com.example.dcnfclib.model.Constants;
import com.example.dcnfclib.model.EDocument;
import com.example.dcnfclib.ui.CaptureActivity;
import com.example.dcnfclib.ui.ScanNFCDocumentActivity;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;

import com.google.gson.Gson;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.text.Text;
import com.google.mlkit.vision.text.TextRecognition;
import com.google.mlkit.vision.text.TextRecognizer;
import com.google.mlkit.vision.text.latin.TextRecognizerOptions;

import org.jmrtd.lds.icao.MRZInfo;

import java.nio.ByteBuffer;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;


public class DCNFCLib implements TextRecognitionProcessor.ResultListener {
    public static final String E_DOCUMENT = "EDocument";
    private final int requestedPreviewWidth = 1280;
    private final int requestedPreviewHeight = 960;

    ActivityResultLauncher captureActivityResultLauncher;
    ActivityResultLauncher scanNFCDocumentActivityResultLauncher;

    ActivityResultLauncher documentCaptureActivityResultLauncher;
    DCNFCLibResultListnerClient dcnfcLibResultListnerClient;

    private ActivityResultContracts.StartActivityForResult startActivityForResult;

    TextRecognizer textRecognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS);
    private final AtomicBoolean shouldThrottle = new AtomicBoolean(false);

    TextRecognitionProcessor textRecognitionProcessor;

    AppCompatActivity activity;
    GraphicOverlay graphicOverlay;



    AppCompatActivity appCompatActivity;
    MRZInfo mrzInfo;
    public DCNFCLib(AppCompatActivity appCompatActivity, DCNFCLibResultListnerClient dcnfcLibResultListnerClient) {
        this.appCompatActivity = appCompatActivity;
        this.dcnfcLibResultListnerClient = dcnfcLibResultListnerClient;
        startActivityForResult = new ActivityResultContracts.StartActivityForResult();
        this.textRecognitionProcessor = new TextRecognitionProcessor(this);
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

    public void scanImage(String dataString, AppCompatActivity appCompatActivity){
//        InputImage inputImage = InputImage.fromByteBuffer(data,
//                frameMetadata.getWidth(),
//                frameMetadata.getHeight(),
//                frameMetadata.getRotation(),
//                InputImage.IMAGE_FORMAT_NV21);
//        detectInVisionImage(inputImage, frameMetadata, graphicOverlay);
//        this.activity = appCompatActivity;
////        this.graphicOverlay = new GraphicOverlay(this.activity, );
//        CameraSource cameraSource = new CameraSource(activity, new GraphicOverlay(this.activity, null));
//        cameraSource.processImageNew(data, this);
//        GraphicOverlay graphicOverlay = new GraphicOverlay(activity, null);
//        graphicOverlay.setBackgroundColor(Color.TRANSPARENT);
//        graphicOverlay.setLayoutParams(new ViewGroup.LayoutParams(
//                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        Matrix matrix = new Matrix();

        matrix.postRotate(90);
        Bitmap bitmap = StringToBitMap(dataString);
        Bitmap scaledBitmap = Bitmap.createScaledBitmap(bitmap, bitmap.getWidth(), bitmap.getHeight(), true);

        Bitmap rotatedBitmap = Bitmap.createBitmap(scaledBitmap, 0, 0, scaledBitmap.getWidth(), scaledBitmap.getHeight(), matrix, true);
        final BitmapFactory.Options bitmapOptions = new BitmapFactory.Options();
        bitmapOptions.inTargetDensity = 1;
        rotatedBitmap.setDensity(Bitmap.DENSITY_NONE);

        int fromHere = (int) (rotatedBitmap.getHeight() * 0.2);
        Bitmap croppedBitmap = Bitmap.createBitmap(rotatedBitmap, 0, rotatedBitmap.getHeight() / 2, rotatedBitmap.getWidth(), rotatedBitmap.getHeight() / 2);
        runTextRecognition(croppedBitmap, null);

//        TextRecognizer textRecognizer = new TextRecognizer.Builder(this).build();
//        if (!textRecognizer.isOperational()) {
//            // Handle the case where the text recognizer is not operational.
//        } else {
//            Frame frame = new Frame.Builder().setBitmap(bitmap).build();
//            SparseArray<TextBlock> items = textRecognizer.detect(frame);
//
//            if (items.size() != 0) {
//                StringBuilder stringBuilder = new StringBuilder();
//                for (int i = 0; i < items.size(); ++i) {
//                    TextBlock item = items.valueAt(i);
//                    stringBuilder.append(item.getValue());
//                    stringBuilder.append("\n");
//                }
//                // Process the recognized text (stringBuilder.toString()).
//            }
//        }


//        ByteBuffer data = convert(bitmap);
//
//        this.activity = appCompatActivity;
//
//        ViewGroup rootView = activity.findViewById(android.R.id.content);
//
//        textRecognitionProcessor = new TextRecognitionProcessor(this);
////        FrameMetadata frameMetadata = new FrameMetadata.Builder()
////                .setWidth(previewSize.getWidth())
////                .setHeight(previewSize.getHeight())
////                .setRotation(rotation)
////                .setCameraFacing(facing)
////                .build();
////        textRecognitionProcessor.processDocument(data, frameMetadata);
//
//
//
//        int rotation = getRotation(activity);
//
//        FrameMetadata frameMetadata = new FrameMetadata.Builder()
//                .setWidth(bitmap.getWidth())
//                .setHeight(bitmap.getHeight())
//                .setRotation(90)
//                .setCameraFacing(CameraSource.CAMERA_FACING_BACK)
//                .build();
//
//        InputImage inputImage = InputImage.fromByteBuffer(data,
//                frameMetadata.getWidth(),
//                frameMetadata.getHeight()/2,
//                frameMetadata.getRotation(),
//                InputImage.IMAGE_FORMAT_NV21);
//
//
//        rootView.addView(graphicOverlay);
//
//        textRecognitionProcessor.detectInVisionImagePublic(inputImage, frameMetadata, graphicOverlay);
    }

    private void runTextRecognition(Bitmap mSelectedImage, GraphicOverlay graphicOverlayNew) {

        //prepare input image using bitmap
        InputImage image = InputImage.fromBitmap(mSelectedImage, 0);

        //creating TextRecognizer instance
        TextRecognizer recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS);

        //process the image
        recognizer.process(image)
                .addOnSuccessListener(
                        new OnSuccessListener<Text>() {
                            @Override
                            public void onSuccess(Text texts) {
                                //Task completed successfully
                                processTextRecognitionResult(texts, activity, graphicOverlayNew);
                            }
                        })
                .addOnFailureListener(
                        new OnFailureListener() {
                            @Override
                            public void onFailure(@NonNull Exception e) {
                                // Task failed with an exception
                                e.printStackTrace();
                            }
                        });
    }

    private void processTextRecognitionResult(Text texts, AppCompatActivity activity, GraphicOverlay mGraphicOverlay) {
        List<Text.TextBlock> blocks = texts.getTextBlocks();
        if (blocks.size() == 0) {
            Toast.makeText(activity, "No text found", Toast.LENGTH_SHORT).show();
            return;
        }
//        mGraphicOverlay.clear();
        for (Text.TextBlock block : texts.getTextBlocks()) {
            for (Text.Line line : block.getLines()) {
                for (Text.Element element : line.getElements()) {
                    //draws the bounding box around the element.
//                    GraphicOverlay.Graphic textGraphic = new TextGraphic(mGraphicOverlay, element);
//                    mGraphicOverlay.add(textGraphic);
                    Log.d("RECOGNISEDTEXT", element.getText());
                }
            }
        }
    }

    private int getRotation(AppCompatActivity activity) {
        WindowManager windowManager = (WindowManager) activity.getSystemService(Context.WINDOW_SERVICE);
        int degrees = 0;
        int rotation = windowManager.getDefaultDisplay().getRotation();
        switch (rotation) {
            case Surface.ROTATION_0:
                degrees = 0;
                break;
            case Surface.ROTATION_90:
                degrees = 90;
                break;
            case Surface.ROTATION_180:
                degrees = 180;
                break;
            case Surface.ROTATION_270:
                degrees = 270;
                break;
            default:
                Log.e(TAG, "Bad rotation value: " + rotation);
        }


        int angle;
        angle = (activity.getResources().getConfiguration().orientation - degrees + 360) % 360;

        // This corresponds to the rotation constants.
        rotation = angle;

        return rotation;
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

    public static ByteBuffer convert(Bitmap bitmap) {
        int bytes = bitmap.getByteCount();
        ByteBuffer buffer = ByteBuffer.allocateDirect(bytes);
        bitmap.copyPixelsToBuffer(buffer);
        buffer.flip(); // Prepare the buffer for reading

        return buffer;
    }

    @Override
    public void onSuccess(MRZInfo mrzInfo) {
        Log.d(TAG, "MRZ is : " + mrzInfo.getDocumentNumber());
    }

    @Override
    public void onError(Exception exp) {

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
