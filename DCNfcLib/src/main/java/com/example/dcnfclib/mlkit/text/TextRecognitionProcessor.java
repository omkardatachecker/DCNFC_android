package com.example.dcnfclib.mlkit.text;

import android.graphics.Color;
import android.os.Handler;
import android.util.Log;

import androidx.annotation.NonNull;


import com.example.dcnfclib.mlkit.other.FrameMetadata;
import com.example.dcnfclib.mlkit.other.GraphicOverlay;
import com.example.dcnfclib.model.DocType;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.mlkit.common.MlKitException;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.text.Text;
import com.google.mlkit.vision.text.TextRecognition;
import com.google.mlkit.vision.text.TextRecognizer;
import com.google.mlkit.vision.text.latin.TextRecognizerOptions;

import net.sf.scuba.data.Gender;

import org.jmrtd.lds.icao.MRZInfo;

import java.nio.ByteBuffer;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TextRecognitionProcessor {

    private static final String TAG = TextRecognitionProcessor.class.getName();

    private final TextRecognizer textRecognizer;

    private ResultListener resultListener;

    private String scannedTextBuffer;

    private DocType docType;

    public static final String TYPE_PASSPORT = "P<";

    public static final String TYPE_ID_CARD = "I<";

    public static final String ID_CARD_TD_1_LINE_1_REGEX = "([A|C|I][A-Z0-9<]{1})([A-Z]{3})([A-Z0-9<]{25})";

    public static final String ID_CARD_TD_1_LINE_2_REGEX = "([0-9]{6})([0-9]{1})([M|F|X|<]{1})([0-9]{6})([0-9]{1})([A-Z]{3})([A-Z0-9<]{11})([0-9]{1})";

    public static final String ID_CARD_TD_1_LINE_3_REGEX = "([A-Z0-9<]{30})";

    public static final String PASSPORT_TD_3_LINE_1_REGEX = "(P[A-Z0-9<]{1})([A-Z]{3})([A-Z0-9<]{39})";

    public static final String PASSPORT_TD_3_LINE_2_REGEX = "([A-Z0-9<]{9})([0-9]{1})([A-Z]{3})([0-9]{6})([0-9]{1})([M|F|X|<]{1})([0-9]{6})([0-9]{1})([A-Z0-9<]{14})([0-9<]{1})([0-9]{1})";

    // Whether we should ignore process(). This is usually caused by feeding input data faster than
    // the model can handle.
    private final AtomicBoolean shouldThrottle = new AtomicBoolean(false);

    public TextRecognitionProcessor(ResultListener resultListener) {
//        this.docType = docType;
        this.resultListener = resultListener;
        textRecognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS);
    }

    //region ----- Exposed Methods -----


    public void stop() {
        textRecognizer.close();
    }


    public void process(ByteBuffer data, FrameMetadata frameMetadata, GraphicOverlay graphicOverlay) throws MlKitException {

        if (shouldThrottle.get()) {
            return;
        }

        InputImage inputImage = InputImage.fromByteBuffer(data,
                frameMetadata.getWidth(),
                frameMetadata.getHeight(),
                frameMetadata.getRotation(),
                InputImage.IMAGE_FORMAT_NV21);



        detectInVisionImage(inputImage, frameMetadata, graphicOverlay);
    }

    //endregion

    //region ----- Helper Methods -----

    protected Task<Text> detectInImage(InputImage image) {
        return textRecognizer.process(image);
    }


    protected void onSuccess(@NonNull Text results, @NonNull FrameMetadata frameMetadata, @NonNull GraphicOverlay graphicOverlay) {

        graphicOverlay.clear();

        scannedTextBuffer = "";

        List<Text.TextBlock> blocks = results.getTextBlocks();

        for (int i = 0; i < blocks.size(); i++) {
            List<Text.Line> lines = blocks.get(i).getLines();
            for (int j = 0; j < lines.size(); j++) {
                List<Text.Element> elements = lines.get(j).getElements();
                for (int k = 0; k < elements.size(); k++) {
                    filterScannedText(graphicOverlay, elements.get(k));
                }
            }
        }
    }

    private DocType getDocumentType(String scannedTextBuffer) {
//        String firstTwoChars = firstTwo(scannedTextBuffer);
//        if (firstTwoChars == "I<") {
//            return DocType.ID_CARD;
//        } else if (firstTwoChars == "P<") {
//            return DocType.PASSPORT;
//        } else {
//            return DocType.OTHER;
//        }
        if (scannedTextBuffer.contains("I<")){
            return DocType.ID_CARD;
        } else if (scannedTextBuffer.contains("P<")) {
            return DocType.PASSPORT;
        } else {
            return DocType.OTHER;
        }
    }

    private String firstTwo(String str) {

        if(str.length()<2){
            return str;
        }
        else{
            return str.substring(0,2);
        }
    }

    private void filterScannedText(GraphicOverlay graphicOverlay, Text.Element element) {
        GraphicOverlay.Graphic textGraphic = new TextGraphic(graphicOverlay, element, Color.GREEN);
        scannedTextBuffer += element.getText();
        docType = getDocumentType(scannedTextBuffer);

        Log.d(TAG, "Scanned text Buffer is : " + scannedTextBuffer);

        if(docType == DocType.ID_CARD) {
            Log.d("ID_CARD", "**** ID_CARD Detected");
//            Log.d(TAG, "Scanned text Buffer is : " + scannedTextBuffer);
            Pattern patternIDCardTD1Line1 = Pattern.compile(ID_CARD_TD_1_LINE_1_REGEX);
            Matcher matcherIDCardTD1Line1 = patternIDCardTD1Line1.matcher(scannedTextBuffer);

            Pattern patternIDCardTD1Line2 = Pattern.compile(ID_CARD_TD_1_LINE_2_REGEX);
            Matcher matcherIDCardTD1Line2 = patternIDCardTD1Line2.matcher(scannedTextBuffer);

            if(matcherIDCardTD1Line1.find() && matcherIDCardTD1Line2.find()) {
                graphicOverlay.add(textGraphic);
                String line1 = matcherIDCardTD1Line1.group(0);
                String line2 = matcherIDCardTD1Line2.group(0);
                int indexOfID = line1.indexOf(TYPE_ID_CARD);
                if ( indexOfID >= 0) {
                    line1 = line1.substring(line1.indexOf(TYPE_ID_CARD));
                    String documentNumber = line1.substring(5, 14);
                    documentNumber = documentNumber.replace("O", "0");
                    String dateOfBirthDay = line2.substring(0, 6);
                    String expiryDate = line2.substring(8, 14);

                    Log.d(TAG, "Scanned Text Buffer ID Card ->>>> " + "Doc Number: " + documentNumber + " DateOfBirth: " + dateOfBirthDay + " ExpiryDate: " + expiryDate);

                    MRZInfo mrzInfo = buildTempMrz(documentNumber, dateOfBirthDay, expiryDate);

                    if (mrzInfo != null) {
                        Log.d(TAG, "Calling finishScanning1: " + mrzInfo.getDocumentNumber() );
                        finishScanning(mrzInfo);
                    } else  {
                        Log.d(TAG, "Failed Calling finishScanning1: MRZINFO is NULL" );
                    }
                }
            }
        } else if (docType == DocType.PASSPORT) {
            Log.d("PASSPORT", "**** PASSPORT Detected");

            Pattern patternPassportTD3Line1 = Pattern.compile(PASSPORT_TD_3_LINE_1_REGEX);
            Matcher matcherPassportTD3Line1 = patternPassportTD3Line1.matcher(scannedTextBuffer);

            Pattern patternPassportTD3Line2 = Pattern.compile(PASSPORT_TD_3_LINE_2_REGEX);
            Matcher matcherPassportTD3Line2 = patternPassportTD3Line2.matcher(scannedTextBuffer);

            if(matcherPassportTD3Line1.find() && matcherPassportTD3Line2.find()) {
                graphicOverlay.add(textGraphic);
                String line2 = matcherPassportTD3Line2.group(0);
                String documentNumber = line2.substring(0, 9);
                documentNumber = documentNumber.replace("O", "0");
                String dateOfBirthDay = line2.substring(13, 19);
                String expiryDate = line2.substring(21, 27);

                Log.d(TAG, "Scanned Text Buffer Passport ->>>> " + "Doc Number: " + documentNumber + " DateOfBirth: " + dateOfBirthDay + " ExpiryDate: " + expiryDate);

                MRZInfo mrzInfo = buildTempMrz(documentNumber, dateOfBirthDay, expiryDate);

                if (mrzInfo != null)
                    Log.d(TAG, "Calling finishScanning2: " + mrzInfo.getDocumentNumber());
                    finishScanning(mrzInfo);
                } else {
                Log.d(TAG, "Failed Calling finishScanning2: MRZINFO is NULL" );
            }
        }
    }



    protected void onFailure(@NonNull Exception e) {
        Log.w(TAG, "Text detection failed." + e);
        resultListener.onError(e);
    }

    private void detectInVisionImage(InputImage image, final FrameMetadata metadata, final GraphicOverlay graphicOverlay) {

        detectInImage(image)
                .addOnSuccessListener(
                        new OnSuccessListener<Text>() {
                            @Override
                            public void onSuccess(Text results) {
                                shouldThrottle.set(false);
                                TextRecognitionProcessor.this.onSuccess(results, metadata, graphicOverlay);
                                Log.d(TAG, "TEXT RESULT" + results.getText());
                            }
                        })
                .addOnFailureListener(
                        new OnFailureListener() {
                            @Override
                            public void onFailure(@NonNull Exception e) {
                                shouldThrottle.set(false);
                                Log.d(TAG, "EXCEPTION" + e.getLocalizedMessage());
                                TextRecognitionProcessor.this.onFailure(e);
                            }
                        });
        // Begin throttling until this frame of input has been processed, either in onSuccess or
        // onFailure.
        shouldThrottle.set(true);
    }

    private void finishScanning(final MRZInfo mrzInfo) {
        try {
            if(isMrzValid(mrzInfo)) {
                // Delay returning result 1 sec. in order to make mrz text become visible on graphicOverlay by user
                // You want to call 'resultListener.onSuccess(mrzInfo)' without no delay
                Log.d(TAG, "MRZInfo: " + mrzInfo.getDocumentNumber());
                new Handler().postDelayed(() -> resultListener.onSuccess(mrzInfo), 1000);
            }

        } catch(Exception exp) {
            Log.d(TAG, "MRZ DATA is not valid");
        }
    }

    private MRZInfo buildTempMrz(String documentNumber, String dateOfBirth, String expiryDate) {
        MRZInfo mrzInfo = null;
        try {
            mrzInfo = new MRZInfo("P","NNN", "", "", documentNumber, "NNN", dateOfBirth, Gender.UNSPECIFIED, expiryDate, "");
        } catch (Exception e) {
            Log.d(TAG, "MRZInfo error : " + e.getLocalizedMessage());
        }

        return mrzInfo;
    }

    private boolean isMrzValid(MRZInfo mrzInfo) {
        return mrzInfo.getDocumentNumber() != null && mrzInfo.getDocumentNumber().length() >= 8 &&
                mrzInfo.getDateOfBirth() != null && mrzInfo.getDateOfBirth().length() == 6 &&
                mrzInfo.getDateOfExpiry() != null && mrzInfo.getDateOfExpiry().length() == 6;
    }

    public interface ResultListener {
        void onSuccess(MRZInfo mrzInfo);
        void onError(Exception exp);
    }
}

