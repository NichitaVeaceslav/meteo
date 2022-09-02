window.addEventListener("DOMContentLoaded", start);

function start(evt) {
    document.getElementById("nom").addEventListener("blur", checkName);
    document.getElementById("prenom").addEventListener("blur", checkPrenom);
    document.getElementById("age").addEventListener("blur", checkAge);
    document.getElementById("comment").addEventListener("blur", checkComment);



    function checkGenre() {
        const genderCtrl = document.querySelector("input[name='genre']:checked");
        let isGenderOk = genderCtrl !== null;
        if (genderCtrl !== null) genderCtrl.className = "ok";
        return isGenderOk;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Vérification par nombre de caractères
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function checkCaractere(evt, id, nombredecaracteres, acceptenumber) {
        const leCtrl = document.getElementById(id);
        const leString = leCtrl.value;
        const leNumber = Number(leString.value);

        console.log("DEBUG : ", typeof leString);
        console.log("DEBUB : ", leString);

        let isValid = true;

        if (acceptenumber === true) {
            if (leString.length < nombredecaracteres) {
                isValid = false;
            }
        } else {
            if ((!isNaN(Number)) || (leString.length < nombredecaracteres)) {
                isValid = false;
            }
        }

        if (! isValid) {
            document.getElementById(id).className = "nok";
        } else {
            document.getElementById(id).className = "ok";
        }
        
        return isValid;
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Vérification du nom
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const nomCtrl = document.getElementById("nom");

    nomCtrl.addEventListener("blur", checkName);

    function checkName(evt) {
        let isValid = checkCaractere(evt, "nom", 3, false);
        return isValid;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Vérification du prénom
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const prenomCtrl = document.getElementById("prenom");

    prenomCtrl.addEventListener("blur", checkPrenom);

    function checkPrenom(evt) {
        let isValid = checkCaractere(evt, "prenom", 3, false);
        return isValid;
    }




    /**
     * Fonction vérifiant si l'âge est dans les bornes fixées (5 et 140)
     * @returns booléen
     */

    function checkAge() {
    const ageCtrl = document.getElementById("age");
    const age = Number(ageCtrl.value);
    // 3- comparer cette valeur avec mes bornes (5 et 140)
    console.log("DEBUG :", typeof age);
    console.log("DEBUG :", age);
    // age est-il valide ?
    let isAgeValid = true; // Un drapeau
    if (isNaN(age) || (age < 5) || (age > 140)) {
        // La valeur est fausse => on lève le drapeau
        isAgeValid = false;
    }
    // A lissue du test, on vérifie l'état du drapeau
    if (!isAgeValid) {
        // Age invalide, on met le champ visuellement en "erreur"
        ageCtrl.className = "nok";
    } else {
        ageCtrl.className = "ok";
    }
    return isAgeValid;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Vérification du commentaire
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const commentCtrl = document.getElementById("comment");

    commentCtrl.addEventListener("blur", checkComment);

    function checkComment(evt) {
        let isValid = checkCaractere(evt, "comment", 5, true);
        return isValid;
    }


    // Gestion événementielle de la soumission du formulaire
    const form = document.getElementById("contactform");
    form.addEventListener("submit", function (evt) {
        let isFormValid = true; // Un drapeau
        // On applique successivement tous les tests et on les "compile"
        // dans le drapeau
        // Il est nécessaire d'appliquer la fonction de vérification PUIS
        // de la compiler dans le drapeau. Le contraire ne fonctionne pas
        // car dès que le drapeau est faux, le && n'est pas appliqué
        isFormValid = checkGenre() && isFormValid;
        isFormValid = checkName() && isFormValid;
        isFormValid = checkPrenom() && isFormValid;
        isFormValid = checkAge() && isFormValid;
        isFormValid = checkComment() && isFormValid;
        if (!isFormValid) {
            evt.preventDefault();
            alert("Votre formulaire ne peut pas être envoyé. Il est pas incomplet ou il comporte une ou des erreur(s).");
        }
    })
}