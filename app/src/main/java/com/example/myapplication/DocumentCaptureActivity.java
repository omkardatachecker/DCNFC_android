package com.example.myapplication;

import static com.example.myapplication.MainActivity.IMAGE_DATA;
import static com.example.myapplication.db.DBHelper.COLUMN_NAME;
import static com.example.myapplication.db.DBHelper.ID;
import static com.example.myapplication.db.DBHelper.TABLE_NAME;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.lifecycle.ViewModel;
import androidx.lifecycle.ViewModelProvider;
import androidx.webkit.WebMessageCompat;
import androidx.webkit.WebViewAssetLoader;
import androidx.webkit.WebViewClientCompat;
import androidx.webkit.WebViewCompat;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ContentValues;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.sqlite.SQLiteDatabase;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.webkit.ConsoleMessage;
import android.webkit.JavascriptInterface;
import android.webkit.PermissionRequest;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;

//import com.alimert.passportreader.R;
//import com.alimert.passportreader.util.Image;

import com.example.myapplication.db.DBHelper;
import com.example.myapplication.viewmodel.ImageDataViewModel;
import com.google.gson.Gson;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;


public class DocumentCaptureActivity extends AppCompatActivity {
    private static final int MY_CAMERA_REQUEST_CODE = 100;


    private WebView webView;

    class JsObject {
        @JavascriptInterface
        public void postMessage(String data) {
            Log.i("JsObject", "postMessage data="+data);
            //handle data here
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_document_capture);
        webView = findViewById(R.id.dc_webview);
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setMediaPlaybackRequiresUserGesture(false);

        final WebViewAssetLoader assetLoader = new WebViewAssetLoader.Builder()
                .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this))
                .addPathHandler("/res/", new WebViewAssetLoader.ResourcesPathHandler(this))
                .build();
        webView.setWebViewClient(new LocalContentWebViewClient(assetLoader));
        webView.addJavascriptInterface(new ImageListner() , "imageMessageHandler");
        webView.addJavascriptInterface(new ExitListner() , "exitMessageHandler");
