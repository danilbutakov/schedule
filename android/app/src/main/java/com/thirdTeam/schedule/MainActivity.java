package com.thirdTeam.schedule;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

import com.baumblatt.capacitor.firebase.auth.CapacitorFirebaseAuth;


public class MainActivity extends BridgeActivity {

   public void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);

      registerPlugin(GoogleAuth.class);
   }
   // Initializes the Bridge
   this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
   // Additional plugins you've installed go here
   // Ex: add(TotallyAwesomePlugin.class);
      add(CapacitorFirebaseAuth.class);
}});
}
