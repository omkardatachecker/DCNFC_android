package com.example.myapplication.db;


import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DBHelper extends SQLiteOpenHelper {
    // Define table name, columns, and other necessary details

    //Table image_data
    public static final String TABLE_NAME = "image_data_table";
    public static final String COLUMN_NAME = "image_data";
    public static final String ID = "id";


    public DBHelper(Context context) {
        super(context, "my_database", null, 1);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        // Create the table if it doesn't exist
//        db.execSQL("CREATE TABLE TABLE_NAME (_id INTEGER PRIMARY KEY AUTOINCREMENT, COLUMN_NAME TEXT)");
        String query = "CREATE TABLE " + TABLE_NAME + "(" + ID + " INTEGER PRIMARY KEY AUTOINCREMENT," + COLUMN_NAME +" TEXT);" ;
        db.execSQL(query);
    }

    @Override
    public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {

    }

    // Define methods for inserting, updating, and querying data
}