//        webView.addJavascriptInterface(new LogListner() , "logMessageHandler");
        webView.addJavascriptInterface(new OutputListner() , "outPutMessageHandler");

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
                String message = consoleMessage.message();
                String sourceId = consoleMessage.sourceId();
                int lineNumber = consoleMessage.lineNumber();
                Log.d("JavaScriptLog", message + " -- From line " + lineNumber + " of " + sourceId);
                return true;
            }

            @Override
            public void onPermissionRequest(final PermissionRequest request) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                    request.grant(request.getResources());
                }
            }
        });


        webView.loadUrl("https://appassets.androidplatform.net/assets/index.html");



    }

    private class LocalContentWebViewClient extends WebViewClientCompat {

        private final WebViewAssetLoader mAssetLoader;

        LocalContentWebViewClient(WebViewAssetLoader assetLoader) {
            mAssetLoader = assetLoader;
        }

        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon) {
            super.onPageStarted(view, url, favicon);
            String script = "\"\"\n" +
                    "            function log(emoji, type, args) {\n" +
                    "              window.outPutMessageHandler.postMessage(\n" +
//                    "              CustomMessageHandler.postMessage(\n" +
                    "                `${emoji} JS ${type}: ${Object.values(args)\n" +
                    "                  .map(v => typeof(v) === \"undefined\" ? \"undefined\" : typeof(v) === \"object\" ? JSON.stringify(v) : v.toString())\n" +
                    "                  .map(v => v.substring(0, 3000)) // Limit msg to 3000 chars\n" +
                    "                  .join(\", \")}`\n" +
                    "              )\n" +
                    "            }\n" +
                    "        \n" +
                    "            let originalLog = console.log\n" +
                    "            let originalWarn = console.warn\n" +
                    "            let originalError = console.error\n" +
                    "            let originalDebug = console.debug\n" +
                    "        \n" +
                    "            console.log = function() { log(\"\uD83D\uDCD7\", \"log\", arguments); originalLog.apply(null, arguments) }\n" +
                    "            console.warn = function() { log(\"\uD83D\uDCD9\", \"warning\", arguments); originalWarn.apply(null, arguments) }\n" +
                    "            console.error = function() { log(\"\uD83D\uDCD5\", \"error\", arguments); originalError.apply(null, arguments) }\n" +
                    "            console.debug = function() { log(\"\uD83D\uDCD8\", \"debug\", arguments); originalDebug.apply(null, arguments) }\n" +
                    "        \n" +
                    "            window.addEventListener(\"error\", function(e) {\n" +
                    "               log(\"\uD83D\uDCA5\", \"Uncaught\", [`${e.message} at ${e.filename}:${e.lineno}:${e.colno}`])\n" +
                    "            })\n" +
                    "        \"\"";

            view.evaluateJavascript(script, new ValueCallback<String>() {
                @Override
                public void onReceiveValue(String s) {
                    Log.d("JavaScript onPageStart", s);
                }
            });
        }

        @Override
        public void onPageFinished(WebView view, String url) {
            super.onPageFinished(view, url);
            Log.d("*****", "Page load complete");

           pageLoadFinished(view);

        }

        @Override
        @RequiresApi(21)
        public WebResourceResponse shouldInterceptRequest(WebView view,
                                                          WebResourceRequest request) {
            return mAssetLoader.shouldInterceptRequest(request.getUrl());
        }



        @Override
        @SuppressWarnings("deprecation") // to support API < 21
        public WebResourceResponse shouldInterceptRequest(WebView view,
                                                          String url) {
            return mAssetLoader.shouldInterceptRequest(Uri.parse(url));
        }
    }

    private void pageLoadFinished(WebView view) {
        if (ContextCompat.checkSelfPermission(DocumentCaptureActivity.this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                requestPermissions(new String[]{Manifest.permission.CAMERA}, MY_CAMERA_REQUEST_CODE);
            }
        }else  {
            String modelUrl = "https://appassets.androidplatform.net/assets/models/";
            String script = "\"\"\n" +
                    "        window.AC = new Autocapture();\n" +
                    "        window.AC.init({\n" +
                    "            CONTAINER_ID: 'AC_mount',\n" +
                    "            LANGUAGE: 'en',\n" +
                    "            MRZ: false,\n" +
                    "            CHECK_TOTAL:5,\n" +
                    "            CROP_CARD: true,\n" +
                    "            MRZ_SETTINGS: {\n" +
                    "                MRZ_RETRIES: 10,\n" +
                    "                FLIP: true,\n" +
                    "                FLIP_EXCEPTION: ['P'],\n" +
                    "                MIN_VALID_SCORE: 50,\n" +
                    "                OCR: true\n" +
                    "            },\n" +
                    "            MODELS_PATH:\"" + modelUrl + "\",\n" +
                    "            onComplete: function (data) {\n" +
                    "                imageMessageHandler.postMessage(JSON.stringify(data));\n" +
//                    "                CustomMessageHandler.postMessage(data);\n" +
                    "                window.AC.stop()\n" +
                    "            },\n" +
                    "            onError: function(error) {\n" +
                    "                console.log(error)\n" +
                    "                window.AC.stop();\n" +
                    "                window.AC.alert(error)\n" +
                    "            },\n" +
//                    "           onImage: function (data) {\n" +
//                    "                    window.imageMessageHandler.postMessage(data);\n" +
//                    "                    CustomMessageHandler.postMessage(data);\n" +
//                    "                       },\n" +
                    "                       onUserExit: function (data) {\n" +
                    "                           window.exitMessageHandler.postMessage(data);\n" +
//                    "                           CustomMessageHandler.postMessage(data);\n" +
                    "                       }\n" +
                    "                   });\n" +
                    "        \"\"";

            Log.d("JavaScript SCRIPT", script);

            view.evaluateJavascript(script, new ValueCallback<String>() {
                @Override
                public void onReceiveValue(String s) {
                    Log.d("JavaScriptLog", s);
                }
            });
        }

    }

