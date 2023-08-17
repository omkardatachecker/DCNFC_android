package com.example.myapplication.viewmodel;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.example.myapplication.ImagesModel;

import java.util.ArrayList;

public class ImageDataViewModel extends ViewModel {

    private MutableLiveData<ImagesModel> data = new MutableLiveData<>();

    public MutableLiveData<ImagesModel> getData() {
        return data;
    }

    public void setData(MutableLiveData<ImagesModel> data) {
        this.data = data;
    }
}
