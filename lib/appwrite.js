import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.bitesafe",
  projectId: "670a8519001a5c13f099",
  databaseId: "670a865e00306ba92973",
  userCollectionId: "670a8679003177ae11bf",
  unverträglichkeitenCollectionId: "670a8ae5000d92a80d75",
  storageId: "670a8e23000745fadfd2",
  rezepteCollectionId: "670fc4c600066d9840a1",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export async function createUser(email, password, username) {
  //Hier wird ein Document erzeugt in der Appwrite DB, wodruch der User eingeleoogt bleibt
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}


// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}


export async function updateAvatar(avatar, user, accountId) {
  try {
    // 1. Überprüfen, ob eine Datei vorhanden ist
    if (!avatar) throw new Error("Kein Avatarbild zur Verfügung gestellt.");

    // 2. Avatar-Bild in den Storage hochladen
    const uploadedAvatarFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      avatar
    );

    // 3. URL der hochgeladenen Datei abrufen
    const avatarUrl = storage.getFileView(
      appwriteConfig.storageId,
      uploadedAvatarFile.$id
    );

    // 4. Benutzerprofil in der Datenbank aktualisieren (avatar Attribut in der userCollectionId)
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      user.$id, // User ID aus den übergebenen Benutzerdaten
      { avatar: avatarUrl } // Avatar-URL aktualisieren
    );

    return updatedUser;
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Avatars:", error);
    throw new Error(error.message);
  }
}



// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    // Überprüfen, ob der Benutzer angemeldet ist
    const currentSession = await account.getSession("current");
    if (!currentSession) {
      throw new Error("Keine aktive Sitzung gefunden.");
    }

    // Sitzung löschen
    const session = await account.deleteSession("current");

    // Rückgabe des Erfolgsstatus
    return { success: true, session };
  } catch (error) {
    console.error("Fehler beim Ausloggen:", error.message);
    throw new Error(error.message);
  }
}



//Funktion, damit Rezepte aus der DB angerufen werden
export async function getAllRezepte () {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.rezepteCollectionId
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

// Create Rezept Post
export async function createRezeptPost(form) {
  try {
    const [BilderUrl, videoUrl] = await Promise.all([
      uploadFile(form.Bilder, "image"),
    ]);

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.rezepteCollectionId,
      ID.unique(),
      {
        titel: form.titel,
        Bilder: BilderUrl,
        Beschreibung: form.Beschreibung,
        Zutaten: form.Zutaten,
        user: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}


// Upload File
export async function uploadFile(file, type) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Falscher Datentyp");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}


export async function searchPosts(query) {
  // Überprüfen Sie, ob die Abfrage leer oder ungültig ist
  if (!query || typeof query !== "string" || query.trim() === "") {
    return []; // Rückgabe einer leeren Liste, wenn die Abfrage ungültig ist
  }

  try {
    // Führen Sie die Suche in der Datenbank durch
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.rezepteCollectionId,
      [Query.search("titel", query)]
    );

    console.log(posts); // Überprüfen Sie die Struktur von posts

    // Überprüfen Sie, ob posts tatsächlich Dokumente enthält
    if (!posts || !Array.isArray(posts.documents)) {
      throw new Error("Keine Dokumente gefunden."); // Wenn keine Dokumente vorhanden sind, einen Fehler auslösen
    }

    return posts.documents; // Rückgabe der gefundenen Dokumente
  } catch (error) {
    console.error("Fehler bei der Datenabfrage:", error); // Loggen Sie den Fehler zur Überprüfung
    return []; // Leere Liste zurückgeben, um eine Endlosschleife zu vermeiden
  }
}


//Funktion, damit Rezepte aus der DB angerufen werden
export async function getUserRezepte() {

  try {
    const currentuser = await getCurrentUser();
    if (!currentuser) throw Error;
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.rezepteCollectionId,
      [Query.equal("user", currentuser.$id)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

