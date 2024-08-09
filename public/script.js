  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";
 
  const firebaseConfig = {
    apiKey: "AIzaSyBYzg_sJxni3gsZQtcprkObr3d9S-OSGuo",
    authDomain: "vamsi-d4f93.firebaseapp.com",
    databaseURL: "https://vamsi-d4f93-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vamsi-d4f93",
    storageBucket: "vamsi-d4f93.appspot.com",
    messagingSenderId: "1080818323625",
    appId: "1:1080818323625:web:9ae0181676d099b96199b8",
    measurementId: "G-4TZPJESW1P"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  document.getElementById("submit").addEventListener('click',function(e)
  {
    set(ref(db, 'user/' + document.getElementById("username").value),
    {
        username:document.getElementById("username").value,
        email:document.getElementById("email").value,
        PhoneNumber:document.getElementById("PhoneNumber").value,
    });
      alert("Login Sucessfull  !")
  })