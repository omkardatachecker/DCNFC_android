package com.example.myapplication;

import android.app.Application;
import android.database.sqlite.SQLiteDatabase;

import com.example.myapplication.db.DBHelper;

public class NFCDemoApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        DBHelper dbHelper = new DBHelper(getApplicationContext());
    }
}
