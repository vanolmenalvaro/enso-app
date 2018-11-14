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

exports.setAdminPrivileges = functions.https.onCall((data, context) => {
    const uid = data.uid;

    if (context.auth.token.admin !== true || context.auth.token.accessLevel < 2 ) {
        console.log(uid, "Request not authorized. User must be a superadmin to fulfill request.");
        return { error: "Request not authorized. User must be a superadmin to fulfill request."};
    }

    console.log(uid, 'set to admin')
    return admin.auth().setCustomUserClaims(uid, {
        admin: true,
        accessLevel: 1
    }).catch(error => {
        console.log(error);
    });
    // The new custom claims will propagate to the user's ID token the
    // next time a new one is issued.
});

exports.setSuperAdminPrivileges = functions.https.onCall((data, context) => {
    const uid = data.uid;
    
    if (context.auth.token.admin !== true || context.auth.token.accessLevel < 2 ) {
        console.log(uid, "Request not authorized. User must be a superadmin to fulfill request.");
        return { error: "Request not authorized. User must be a superadmin to fulfill request."};
    }

    console.log(uid, 'set to superadmin')
    return admin.auth().setCustomUserClaims(uid, {
        admin: true,
        accessLevel: 2
    }).catch(error => {
        console.log(error);
    });
    // The new custom claims will propagate to the user's ID token the
    // next time a new one is issued.
});

exports.listAllUsers = functions.https.onCall((data, context) => {
    if (context.auth.token.admin !== true || context.auth.token.accessLevel < 1 ) {
        console.log(uid, "Request not authorized. User must be a superadmin to fulfill request.");
        return { error: "Request not authorized. User must be a superadmin to fulfill request."};
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
