const firebaseConfig = {
  apiKey: "AIzaSyA_7JvtZd8mvZ4JIAYSGjEUF28PA3TBqc4",
  authDomain: "tete-80d6d.firebaseapp.com",
  databaseURL: "https://tete-80d6d.firebaseio.com",
  projectId: "tete-80d6d",
  storageBucket: "tete-80d6d.appspot.com",
  messagingSenderId: "1030692630539",
  appId: "1:1030692630539:web:6c4e7733e1885bf185570e"
};

var app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

 var res = "o";
var url2 = "https://jsonplaceholder.typicode.com/users/1";
 var wallet = "0";
 var walletAddress = "";
 var idf = "";
 

 window.userWalletAddress = null
 const loginButton = document.getElementById('loginButton')
 const userWallet = document.getElementById('userWallet')

 let ourPlayer = {
  x: 100,
  y: 100,
  speedMultiplier: 35,
  playerId: document.getElementById("Character_name-container")
};
 
 function toggleButton() {
   if (!window.ethereum) {
     loginButton.innerText = 'MetaMask is not installed'
     loginButton.classList.remove('bg-purple-500', 'text-white')
     loginButton.classList.add('bg-gray-500', 'text-gray-100', 'cursor-not-allowed')
     return false
   }

   loginButton.addEventListener('click', loginWithMetaMask)
 }

 async function loginWithMetaMask() {
   const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
     .catch((e) => {
       console.error(e.message)
       return
     })
   if (!accounts) { return }

   window.userWalletAddress = accounts[0]
   userWallet.innerText = window.userWalletAddress
   walletAddress = window.userWalletAddress
   loginButton.innerText = 'Metamask Connected'
   var x = document.getElementById("btn-login");

   x.style.display = "yes";

   loginButton.removeEventListener('click', loginWithMetaMask)
   setTimeout(() => {
     loginButton.addEventListener('click', signOutOfMetaMask)
   }, 200)

  
 }

 function signOutOfMetaMask() {
   window.userWalletAddress = null
   userWallet.innerText = ''
   loginButton.innerText = 'Sign in with MetaMask'

   loginButton.removeEventListener('click', signOutOfMetaMask)
   setTimeout(() => {
     loginButton.addEventListener('click', loginWithMetaMask)
   }, 200)
 }

 window.addEventListener('DOMContentLoaded', () => {
   toggleButton()
 });


 if (window.ethereum) {
  window.web3 = new Web3(window.ethereum)
  console.log(window.web3);
  await window.ethereum.enable();
}

async function fetchAsync (url) {

    const checkWallet = fetch(url)
    .then((response) => response.json())
    .then((user) => {
      return user;
    });
  
  const printAddress = async () => {
    const a = await checkWallet;
    wallet = a;
    console.log(a);
  };
  
  
  
    printAddress();


  }



const mapData = {
  minX: 1,  
  maxX: 10,
  minY: 4,
  maxY: 13  ,
  blockedSpaces: {

   
  
  },
  hiddenLayer: {
  
  
   
   

  }

};

// Options for Player Colors... these are in the same order as our sprite sheet
const playerColors = ["S1", "W1", "E1", "N1", "S2", "W2", "E2","N2","S3","W3"];

//Misc Helpers
function randomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}




function getKeyString(x, y) {
  return `${x}x${y}`;
}

function createName() {
  const prefix = randomFromArray([
    "COOL",
    "SUPER",
    "HIP",
    "SMUG",
    "COOL",
    "SILKY",
    "GOOD",
    "SAFE",
    "DEAR",
    "DAMP",
    "WARM",
    "RICH",
    "LONG",
    "DARK",
    "SOFT",
    "BUFF",
    "DOPE",
  ]);
  const animal = randomFromArray([
    "BEAR",
    "DOG",
    "CAT",
    "FOX",
    "LAMB",
    "LION",
    "BOAR",
    "GOAT",
    "VOLE",
    "SEAL",
    "PUMA",
    "MULE",
    "BULL",
    "BIRD",
    "BUG",
  ]);
  return `${prefix} ${animal}`;
}

function isSolid(x,y) {

  const blockedNextSpace = mapData.blockedSpaces[getKeyString(x, y)];
  return (
    blockedNextSpace ||
    x >= mapData.maxX ||
    x < mapData.minX ||
    y >= mapData.maxY ||
    y < mapData.minY
  )
}

function isHidden(x,y) {

  const hiddenNextSpace = mapData.hiddenLayer[getKeyString(x, y)];
  return (
    hiddenNextSpace ||
    x >= mapData.maxX ||
    x < mapData.minX ||
    y >= mapData.maxY ||
    y < mapData.minY
  )
}