//    private void pageLoadFinished(WebView view) {
//        if (ContextCompat.checkSelfPermission(DocumentCaptureActivity.this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
//            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
//                requestPermissions(new String[]{Manifest.permission.CAMERA}, MY_CAMERA_REQUEST_CODE);
//            }
//        }else  {
//            String modelUrl = "https://appassets.androidplatform.net/assets/models/";
//
//            String script = "\"\"\n" +
//                    "        window.AC = new Autocapture();\n" +
//                    "        window.AC.init({\n" +
//                    "            CONTAINER_ID: 'AC_mount',\n" +
//                    "            LANGUAGE: 'en',\n" +
//                    "            MRZ: false,\n" +
//                    "            CHECK_TOTAL:5,\n" +
//                    "            CROP_CARD: true,\n" +
//                    "            MRZ_SETTINGS: {\n" +
//                    "                MRZ_RETRIES: 50,\n" +
//                    "                FLIP: true,\n" +
//                    "                FLIP_EXCEPTION: ['P'],\n" +
//                    "                MIN_VALID_SCORE: 50,\n" +
//                    "                OCR: true\n" +
//                    "            },\n" +
//                    "            MODELS_PATH:\"" + modelUrl + "\",\n" +
//                    "            onComplete: function (data) {\n" +
//                    "                  console.log(data);\n" +
//                    "                imageMessageHandler.postMessage(JSON.stringify(data));\n" +
//                    "                window.AC.stop()\n" +
//                    "            },\n" +
//                    "            onError: function(error) {\n" +
//                    "                console.log(error)\n" +
//                    "                window.AC.stop();\n" +
//                    "                window.AC.alert(error)\n" +
//                    "            },\n" +
////                    "           onImage: function (data) {\n" +
////                    "                    imageMessageHandler.postMessage(JSON.stringify(data));\n" +
////                    "                       },\n" +
//                    "                       onUserExit: function (JSON.stringify(data)) {\n" +
//                    "                           window.webkit.messageHandlers.exit.postMessage(data);\n" +
//                    "                       }\n" +
//                    "                   });\n" +
//                    "        \"\"";
//
//            Log.d("JavaScript SCRIPT", script);
//
//
////            String script2 = "\"\"\n" +
////                    "              let FV = new FaceVerify();\n" +
////                    "              FV.init({\n" +
////                    "                  CONTAINER_ID: 'FV_mount',\n" +
////                    "                  LANGUAGE: 'en',\n" +
////                    "                  MODELS_PATH:\"\\(modelURL)\",\n" +
////                    "                  TOKEN:\"\\(self.tokenResponseModel.token)\",\n" +
////                    "                  onComplete: function(data) {\n" +
////                    "                      console.log(data)\n" +
////                    "                      window.webkit.messageHandlers.output.postMessage(data);\n" +
////                    "                      FV.stop();\n" +
////                    "                  },\n" +
////                    "                  onError: function(error) {\n" +
////                    "                      console.log(error)\n" +
////                    "                      FV.stop();\n" +
////                    "                  }, onUserExit: function (data) {\n" +
////                    "                           window.webkit.messageHandlers.exit.postMessage(data);\n" +
////                    "                       }\n" +
////                    "              });\n" +
////                    "              \"\"";
//
//            view.evaluateJavascript(script, new ValueCallback<String>() {
//                @Override
//                public void onReceiveValue(String s) {
//                    Log.d("JavaScriptLog", s);
//                }
//            });
//        }
//
//    }

//    @JavascriptInterface
//    public void postMessage(String message) {
//        Log.d("JavaScript LogpostMesss", message);
//    }

    public class LogListner {
        @JavascriptInterface
        public void postMessage(String message) {
            Log.d("LogListner" , message);
        }
    }

    public class ImageListner{
        @JavascriptInterface
        public void postMessage(String message) throws JSONException {
            Log.d("ImageListner" , message);
            Log.d("ImageListner" , "message Printed");
            ArrayList<String> stringArray = new ArrayList<String>();

            Gson gson = new Gson();
            ImagesModel imagesModel = gson.fromJson(message, ImagesModel.class);
//            for (int i = 0; i < jsonArray.length(); i++) {
//                stringArray.add(jsonArray.getString(i));
//            }
//            ImageDataViewModel imageDataViewModel = new ViewModelProvider(DocumentCaptureActivity.this).get(ImageDataViewModel.class);
//            imageDataViewModel.setData(imagesModel);

            DBHelper dbHelper = new DBHelper(DocumentCaptureActivity.this);
            SQLiteDatabase db = dbHelper.getWritableDatabase();

            ContentValues values = new ContentValues();
            values.put(COLUMN_NAME, message);
            values.put(ID, 1);
            long newRowId = 0;
            try {
                newRowId = db.insert(TABLE_NAME, null, values);
            } catch (Exception e) {
                e.printStackTrace();
            }

            if (newRowId == -1) {
                newRowId = db.update(TABLE_NAME, values,  ID + "=1", null );
            }
            Intent returnIntent = new Intent();
            returnIntent.putExtra(IMAGE_DATA, newRowId);
            setResult(Activity.RESULT_OK, returnIntent);
            finish();

        }
    }

    String writeToFileAndReturnPath(String data) {
        String path = "";


        return path;
    }

    public class ExitListner {
        @JavascriptInterface
        public void postMessage(String message) {
            Log.d("ExitListner" , message);
        }
    }

    public class OutputListner {
        @JavascriptInterface
        public void postMessage(String message) {
            Log.d("ExitListner" , message);
        }
    }

//    @JavascriptInterface
//    public void showMsg(String message) {
//        Log.d("ReceivedMessage", message);
//    }
//
//    @JavascriptInterface
//    public void showMsg(String message) {
//        Log.d("ReceivedMessage", message);
//    }

}