const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendMessageNotification = functions.database.ref('/messages/{pushId}')
.onCreate(async (snapshot) => {
  const msg = snapshot.val();
  if(!msg) return null;

  const allUsers = await admin.database().ref('users').once('value');
  const tokens = [];
  allUsers.forEach(userSnap=>{
    const user=userSnap.val();
    if(user.notificationToken && userSnap.key!==msg.user) tokens.push(user.notificationToken);
  });

  if(tokens.length===0) return null;

  const payload = {
    notification:{
      title:`Nova mensagem de ${msg.username||'Usuário'}`,
      body: msg.text,
      click_action: "https://SEU_USUARIO.github.io/foundation-kaleosu/"
    }
  };

  return admin.messaging().sendToDevice(tokens,payload);
});