function getRandomSafeSpot() {
  //We don't look things up by key here, so just return an x/y
  return randomFromArray([
    { x: 1, y: 4 },
    { x: 2, y: 4 },
    { x: 1, y: 5 },
    { x: 2, y: 6 },
    { x: 2, y: 8 },
    { x: 2, y: 9 },
    { x: 4, y: 8 },
    { x: 5, y: 5 },
    { x: 5, y: 8 },
    { x: 5, y: 10 },
    { x: 5, y: 11 },
  
  
    { x: 7, y: 6 },
    { x: 7, y: 7 },
    { x: 7, y: 8 },
    { x: 8, y: 8 },
    { x: 10, y: 8 },
    { x: 8, y: 8 },
   
  
 
    
  
  


  
  
    




 
  ]);
}





(function () {

  let playerId;
  let playerRef;
  let players = {};
  let playerElements = {};
  let coins = {};
  let coinElements = {};
  let user = "oki";

  const gameContainer = document.querySelector(".game-container");
  const playerNameInput = document.querySelector("#player-name");
  const messageInput = document.querySelector("#player-message");
  const playerColorButton = document.querySelector("#player-color");
  var newName = "";

 

  var nameD = "" ;
  let harv = 0;

/* Authentication code */
async function loginO() {
  var url = "https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0xc2ad5f9da2e9b97ed65c37a970e296dfe7557cc6&address="+walletAddress+"&tag=latest&apikey=KQBDX24I5CM7QUHUKE6PFWG1YH8UN28W4S"

  console.log(url);

  await fetchAsync(url);

  console.log("logged out");
  console.log(wallet.result);

  
  if( temp==0){
    initGame();
    temp = 1;
  }else{
    console.log("Need Monney");
  }

    var tempo =0;

    db.collection("user").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          console.log(doc.data().wallet, " => ", doc.data());

          if(doc.data().wallet == walletAddress ){
            tempo = 1;
            console.log("existe deja");
            console.log(doc.id)
            idf = doc.id;
            harv = doc.data().coins;
        playerRef.update({
          coins: harv,
        })
      }
        

      
      });

      if(tempo<1){
        db.collection("user").add({
          name: "name",
          wallet: walletAddress,
          coins: 0
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
      }
      tempo = 0;
  });

}

 function login() {
 
}

 

async function logOut() {
  
 

 
  


 

}

async function addCoin(){

  
  var washingtonRef = db.collection("user").doc(idf);

  // Set the "capital" field of the city 'DC'
  return washingtonRef.update({
      coins:  harv
  })
  .then(() => {
      console.log("Document successfully updated!");
  })
  .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
  });
}

document.getElementById("btn-login").onclick = loginO;

  

 

var temp = 0;



  function placeCoin() {
    const { x, y } = getRandomSafeSpot();
    const coinRef = firebase.database().ref(`coins/${getKeyString(x, y)}`);
    coinRef.set({
      x,
      y,
    })

    const coinTimeouts = [2000, 3000, 4000, 5000];
    setTimeout(() => {
      placeCoin();
    }, randomFromArray(coinTimeouts));
  }


// function interact with grab and destroy it + addCoin into database
  function attemptGrabCoin(x, y) {
    const key = getKeyString(x, y);
    if (coins[key]) {
      // Remove this key from data, then uptick Player's coin count
      harv++;
      addCoin();
      firebase.database().ref(`coins/${key}`).remove();
      playerRef.update({
        coins: players[playerId].coins + 1,
      })
    }


  }

