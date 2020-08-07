console.log("firebase=====>", firebase);
function saveInfo() {
  const userId = localStorage.getItem("userId");
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const contact = document.getElementById("contact").value;
  const location = document.getElementById("location").value;
  const type = document.getElementById("type").value;

  //   const image = document.getElementById("imgInp").files[0];
  console.log(name, email, contact, location, userId);

  firebase
    .firestore()
    .collection("Vender")
    .add({
      name,
      contact,
      email,
      location,
      userId,
      type,
      //   image,
    })
    .then(function () {
      swal("Complete", "", "success");
      // console.log(userId);
      //   clearVender();
      getVender();
    })
    .catch(function (error) {
      var error = error.message;
      swal("Failss", error);
    });
  function clearVender() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("contact").value = "";
    document.getElementById("location").value = "";
    document.getElementById("type").value = "";
  }

  function getVender() {
    const userId = localStorage.getItem("userId");
    const table = document.getElementsByTagName("tbody")[0];
    table.innerHTML = "";
    firebase
      .firestore()
      .collection("Vender")
      .where("userId", "==", userId)
      .get()
      .then(function (snaps) {
        snaps.forEach(function (doc) {
          console.log(doc.data());
          const data = doc.data();
          const row = document.createElement("TR");
          const name = document.createElement("TD");
          const contact = document.createElement("TD");
          const email = document.createElement("TD");
          const location = document.createElement("TD");
          const type = document.createElement("TD");

          // const image = document.createElement("TD");

          name.innerHTML = data.name;
          contact.innerHTML = data.contact;
          email.innerHTML = data.email;
          location.innerHTML = data.location;
          type.innerHTML = data.type;

          // image.innerHTML = '<img src=" ${data.receipt}"  width="100"/>';

          row.appendChild(name);
          row.appendChild(contact);
          row.appendChild(email);
          row.appendChild(location);
          row.appendChild(type);
          // row.appendChild(image);
          table.appendChild(row);
        });
      });
  }
}

