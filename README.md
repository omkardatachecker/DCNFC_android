# DCNFC_android


## Requirements

    1. Android SDK
    2. gradle >= 8.0.2
    3. Java version 17(Recomended)
     

## Installation

DCNFC_android is available through [Jitpack](https://jitpack.io/). To install
it, simply add the following line to your projects build.gradle file:

1. Add Source repo to Podfile
```ruby
repositories {
        google()
        mavenCentral()
        maven { url 'https://jitpack.io' }
    }
```

2. Add dependency to the app level build.gradle file.

```ruby
	dependencies {
	        implementation 'com.github.omkardatachecker:DCNFC_android:1.0'
	}
```


    
## Usage
You need to import following modules

```java
import com.example.dcnfclib.DCNFCLib;
import com.example.dcnfclib.model.Constants;
import com.example.dcnfclib.model.EDocument;
```

Work flow of this library is as follows

1. Read MRZ of the Document first: 
    To read MRZ, create a field in the activity class as follows;
    ```java
          private DCNFCLib dcnfcLib;
    }
    ```
 

2. Inside onCreate() method, please initialize above variable as follows.
     
    ```java
        dcnfcLib = new DCNFCLib(this, this);
    ```
    here first parameter is context or AppcompatActivity and secod parameter is Result Listner.

3. After the above step s, impement the listener methods to receive the scanned document data. as follows 
    
    ```java
        public class MainActivity extends AppCompatActivity implements DCNFCLib.DCNFCLibResultListnerClient {
    ```
    following are the listner methods.

    ```java
        public void onSuccess(EDocument eDocument) {
        Log.d("MainActivity", eDocument.getPersonDetails().getName());
    }

    @Override
    public void onFailure(Constants.ERROR_CODE error) {
        Log.d("Error", error.name());
    }
    ```
    
    Here result is of type EDocument. 
    

## Author

1. omkardatachecker, omkar@datachecker.nl
2. https://github.com/mercuriete/android-mrz-reader
   

