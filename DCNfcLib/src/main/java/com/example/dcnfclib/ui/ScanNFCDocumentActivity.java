package com.example.dcnfclib.ui;

import static android.widget.Toast.LENGTH_LONG;
import static com.example.dcnfclib.DCNFCLib.E_DOCUMENT;
import static com.example.dcnfclib.ui.CaptureActivity.MRZ_RESULT;
import static org.jmrtd.PassportService.DEFAULT_MAX_BLOCKSIZE;
import static org.jmrtd.PassportService.NORMAL_MAX_TRANCEIVE_LENGTH;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.app.PendingIntent;
import android.content.Intent;
import android.graphics.Bitmap;
import android.nfc.NfcAdapter;
import android.nfc.Tag;
import android.nfc.tech.IsoDep;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.example.dcnfclib.R;
import com.example.dcnfclib.model.AdditionalPersonDetails;
import com.example.dcnfclib.model.DocType;
import com.example.dcnfclib.model.EDocument;
import com.example.dcnfclib.model.PersonDetails;
import com.example.dcnfclib.util.DateUtil;
import com.example.dcnfclib.util.Image;
import com.example.dcnfclib.util.ImageUtil;
import com.google.gson.Gson;

import net.sf.scuba.smartcards.CardFileInputStream;
import net.sf.scuba.smartcards.CardService;

import org.jmrtd.BACKey;
import org.jmrtd.BACKeySpec;
import org.jmrtd.PassportService;
import org.jmrtd.lds.CardSecurityFile;
import org.jmrtd.lds.DisplayedImageInfo;
import org.jmrtd.lds.PACEInfo;
import org.jmrtd.lds.SecurityInfo;
import org.jmrtd.lds.icao.DG11File;
import org.jmrtd.lds.icao.DG15File;
import org.jmrtd.lds.icao.DG1File;
import org.jmrtd.lds.icao.DG2File;
import org.jmrtd.lds.icao.DG3File;
import org.jmrtd.lds.icao.DG5File;
import org.jmrtd.lds.icao.DG7File;
import org.jmrtd.lds.icao.MRZInfo;
import org.jmrtd.lds.iso19794.FaceImageInfo;
import org.jmrtd.lds.iso19794.FaceInfo;
import org.jmrtd.lds.iso19794.FingerImageInfo;
import org.jmrtd.lds.iso19794.FingerInfo;

import java.security.PublicKey;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

public class ScanNFCDocumentActivity extends AppCompatActivity {

    private  NfcAdapter adapter;
    private String passportNumber;

    private MRZInfo mrzInfo;
    private String expirationDate;
    private String birthDate;

    private static final String TAG = ScanNFCDocumentActivity.class.getSimpleName();

    private DocType docType;

