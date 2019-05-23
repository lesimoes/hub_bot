  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDjiNcMGTKKM2XzIm9FpgWL4U4K0eQifkU",
    authDomain: "multihub-5b105.firebaseapp.com",
    databaseURL: "https://multihub-5b105.firebaseio.com",
    projectId: "multihub-5b105",
    storageBucket: "multihub-5b105.appspot.com",
    messagingSenderId: "450997773642",
    appId: "1:450997773642:web:25b46ac52f9eab9f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var firestore = firebase.firestore();

  const outptHeader = document.querySelector(".mesgs");
  const docRef = firestore.doc("/pluri/6jhdNzpuJGUDGrKQYoqy");

  getRealtimeUpdates = function(){
        firestore.collection("pluri/6jhdNzpuJGUDGrKQYoqy/messages").orderBy('datetime').onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            if(doc.data().role == "cliente" || doc.data().role == "client"){
            var txt1 = '<div class="incoming_msg"><div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div><div class="received_msg"><div class="received_withd_msg"><p>'+doc.data().message+'</p><span class="time_date"> '+new Date(doc.data().datetime).toLocaleDateString("pt-BR")+' | '+new Date(doc.data().datetime).toLocaleTimeString("pt-BR") +'</span></div></div></div>';
            $(".msg_history").append(txt1);
            }else{
            var txt1 = '<div class="outgoing_msg"><div class="sent_msg"><p>'+doc.data().message+'</p><span class="time_date">'+new Date(doc.data().datetime).toLocaleDateString("pt-BR")+' | '+new Date(doc.data().datetime).toLocaleTimeString("pt-BR") +'</span> </div></div>'
            $(".msg_history").append(txt1);
            }
        });
    });
  }


  SendMsg = function(){
  fetch('https://multbot.herokuapp.com/api/pluri/chat/sendMsg/6jhdNzpuJGUDGrKQYoqy', {
    method: 'post',
    mode: 'cors',
    headers: {
    'Access-Control-Allow-Origin':'*',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2UwZDFlY2ZhMzQ1MzI5OTAzZGNlMWYiLCJhbGlhcyI6InBsdXJpIiwiaWF0IjoxNTU4NTc4NzY2LCJleHAiOjE1NTg1ODc0MDZ9.h-K9Tu0h1BvPOSIAvLOm0oOIFsOZHU-pU9bsZpaxWbc',
    },

    body: JSON.stringify({
      message: "aeeee",
    role: "cliente"
  })
  }).then(function(response) {
    console.log(response.json());
  }).then(function(data) {
    console.log(data);
  });
}



  getRealtimeUpdates();
