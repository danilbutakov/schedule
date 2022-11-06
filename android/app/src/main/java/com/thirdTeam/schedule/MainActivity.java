package com.thirdTeam.schedule;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

public class MainActivity extends BridgeActivity {

   public void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);

      registerPlugin(GoogleAuth.class);
   }
}
