package com.az.beta;
import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import com.zoontek.rnbootsplash.RNBootSplash;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;

import com.facebook.FacebookSdk;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

@Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState); // or super.onCreate(null) with react-native-screens
    RNBootSplash.init(R.drawable.bootsplash, MainActivity.this);
  }

  @Override
  protected String getMainComponentName() {
    return "linkpos";
  }

}
