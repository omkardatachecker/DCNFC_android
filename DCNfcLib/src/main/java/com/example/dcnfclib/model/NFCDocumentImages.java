package com.example.dcnfclib.model;

import android.graphics.Bitmap;
import android.os.Parcel;
import android.os.Parcelable;

import androidx.annotation.NonNull;

import java.util.List;

public class NFCDocumentImages implements Parcelable {

    private Bitmap faceImage;
    private Bitmap portraitImage;
    private Bitmap signature;
    private List<Bitmap> fingerprints;

    public Bitmap getFaceImage() {
        return faceImage;
    }

    public void setFaceImage(Bitmap faceImage) {
        this.faceImage = faceImage;
    }

    public Bitmap getPortraitImage() {
        return portraitImage;
    }

    public void setPortraitImage(Bitmap portraitImage) {
        this.portraitImage = portraitImage;
    }

    public Bitmap getSignature() {
        return signature;
    }

    public void setSignature(Bitmap signature) {
        this.signature = signature;
    }

    public List<Bitmap> getFingerprints() {
        return fingerprints;
    }

    public void setFingerprints(List<Bitmap> fingerprints) {
        this.fingerprints = fingerprints;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(@NonNull Parcel parcel, int i) {

    }
}
