setInterval(function updateTime() {
    const now = new Date();
    // Formatage de l'heure : heures, minutes et secondes sur 2 chiffres
    options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    };
    // Création de la chaîne à afficher grâce à un DateTimeFormat auquel on passe les options
    // Le premier argument est la langue, on peut mettre "default" pour utiliser celle du navigateur
    const time = new Intl.DateTimeFormat("fr-FR", options).format(now);
    document.getElementById("time").textContent = time;
    //MAJ la date
    if (time === "00:00:00") {
        updateDate();
    }
}, 1000);

function updateDate() {
    const now = new Date();
    document.getElementById("date")
        .textContent = new Intl.DateTimeFormat().format(now);
}
updateDate();

fetch("https://api.meteo-concept.com/api/ephemeride/0?token=da88d74c7557964644d237ec781ffb75bef5dab7ce4211f50761bcfdd518f435&insee=31555")
    .then(function (data) {
        return data.json();
    })
    .then(function (obj) {
        //obj est l'objet issu dy JSON
        //document.querySelector("img").src = obj.url;
        //Le soleil se lève à
        document.getElementById("leve").textContent = obj.ephemeride.sunrise;
        //Le soleil se couche à
        document.getElementById("couche").textContent = obj.ephemeride.sunset;
        //  le saint du jour - malheureusement uniquement dans la version payante. ;
    })

    .catch(function (error) {
        console.log("savapas soleil");
        console.log(error);
    });

//Prévisions météo par jour
fetch("https://api.meteo-concept.com/api/forecast/daily/0? token = da88d74c7557964644d237ec781ffb75bef5dab7ce4211f50761bcfdd518f435 & insee=31555")
    .then(function (data) {
        return data.json();
    })
    .then(function (obj) {
        //obj est l'objet issu dy JSON
        //document.querySelector("img").src = obj.url;
        //Aujourd'hui
        // 
        //let A = document.getElementById("Aujourd_hui").textContent;
        let value = obj.forecast.weather;
        switch (value) {
            case 0:
                document.getElementById("Aujourd_hui").textContent = "Aujourd'hui, le temps est ensoleillé";
                break;
            case 1:
                document.getElementById("Aujourd_hui").textContent = "Aujourd'hui, le temps est un peu nuageux";
                break;
            case 2:
                document.getElementById("Aujourd_hui").textContent = "Aujourd'hui, le ciel est voilé";
                break;
            case 3:
                document.getElementById("Aujourd_hui").textContent = "Aujourd'hui, le ciel est nuageux";
                //api.meteo-concept.com ne prévoit pas dans le cadre de cette API de jeux de pictogrammes
                document.getElementById("Aujourd_hui_img").src = "./img/sun.png";//pas d'images - Nuageux
                break;
            default:
                document.getElementById("Aujourd_hui").textContent = "Aujourd'hui, ERROR";
                break;
        }
        // // obj est l'objet issu dy JSON
        // //document.querySelector("img").src = obj.url;
        // //Le soleil se lève à
        // document.getElementById("leve").textContent = obj.ephemeride.sunrise;
        // //Le soleil se couche à
        // document.getElementById("couche").textContent = obj.ephemeride.sunset;
        // //  le saint du jour - malheureusement uniquement dans la version payante. ;
        // //test
        // console.log(obj);
        // console.log(obj.forecast.weather);
    })

    .catch(function (error) {
        console.log("savapas weather");
        console.log(error);
    });
//Sainte
fetch("https://nominis.cef.fr/json/nominis.php")
    .then(function (data) {
        return data.json();
    })
    .then(function (obj) {
        //obj est l'objet issu dy JSON
        //document.querySelector("img").src = obj.url;
        Object.entries(obj.response.saints.majeurs).forEach(([key, value]) => {
            console.log(key, value);
            Object.entries(value).forEach(([key, value]) => {
                console.log(key, value);
                if (key == "valeur") document.getElementById("saint").textContent = value;
            });
        });
    })

    .catch(function (error) {
        console.log("savapas saint");
        console.log(error);
    });