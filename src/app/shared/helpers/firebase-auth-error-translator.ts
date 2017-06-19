export class FirebaseAuthErrorTranslator {
    static ErrorToMessage(err: any): String {
        let errMessage: String;

        switch (err["code"]) {
            case "auth/user-disabled":
                errMessage = "Dit account werd geblokkeerd.";
                break;
            case "auth/invalid-email":
                errMessage = "Dit email adres is niet geldig.";
                break;
            case "auth/user-not-found":
                errMessage = "Gebruiker met dit email adres werd niet gevonden.";
                break;
            case "auth/wrong-password":
                errMessage = "Het wachtwoord is fout.";
                break;
            case "auth/too-many-requests":
                errMessage = "Deze device werd tijdelijk geblokkeerd vanwege ongebruikelijke activiteit. Probeer later nog eens.";
                break;
            default:
                // TODO: finaal err.code verwijderen, enkel err.message
                errMessage = err.code + ": " + err.message;
                break;
        }

        return errMessage;
    }
}
