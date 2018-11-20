const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Triggers on sign up.
exports.onSignUp = functions.auth.user().onCreate(user => {
    const customClaims = {
        admin: false,
        accessLevel: 0
    };
    // Set custom user claims on this newly created user.
    return admin.auth().setCustomUserClaims(user.uid, customClaims)
    .catch(error => {
        console.log(error);
    });
});

exports.setUserPrivileges = functions.https.onCall((data, context) => {
    const uid = data;

    if (context.auth.token.admin !== true || context.auth.token.accessLevel < 2 ) {
        console.log(uid, "Request not authorized. User must be a superadmin to fulfill request.");
        return { error: "Request not authorized. User must be a superadmin to fulfill request."};
    }

    return admin.auth().setCustomUserClaims(uid, {
        admin: false,
        accessLevel: 0
    }).then(userRecord => {
        console.log("Successfully gave User rights to user", userRecord.toJSON());
        return userRecord;
    }).catch(error => {
        console.log(error);
    });
    // The new custom claims will propagate to the user's ID token the
    // next time a new one is issued.
});

exports.setAdminPrivileges = functions.https.onCall((data, context) => {
    const uid = data;

    if (context.auth.token.admin !== true || context.auth.token.accessLevel < 2 ) {
        console.log(uid, "Request not authorized. User must be a superadmin to fulfill request.");
        return { error: "Request not authorized. User must be a superadmin to fulfill request."};
    }

    return admin.auth().setCustomUserClaims(uid, {
        admin: true,
        accessLevel: 1
    }).then(userRecord => {
        console.log("Successfully gave Admin rights to user", userRecord.toJSON());
        return userRecord;
    }).catch(error => {
        console.log(error);
    });
    // The new custom claims will propagate to the user's ID token the
    // next time a new one is issued.
});

exports.setSuperAdminPrivileges = functions.https.onCall((data, context) => {
    const uid = data;
    
    if (context.auth.token.admin !== true || context.auth.token.accessLevel < 2 ) {
        console.log(uid, "Request not authorized. User must be a superadmin to fulfill request.");
        return { error: "Request not authorized. User must be a superadmin to fulfill request."};
    }

    return admin.auth().setCustomUserClaims(uid, {
        admin: true,
        accessLevel: 2
    }).then(userRecord => {
        console.log("Successfully gave Superadmin rights to user", userRecord.toJSON());
        return userRecord;
    }).catch(error => {
        console.log(error);
    });
    // The new custom claims will propagate to the user's ID token the
    // next time a new one is issued.
});

exports.enableUser = functions.https.onCall((data, context) => {
    const uid = data;
    console.log(data);
    if (context.auth.token.admin !== true || context.auth.token.accessLevel < 2 ) {
        console.log(uid, "Request not authorized. User must be a superadmin to fulfill request.");
        return { error: "Request not authorized. User must be a superadmin to fulfill request."};
    }

    return admin.auth().updateUser(uid, {
        disabled: false
        }).then((userRecord) => {
          console.log("Successfully enabled user", userRecord.toJSON());
          return userRecord;
        }).catch((error) => {
          console.log("Error enabling user:", error);
        });
});

exports.disableUser = functions.https.onCall((data, context) => {
    const uid = data;
    
    if (context.auth.token.admin !== true || context.auth.token.accessLevel < 2 ) {
        console.log(uid, "Request not authorized. User must be a superadmin to fulfill request.");
        return { error: "Request not authorized. User must be a superadmin to fulfill request."};
    }

    return admin.auth().updateUser(uid, {
        disabled: true
        }).then((userRecord) => {
          console.log("Successfully disabled user", userRecord.toJSON());
          return userRecord;
        }).catch((error) => {
          console.log("Error disabling user:", error);
        });
});

exports.listAllUsers = functions.https.onCall((data, context) => {
    if (context.auth.token.admin !== true) {
        console.log("Request not authorized. User must be an admin to fulfill request.");
        return { error: "Request not authorized. User must be an admin to fulfill request."};
    }

    // List batch of users, 1000 at most
    return admin.auth().listUsers().catch((error) => {
        console.log("Error listing users:", error);
        return { 
            error,
            message: "Error listing users:"
        };
    });
});
