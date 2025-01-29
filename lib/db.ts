import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  const connectedState = mongoose.connection.readyState;

  if (connectedState === 1) {
    console.log("déjà connecté à mongodb.");
    return;
  }

  if (connectedState === 2) {
    console.log("Connexion...");
    return;
  }

  try {
    mongoose.connect(MONGODB_URI!, {
      dbName: "restapi",
      bufferCommands: true,
      serverSelectionTimeoutMS: 5000, // Réduit le timeout de sélection du serveur
      socketTimeoutMS: 45000,
    });
    console.log("Connecté à MONGODB !");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erreur de connexion à MongoDB :", error.message);
      throw new Error(`MongoDB connection error: ${error.message}`);
    } else {
      console.error("Erreur inconnue :", error);
      throw new Error(
        "Une erreur inconnue est survenue lors de la connexion à MongoDB"
      );
    }
  }
};

export default connect;