    private View loadingLayout;
    private View imageLayout;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_scan_mrz);

        loadingLayout = findViewById(R.id.loading_layout);
        imageLayout = findViewById(R.id.image_layout);

        Intent intent = getIntent();
        mrzInfo = (MRZInfo) intent.getSerializableExtra(MRZ_RESULT);
        adapter = NfcAdapter.getDefaultAdapter(this);

        passportNumber = mrzInfo.getDocumentNumber();
        expirationDate = mrzInfo.getDateOfExpiry();
        birthDate = mrzInfo.getDateOfBirth();
    }

    @Override
    protected void onResume() {
        super.onResume();
        readNFCData();
    }

    @Override
    protected void onPause() {
        super.onPause();

        if (adapter != null) {
            adapter.disableForegroundDispatch(this);
        }
    }

    private void readNFCData() {
        if (adapter != null) {
            Intent intent = new Intent(getApplicationContext(), this.getClass());
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            PendingIntent pendingIntent ;//= PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.S) {
                pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_MUTABLE);
            }
            else
            {
                pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
            }
            String[][] filter = new String[][]{new String[]{"android.nfc.tech.IsoDep"}};
            adapter.enableForegroundDispatch(this, pendingIntent, null, filter);
        }
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        String actionString = intent.getAction();
        if (NfcAdapter.ACTION_TECH_DISCOVERED.equals(actionString)) {
            Tag tag = intent.getExtras().getParcelable(NfcAdapter.EXTRA_TAG);
            if (Arrays.asList(tag.getTechList()).contains("android.nfc.tech.IsoDep")) {
                if (passportNumber != null && !passportNumber.isEmpty()
                        && expirationDate != null && !expirationDate.isEmpty()
                        && birthDate != null && !birthDate.isEmpty()) {
                    BACKeySpec bacKey = new BACKey(passportNumber, birthDate, expirationDate);
                    new ReadTask(IsoDep.get(tag), bacKey).execute();
//                    mainLayout.setVisibility(View.GONE);
//                    imageLayout.setVisibility(View.GONE);
                    loadingLayout.setVisibility(View.VISIBLE);
                } else {
                    Toast.makeText(this, R.string.error_input, LENGTH_LONG).show();
                }
            }
        }
    }

    private class ReadTask extends AsyncTask<Void, Void, Exception> {

        private IsoDep isoDep;
        private BACKeySpec bacKey;

        private ReadTask(IsoDep isoDep, BACKeySpec bacKey) {
            this.isoDep = isoDep;
            this.bacKey = bacKey;
        }

        EDocument eDocument = new EDocument();
        //        DocType docType = DocType.OTHER;
        PersonDetails personDetails = new PersonDetails();
        AdditionalPersonDetails additionalPersonDetails = new AdditionalPersonDetails();

        @Override
        protected Exception doInBackground(Void... params) {

            try {
                CardService cardService = CardService.getInstance(isoDep);
                cardService.open();

                PassportService service = new PassportService(cardService, NORMAL_MAX_TRANCEIVE_LENGTH, DEFAULT_MAX_BLOCKSIZE, true, false);
                service.open();

                boolean paceSucceeded = false;
                try {
                    CardSecurityFile cardSecurityFile = new CardSecurityFile(service.getInputStream(PassportService.EF_CARD_SECURITY));
                    Collection<SecurityInfo> securityInfoCollection = cardSecurityFile.getSecurityInfos();
                    for (SecurityInfo securityInfo : securityInfoCollection) {
                        if (securityInfo instanceof PACEInfo) {
                            PACEInfo paceInfo = (PACEInfo) securityInfo;
                            service.doPACE(bacKey, paceInfo.getObjectIdentifier(), PACEInfo.toParameterSpec(paceInfo.getParameterId()), null);
                            paceSucceeded = true;
                        }
                    }
                } catch (Exception e) {
                    Log.w(TAG, e);
                }

                service.sendSelectApplet(paceSucceeded);

                if (!paceSucceeded) {
                    try {
                        service.getInputStream(PassportService.EF_COM).read();
                    } catch (Exception e) {
                        service.doBAC(bacKey);
                    }
                }

                // -- Personal Details -- //
                CardFileInputStream dg1In = service.getInputStream(PassportService.EF_DG1);
                DG1File dg1File = new DG1File(dg1In);


                MRZInfo mrzInfo = dg1File.getMRZInfo();
                personDetails.setName(mrzInfo.getSecondaryIdentifier().replace("<", " ").trim());
                personDetails.setSurname(mrzInfo.getPrimaryIdentifier().replace("<", " ").trim());
                personDetails.setPersonalNumber(mrzInfo.getPersonalNumber());
                personDetails.setGender(mrzInfo.getGender().toString());
                personDetails.setBirthDate(DateUtil.convertFromMrzDate(mrzInfo.getDateOfBirth()));
                personDetails.setExpiryDate(DateUtil.convertFromMrzDate(mrzInfo.getDateOfExpiry()));
                personDetails.setSerialNumber(mrzInfo.getDocumentNumber());
                personDetails.setNationality(mrzInfo.getNationality());
                personDetails.setIssuerAuthority(mrzInfo.getIssuingState());


                if("I".equals(mrzInfo.getDocumentCode())) {
                    docType = DocType.ID_CARD;
                } else if("P".equals(mrzInfo.getDocumentCode())) {
                    docType = DocType.PASSPORT;
                }

                // -- Face Image -- //
                CardFileInputStream dg2In = service.getInputStream(PassportService.EF_DG2);
                DG2File dg2File = new DG2File(dg2In);

                List<FaceInfo> faceInfos = dg2File.getFaceInfos();
                List<FaceImageInfo> allFaceImageInfos = new ArrayList<>();
                for (FaceInfo faceInfo : faceInfos) {
                    allFaceImageInfos.addAll(faceInfo.getFaceImageInfos());
                }

                if (!allFaceImageInfos.isEmpty()) {
                    FaceImageInfo faceImageInfo = allFaceImageInfos.iterator().next();
                    Image image = ImageUtil.getImage(ScanNFCDocumentActivity.this, faceImageInfo);
                    personDetails.setFaceImage(image.getBitmapImage());
                    personDetails.setFaceImageBase64(image.getBase64Image());
                }

                // -- Fingerprint (if exist)-- //
                try {
                    CardFileInputStream dg3In = service.getInputStream(PassportService.EF_DG3);
                    DG3File dg3File = new DG3File(dg3In);

                    List<FingerInfo> fingerInfos = dg3File.getFingerInfos();
                    List<FingerImageInfo> allFingerImageInfos = new ArrayList<>();
                    for (FingerInfo fingerInfo : fingerInfos) {
                        allFingerImageInfos.addAll(fingerInfo.getFingerImageInfos());
                    }

                    List<Bitmap> fingerprintsImage = new ArrayList<>();

                    if (!allFingerImageInfos.isEmpty()) {

                        for(FingerImageInfo fingerImageInfo : allFingerImageInfos) {
                            Image image = ImageUtil.getImage(ScanNFCDocumentActivity.this, fingerImageInfo);
                            fingerprintsImage.add(image.getBitmapImage());
                        }

                        personDetails.setFingerprints(fingerprintsImage);

                    }
                } catch (Exception e) {
                    Log.w(TAG, e);
                }

                // -- Portrait Picture -- //
                try {
                    CardFileInputStream dg5In = service.getInputStream(PassportService.EF_DG5);
                    DG5File dg5File = new DG5File(dg5In);

                    List<DisplayedImageInfo> displayedImageInfos = dg5File.getImages();
                    if (!displayedImageInfos.isEmpty()) {
                        DisplayedImageInfo displayedImageInfo = displayedImageInfos.iterator().next();
                        Image image = ImageUtil.getImage(ScanNFCDocumentActivity.this, displayedImageInfo);
                        personDetails.setPortraitImage(image.getBitmapImage());
                        personDetails.setPortraitImageBase64(image.getBase64Image());
                    }
                } catch (Exception e) {
                    Log.w(TAG, e);
                }

                // -- Signature (if exist) -- //
                try {
                    CardFileInputStream dg7In = service.getInputStream(PassportService.EF_DG7);
                    DG7File dg7File = new DG7File(dg7In);

                    List<DisplayedImageInfo> signatureImageInfos = dg7File.getImages();
                    if (!signatureImageInfos.isEmpty()) {
                        DisplayedImageInfo displayedImageInfo = signatureImageInfos.iterator().next();
                        Image image = ImageUtil.getImage(ScanNFCDocumentActivity.this, displayedImageInfo);
                        personDetails.setPortraitImage(image.getBitmapImage());
                        personDetails.setPortraitImageBase64(image.getBase64Image());
                    }

                } catch (Exception e) {
                    Log.w(TAG, e);
                }

                // -- Additional Details (if exist) -- //
                try {
                    CardFileInputStream dg11In = service.getInputStream(PassportService.EF_DG11);
                    DG11File dg11File = new DG11File(dg11In);

                    if(dg11File.getLength() > 0) {
                        additionalPersonDetails.setCustodyInformation(dg11File.getCustodyInformation());
                        additionalPersonDetails.setNameOfHolder(dg11File.getNameOfHolder());
                        additionalPersonDetails.setFullDateOfBirth(dg11File.getFullDateOfBirth());
                        additionalPersonDetails.setOtherNames(dg11File.getOtherNames());
                        additionalPersonDetails.setOtherValidTDNumbers(dg11File.getOtherValidTDNumbers());
                        additionalPersonDetails.setPermanentAddress(dg11File.getPermanentAddress());
                        additionalPersonDetails.setPersonalNumber(dg11File.getPersonalNumber());
                        additionalPersonDetails.setPersonalSummary(dg11File.getPersonalSummary());
                        additionalPersonDetails.setPlaceOfBirth(dg11File.getPlaceOfBirth());
                        additionalPersonDetails.setProfession(dg11File.getProfession());
                        additionalPersonDetails.setProofOfCitizenship(dg11File.getProofOfCitizenship());
                        additionalPersonDetails.setTag(dg11File.getTag());
                        additionalPersonDetails.setTagPresenceList(dg11File.getTagPresenceList());
                        additionalPersonDetails.setTelephone(dg11File.getTelephone());
                        additionalPersonDetails.setTitle(dg11File.getTitle());
                    }
                } catch (Exception e) {
                    Log.w(TAG, e);
                }

                // -- Document Public Key -- //
                try {
                    CardFileInputStream dg15In = service.getInputStream(PassportService.EF_DG15);
                    DG15File dg15File = new DG15File(dg15In);
                    PublicKey publicKey = dg15File.getPublicKey();
                    eDocument.setDocPublicKey(publicKey);
                } catch (Exception e) {
                    Log.w(TAG, e);
                }

                eDocument.setDocType(docType);
                eDocument.setPersonDetails(personDetails);
                eDocument.setAdditionalPersonDetails(additionalPersonDetails);

            } catch (Exception e) {
                return e;
            }
            return null;
        }

        @Override
        protected void onPostExecute(Exception exception) {

            loadingLayout.setVisibility(View.GONE);
            if (exception == null) {
                Toast.makeText(ScanNFCDocumentActivity.this, "DOC NO:" + eDocument.getDocType(), LENGTH_LONG);
                Intent returnIntent = new Intent();
                Gson gson = new Gson();
                String eDocumentJson = gson.toJson(eDocument);
                returnIntent.putExtra(E_DOCUMENT, eDocumentJson);
                setResult(Activity.RESULT_OK, returnIntent);
                finish();
            } else {
//                Toast.makeText(this, exception.getLocalizedMessage(), Toast.LENGTH_LONG);
                Toast.makeText(ScanNFCDocumentActivity.this, exception.getLocalizedMessage(), LENGTH_LONG);
            }
        }

    }

}