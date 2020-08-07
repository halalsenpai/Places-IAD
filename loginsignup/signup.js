console.log("firebase=--->", firebase);
console.log("firebase=--->", firebase.firestore);

function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const fullname = document.getElementById("fullname").value;
  // const age = document.getElementById("age").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function (userResponse) {
      const userId = userResponse.user.uid;
      /*
            1) .add({}) (generates unique ID for the document)
            2) .doc(<id>).set({}) (you tell the ID to firebase)
        */

      // firebase.firestore().collection('users').add({
      firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .set({
          fullname,
          email,
          // age,
        })
        .then(function () {
          swal({
            title: "Succesfully Registered",
            text: "Welcome aboard",
            icon: "success",
            button: "Lets Go",
          });
        })
        .catch(function (error) {
          var errorMessage = error.message;
          swal("Registration Failed", errorMessage);
        });
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      swal("Registration Failed", errorMessage);
    });
}

function login() {
  console.log("login was clicked");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function (userResponse) {
      const userId = userResponse.user.uid;
      localStorage.setItem("userId", userId);
      swal({
        title: "Logged In",
        text: "Welcome ",
        icon: "success",
        button: "Lets Go",
      });
      location.replace("../vender/vender.html");
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      // console.log('error --->', error)
      swal("Log-In Failed Nigga", errorMessage);
    });
}

