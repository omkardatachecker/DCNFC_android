package com.example.myapplication;

import androidx.lifecycle.MutableLiveData;

import java.util.ArrayList;

public class ImagesModel extends MutableLiveData<ImagesModel> {
    ArrayList<String> images;

    public ArrayList<String> getImages() {
        return images;
    }

    public void setImages(ArrayList<String> images) {
        this.images = images;
    }
}