// the player become hidden when is interact with tiles who need to be in the first layer
  function hiddenPlayer( value_t) {
    const elem = document.getElementById('play_g');

    if (value_t) {
      // Remove this key from data, then uptick Player's coin count
      elem.style.visibility = 'visible';
    }else{
      elem.style.visibility = 'hidden';

    }


  }

  


  function handleArrowPress(val, xChange=0, yChange=0) {
    myFunction();
    const newX = players[playerId].x + xChange;
    const newY = players[playerId].y + yChange;
    if (!isSolid(newX, newY)) {
      //move to the next space
      if (!isHidden(newX, newY)) {
          hiddenPlayer(true);
          console.log("hidden_true");
      }else{
        hiddenPlayer(false);
        console.log("hidden_false");

      }

      players[playerId].x = newX;
      players[playerId].y = newY;
      if (xChange === 1) {
        players[playerId].direction = "right";
      }
      if (xChange === -1) {
        players[playerId].direction = "left";
      }
      playerRef.set(players[playerId]);
        attemptGrabCoin(newX, newY);
    }
    

  }

  //saut nord - listener W
  function jumpN(xChange=0, yChange=0) {

    changeColor(3);

    myFunction();
    const newX = players[playerId].x + xChange;
    const newY = players[playerId].y + yChange;
    if (!isSolid(newX, newY-2)) {
      //move to the next space
      if (!isHidden(newX , newY - 2)) {
          hiddenPlayer(true);
          console.log("hidden_true");
      }else{
        hiddenPlayer(false);
        console.log("hidden_false");

      }

      players[playerId].x = newX ;
      players[playerId].y = newY - 2;
      if (xChange === 1) {
        players[playerId].direction = "right";
      }
      if (xChange === -1) {
        players[playerId].direction = "left";
      }
      playerRef.set(players[playerId]);
        attemptGrabCoin(newX, newY);
    }
  }

    //saut nord - listener W
    function jumpNW(xChange=0, yChange=0) {
      changeColor(3);

      myFunction();
      const newX = players[playerId].x + xChange;
      const newY = players[playerId].y + yChange;
      if (!isSolid(newX-2, newY-2)) {
        //move to the next space
        if (!isHidden(newX -2, newY - 2)) {
            hiddenPlayer(true);
            console.log("hidden_true");
        }else{
          hiddenPlayer(false);
          console.log("hidden_false");
  
        }
  
        players[playerId].x = newX -2;
        players[playerId].y = newY - 2;
        if (xChange === 1) {
          players[playerId].direction = "right";
        }
        if (xChange === -1) {
          players[playerId].direction = "left";
        }
        playerRef.set(players[playerId]);
          attemptGrabCoin(newX, newY);
      }
    }


   //saut nord - listener W
  function jumpSW(xChange=0, yChange=0) {
    changeColor(0);
     
    myFunction();
          const newX = players[playerId].x + xChange;
          const newY = players[playerId].y + yChange;
          if (!isSolid(newX-2, newY+2)) {
            //move to the next space
            if (!isHidden(newX -2, newY + 2)) {
                hiddenPlayer(true);
                console.log("hidden_true");
            }else{
              hiddenPlayer(false);
              console.log("hidden_false");
      
            }
      
            players[playerId].x = newX -2;
            players[playerId].y = newY +2;
            if (xChange === 1) {
              players[playerId].direction = "right";
            }
            if (xChange === -1) {
              players[playerId].direction = "left";
            }
            playerRef.set(players[playerId]);
              attemptGrabCoin(newX, newY);
          }
    }
    
    
        
            //saut nord - listener W
    function jumpSE(xChange=0, yChange=0) {
      changeColor(4);

      myFunction();
      const newX = players[playerId].x + xChange;
      const newY = players[playerId].y + yChange;
      if (!isSolid(newX+2, newY+2)) {
        //move to the next space
        if (!isHidden(newX +2, newY + 2)) {
            hiddenPlayer(true);
            console.log("hidden_true");
        }else{
          hiddenPlayer(false);
          console.log("hidden_false");
  
        }
  
        players[playerId].x = newX +2;
        players[playerId].y = newY + 2;
        if (xChange === 1) {
          players[playerId].direction = "right";
        }
        if (xChange === -1) {
          players[playerId].direction = "left";
        }
        playerRef.set(players[playerId]);
          attemptGrabCoin(newX, newY);
      }
    }

    
    
      //saut nord - listener W
  function jumpNE(xChange=0, yChange=0) {
    changeColor(7);

    myFunction();
    const newX = players[playerId].x + xChange;
    const newY = players[playerId].y + yChange;
    if (!isSolid(newX+2, newY-2)) {
      //move to the next space
      if (!isHidden(newX +2 , newY - 2)) {
          hiddenPlayer(true);
          console.log("hidden_true");
      }else{
        hiddenPlayer(false);
        console.log("hidden_false");

      }

      players[playerId].x = newX +2;
      players[playerId].y = newY - 2;
      if (xChange === 1) {
        players[playerId].direction = "right";
      }
      if (xChange === -1) {
        players[playerId].direction = "left";
      }
      playerRef.set(players[playerId]);
        attemptGrabCoin(newX, newY);
    }
  }


  // sout sud - listener X
  function jumpS(xChange=0, yChange=0) {
    changeColor(0);

    myFunction();
    const newX = players[playerId].x + xChange;
    const newY = players[playerId].y + yChange;
    if (!isSolid(newX, newY+2)) {
      //move to the next space
      if (!isHidden(newX , newY + 2)) {
          hiddenPlayer(true);
          console.log("hidden_true");
      }else{
        hiddenPlayer(false);
        console.log("hidden_false");

      }

      players[playerId].x = newX ;
      players[playerId].y = newY + 2;
      if (xChange === 1) {
        players[playerId].direction = "right";
      }
      if (xChange === -1) {
        players[playerId].direction = "left";
      }
      playerRef.set(players[playerId]);
        attemptGrabCoin(newX, newY);
    }
  }

  function jumpW(xChange=0, yChange=0) {
    changeColor(5);

    myFunction();
    const newX = players[playerId].x + xChange;
    const newY = players[playerId].y + yChange;
    if (!isSolid(newX-2, newY)) {
      //move to the next space
      if (!isHidden(newX - 2, newY)) {
          hiddenPlayer(true);
          console.log("hidden_true");
      }else{
        hiddenPlayer(false);
        console.log("hidden_false");

      }

      players[playerId].x = newX - 2;
      players[playerId].y = newY ;
      if (xChange === 1) {
        players[playerId].direction = "right";
      }
      if (xChange === -1) {
        players[playerId].direction = "left";
      }
      playerRef.set(players[playerId]);
        attemptGrabCoin(newX, newY);
    }
  }

  function jumpE(xChange=0, yChange=0) {
    changeColor(4);

    myFunction();
    const newX = players[playerId].x + xChange;
    const newY = players[playerId].y + yChange;
    if (!isSolid(newX+2, newY)) {
      //move to the next space
      if (!isHidden(newX + 2, newY )) {
          hiddenPlayer(true);
          console.log("hidden_true");
      }else{
        hiddenPlayer(false);
        console.log("hidden_false");

      }

      players[playerId].x = newX + 2;
      players[playerId].y = newY ;
      if (xChange === 1) {
        players[playerId].direction = "right";
      }
      if (xChange === -1) {
        players[playerId].direction = "left";
      }
      playerRef.set(players[playerId]);
        attemptGrabCoin(newX, newY);
    }
  }

 function changeColor(val){
      const nextColor = playerColors[val]
      playerRef.update({
        color: nextColor
      })
 }

  function initGame() {

    new KeyPressListener("ArrowUp", () => handleArrowPress(3,0, -1))
    new KeyPressListener("ArrowDown", () => handleArrowPress(0,0, 1))
    new KeyPressListener("ArrowLeft", () => handleArrowPress(1,-1, 0))
    new KeyPressListener("ArrowRight", () => handleArrowPress(2,1, 0))
    new KeyPressListener("KeyW", () => jumpN(0, 0))
    new KeyPressListener("KeyX", () => jumpS(0, 0))
    new KeyPressListener("KeyA", () => jumpW(-1, 0))
    new KeyPressListener("KeyD", () => jumpE(1, 0))
    new KeyPressListener("KeyQ", () => jumpNW(-1, 0))
    new KeyPressListener("KeyE", () => jumpNE(1, 0))
    new KeyPressListener("KeyZ", () => jumpSW(-1, 0))
    new KeyPressListener("KeyC", () => jumpSE(1, 0))
    new KeyPressListener("KeyR", () => changeColor())


   bu.addEventListener("click", (e) => {
    console.log("OK+0");
     handleArrowPress(0,0, -1);
       firstMove = true;
   });
    bd.addEventListener("click", (e) => {
      console.log("OK+1");

      handleArrowPress(0,0, 1);
      firstMove = true;
    });
    bl.addEventListener("click", (e) => {
      console.log("OK+2");

      handleArrowPress(0,-1, 0);
      firstMove = true;
   });
    br.addEventListener("click", (e) => {
      console.log("OK+3");

      handleArrowPress(0,1, 0);
      firstMove = true;
    });

    const allPlayersRef = firebase.database().ref(`players`);
    const allCoinsRef = firebase.database().ref(`coins`);
    
    allPlayersRef.on("value", (snapshot) => {
      //Fires whenever a change occurs
      players = snapshot.val() || {};
      Object.keys(players).forEach((key) => {
        const characterState = players[key];
        let el = playerElements[key];
        // Now update the DOM
        el.querySelector(".Character_name").innerText = characterState.name;
        el.querySelector(".Character_coins").innerText =  characterState.coins;
        el.querySelector(".Character_message").innerText =  characterState.message;
        el.setAttribute("data-color", characterState.color);
        el.setAttribute("data-direction", characterState.direction);
        el.setAttribute("data-wallet", characterState.wallet);

        const left = 32 * characterState.x + "px";
        const top = 32 * characterState.y - 4 + "px";
        el.style.transform = `translate3d(${left}, ${top}, 0)`;
      })
    })
    allPlayersRef.on("child_added", (snapshot) => {
      //Fires whenever a new node is added the tree
      const addedPlayer = snapshot.val();
      const characterElement = document.createElement("div");
      characterElement.classList.add("Character", "grid-cell");
      if (addedPlayer.id === playerId) {
        characterElement.classList.add("you");
      }
      characterElement.innerHTML = (`
        <div class="Character_shadow grid-cell"></div>
        <div class="Character_sprite grid-cell" id="play_g"></div>
        <div class="Character_name-container">
          <span class="Character_name"></span>
          <span class="Character_coins">12</span>
          <span style="color:red;  font-style: italic;font-size: 5px;          " class="Character_message">12f</span>

        </div>
        <div class="Character_you-arrow"></div>
      `);
      playerElements[addedPlayer.id] = characterElement;

      //Fill in some initial state
      characterElement.querySelector(".Character_name").innerText = addedPlayer.name;
      characterElement.querySelector(".Character_coins").innerText = addedPlayer.coins;
      characterElement.querySelector(".Character_message").innerText = addedPlayer.message;
      characterElement.setAttribute("data-color", addedPlayer.color);
      characterElement.setAttribute("data-direction", addedPlayer.direction);
      characterElement.setAttribute("data-wallet", addedPlayer.wallet);

      const left = 32 * addedPlayer.x + "px";
      const top = 32 * addedPlayer.y - 4 + "px";
      characterElement.style.transform = `translate3d(${left}, ${top}, 0)`;
      gameContainer.appendChild(characterElement);

    })


    //Remove character DOM element after they leave
    allPlayersRef.on("child_removed", (snapshot) => {
      const removedKey = snapshot.val().id;
      gameContainer.removeChild(playerElements[removedKey]);
      delete playerElements[removedKey];
    })


    //New - not in the video!
    //This block will remove coins from local state when Firebase `coins` value updates
    allCoinsRef.on("value", (snapshot) => {
      coins = snapshot.val() || {};
    });
    //

    allCoinsRef.on("child_added", (snapshot) => {
      const coin = snapshot.val();
      const key = getKeyString(coin.x, coin.y);
      coins[key] = true;

      // Create the DOM Element
      const coinElement = document.createElement("div");
      coinElement.classList.add("Coin", "grid-cell");
      coinElement.innerHTML = `
        <div class="Coin_shadow grid-cell"></div>
        <div class="Coin_sprite grid-cell"></div>
      `;

      // Position the Element
      const left = 32 * coin.x + "px";
      const top = 32 * coin.y - 4 + "px";
      coinElement.style.transform = `translate3d(${left}, ${top}, 0)`;

      // Keep a reference for removal later and add to DOM
      coinElements[key] = coinElement;
      gameContainer.appendChild(coinElement);
    })
    allCoinsRef.on("child_removed", (snapshot) => {
      const {x,y} = snapshot.val();
      const keyToRemove = getKeyString(x,y);
      gameContainer.removeChild( coinElements[keyToRemove] );
      delete coinElements[keyToRemove];
    })


    //Updates player name with text input
    playerNameInput.addEventListener("change", (e) => {

         const newNamed = e.target.value || createName();
      playerNameInput.value = newNamed;
      playerRef.update({
        name: newNamed
      })
    })

// update the status of the player
    messageInput.addEventListener("change", (e) => {

      const newMessage = e.target.value || createName();
      messageInput.value = newMessage;
   playerRef.update({
     message: newMessage
   })
 })


    //Update player color on button click
    playerColorButton.addEventListener("click", () => {
      changeColor();
    })

    //Place my first coin
    placeCoin();
    //go to the view to my player

  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //You're logged in!
      playerId = user.uid;
      playerRef = firebase.database().ref(`players/${playerId}`);

      const name = createName();
      playerNameInput.value = name;

      const {x, y} = getRandomSafeSpot();


      playerRef.set({
        id: playerId,
        name,
        direction: "right",
        color: "S1",
        message: "",
        x,
        y,
        coins: 0,
        wallet: nameD,
      })

      //Remove me from Firebase when I diconnect
      playerRef.onDisconnect().remove();

      //Begin the game now that we are signed in
    
      //initGame();

      
    } else {
      //You're logged out.
    }
  })

  firebase.auth().signInAnonymously().catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log(errorCode, errorMessage);

  });


})();  
