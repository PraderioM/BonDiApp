import { Component, OnInit } from "@angular/core";
import { openUrl } from "tns-core-modules/utils/utils"
import { getNumber, getString, setNumber, setString } from "tns-core-modules/application-settings";

class Reference {
    constructor(public link: string, private message?: string) { }

    getMessage() {
        if (this.message == null) {
            return this.link;
        } else {
            return this.message;
        }
    }
}


class FunFact {
    constructor(public caption: string, public  image?: string, public references?: Reference[]) { }

    hasCaption() {
        return this.caption.length != 0;
    }

    hasImage() {
        return this.image != null;
    }

    getReferences() {
        if (this.references == null) {
            return [];
        }
        return this.references;
    }
}

@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.css"]
})
export class HomeComponent implements OnInit {
    buttonMsg = "Pitja'm per dades ràndom.";
    minFunFactTimeSpacing = 22 * 60 * 60 * 1000;
    funFactIndex?: number;
    lastFunFactTimeName = 'lastFunFactTime';
    seenFunFactsSeparator = ',';
    seenFunFactsName = 'seenFunFacts';
    favoriteFunFactsSeparator = ',';
    favoriteFunFactsName = 'favoriteFunFacts';

    favoritesSelected = false;

    selectedColor = '#aaaaaa';
    unselectedColor = '#f3f3f3';

    allFunFacts: FunFact[] = [
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=1jxp7s74k2GUhcpHmVH--PJJ-MiP8txnk'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=1cjWrfXkk2bEa1LM606-SG7pWmOsxtZnn'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=1bsaezoyiS7NDEytpOVf2MZ245TH2ssi8'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=1FQEHJKpyoEi7To8OG03i8fJcrHZ-x4cS'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=1MrowgIVGc_-su9bmOlW0tdAJ5gpndmx2'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=1h86_3tNSQaPzjeefqY0TTLOHdnNUj7Ol'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=12fc0y4ek5D6VZehySOVgBq99cE6UNSZ0'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=14ZSknUS8OXi3jZElaQoNI_NMf2fc3pYE'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=1WoPXkoEL8A0scdM_rL1hPEUTzOhGWofb'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=1VgsCobKSdq3n8ddxBQgyWUyRvIDMpGjn'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=1SDgaAXoL3TDlypWgTJe0iQy5203vUDwb'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=1UieKxf78MJKWsQmJlyJqQRu2_o_9P_bi'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=1lhtgVevZaRsQuYRrFWU8-yvkezqaAt09'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=1dCLFPyPfH3rqX7QVhXNsIvJEPNYAa2kc'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=1uaI8-2mvkm6UeG2u6AIPjG5-PZO7IdJ1'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=1VGVsTZMIdF2sW20vXkma1rOYrQTlPthm'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=1Cgg2RCV99boyCZ0ALbqPH45yOCxi0ciZ'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=1E0JUReHY7qrHIFYdxGkAYJ8YckWIhGrZ'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=1xz8wsrAIHOj_koyRki2lpGkyD3N7EDRt'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=1a1lNO2moyT4MeZ4UedM0JJLqzfL8MPqA'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=10lP2iT9xlWxFuIUlSp-dYQfwN6d-D9AU'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=1II4Im4gA--0PWbKZjR4HjWUXN3TN4jSs'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=1VEW2uEERtah3nUj1mP64PX-d6s2y7X6T'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=1NwXAqWg8RDS67q3QtXfX0BZ7Pp4jGpI8'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=153wDHqtGlKQwuxGJoCVyTS2DlSn6rKob'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=1cT_aqFy3j3oZcWjm3QY5wA5ksn2mtxiq'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=1fe6g4fzBX2iRCAoTjIy9MSMyBcpRPZlc'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=1Hs8NwuyHQunsNxJc0G6ahMTPwhl7lB0p'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=1mxrHbbtedvU0wGuaAjQV5gxi4D4sYB_e'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=1hS5NX5_6xWPnVwSM8rBm_F_dKBArsckW'),
        new FunFact('Bon dia.','https://drive.google.com/thumbnail?id=1kbwAGxHigaULFEkKsxBAdQ1r-_s7KAIn'),
        new FunFact('El cervell és un organ que consumeix molta energia. Donat que el koala s\'alimenta exclusivament de una fulla que, a part de ser verinosa, és molt poc nutritiva, compensa aquest fet amb l\'aventatge evolutiu de ser estúpid.',
            'https://i.ytimg.com/vi/-tOHtuPFUYU/maxresdefault.jpg',
            [
                new Reference('https://www.youtube.com/watch?v=gNqQL-1gZF8', 'True Facts About Marsupials'),
                new Reference('https://www.youtube.com/watch?v=9DVGqXaaCMY&feature=youtu.be', 'Koalas: When Stupidity is a Survival Strategy')]
        ),
        new FunFact('Hi ha una estació de tren en japó que te com a director un gat.',
            'https://upload.wikimedia.org/wikipedia/commons/f/f0/Station-Master_Tama.JPG',
            [
                new Reference('https://www.youtube.com/watch?v=AGrlf8ww0cA', 'Cats take over Japanese island'),
                new Reference('http://www.bbc.com/travel/story/20190522-the-cat-who-saved-a-japanese-rail-line', 'The cat who saved a japanese rail line'),
                ]
        ),

    ];

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    isGoodMorning() {
        return this.funFactIndex != null
    }

    getFunFact() {
        if (this.secondsToNextFunFact() > 0) {
            return;
        }
        let seenFunFacts = this.getSeenFunFacts();
        let newFunFactIndex = this.getNewFunFactIndex(seenFunFacts);
        this.funFactIndex = newFunFactIndex;

        seenFunFacts.push(newFunFactIndex);
        this.setSeenFunFacts(seenFunFacts);
        setNumber(this.lastFunFactTimeName, new Date().getTime());
    }

    secondsToNextFunFact() {
        let lastFunFactTime = getNumber(this.lastFunFactTimeName, 0);
        let now = new Date().getTime();
        return Math.floor(Math.max(0, lastFunFactTime + this.minFunFactTimeSpacing - now)/1000);
    }

    getTimeStringFromSeconds(totalSeconds: number) {
        let seconds = totalSeconds % 60;
        let minutes = ((totalSeconds - seconds) / 60) % 60;
        let hours = ((totalSeconds - seconds) / 60 - minutes) / 60;
        return hours.toString() + ':' + minutes.toString() + ':' + seconds.toString();
    }

    getNotTwiceErrorMessage() {
        let timeString = this.getTimeStringFromSeconds(this.secondsToNextFunFact());
        let errorMsg = "Ja has rebut el teu 'fun fact'/'bon dia' diari ara toca afrontar el dia amb un somriure.";
        errorMsg += "\nCompte enrere per el pròxim 'fun fact'/'bon dia' " + timeString + ".";
        return errorMsg;
    }

    getNoFavoritesErrorMessage() {
        let errorMsg = "Encara no tens cap 'fun fact'/'bon dia' favorit.";
        errorMsg += "\nSi et disposes a que t'agradin més les coses somriuràs més.";
        return errorMsg;
    }


    goToReference(reference: string) {
        openUrl(reference);
    }

    getNewFunFactIndex(seenFunFacts: number[]) {
        let possibleIndexes: number[] = [];
        for (let i = 0; i < this.allFunFacts.length; i++) {
            let found = false;
            for (let j = 0; j < seenFunFacts.length; j++) {
                if (seenFunFacts[j] == i) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                possibleIndexes.push(i);
            }
        }

        let rnd = Math.random() * possibleIndexes.length;
        let index = Math.floor(rnd);
        return possibleIndexes[index];
    }

    getSeenFunFacts() {
        return this.getFunFactIndexes(this.seenFunFactsName, this.seenFunFactsSeparator);
    }

    setSeenFunFacts(seenFunFacts: number[]) {
        this.setFunFactIndexes(seenFunFacts, this.seenFunFactsName, this.seenFunFactsSeparator, true);
    }

    getFavoriteFunFacts() {
        return this.getFunFactIndexes(this.favoriteFunFactsName, this.favoriteFunFactsSeparator);
    }

    setFavoriteFunFacts(favoriteFunFacts: number[]) {
        this.setFunFactIndexes(
            favoriteFunFacts,
            this.favoriteFunFactsName,
            this.favoriteFunFactsSeparator,
            false
        );
    }

    getFunFactIndexes(name: string, separator: string) {
        let funFacts: number[] = [];
        let funFactsJointString = getString(name, '');
        if (funFactsJointString.length != 0) {
            let funFactsStrings = funFactsJointString.split(separator);
            for (let i = 0; i < funFactsStrings.length; i++) {
                funFacts.push(parseInt(funFactsStrings[i]));
            }
        }

        return funFacts;
    }

    setFunFactIndexes(funFacts: number[], name: string, separator: string, resetIfFull: boolean = true) {
        // Consider trivial cases.
        if ((funFacts.length == this.allFunFacts.length && resetIfFull) || funFacts.length == 0) {
            setString(name, '');
        }
        else {

            // Get full string.
            let funFactsJointString: string = funFacts[0].toString();
            for (let i = 1; i < funFacts.length; i++) {
                funFactsJointString = funFactsJointString + separator + funFacts[i].toString()
            }

            setString(name, funFactsJointString);
        }
    }

    addToFavorites() {
        if (this.funFactIndex == null) {
            return;
        }
        let favoriteFunFacts = this.getFavoriteFunFacts();
        let alreadyFavorite = false;
        for (let favoriteIndex of favoriteFunFacts) {
            if (this.funFactIndex === favoriteIndex) {
                alreadyFavorite = true;
                break
            }
        }

        if (!alreadyFavorite) {
            favoriteFunFacts.push(this.funFactIndex);
            this.setFavoriteFunFacts(favoriteFunFacts);
        }
    }

    removeFromFavorites(index: number) {
        let favoriteFunFacts = this.getFavoriteFunFacts();
        let newFavoriteFunFacts: number[] = [];
        for (let i= 0; i < favoriteFunFacts.length; i++) {
            let favoriteIndex = favoriteFunFacts[i];
            if (favoriteIndex !== index) {
                newFavoriteFunFacts.push(favoriteIndex);
            }
        }
        this.setFavoriteFunFacts(newFavoriteFunFacts);
    }

    getCurrentFunFact() {
        return this.allFunFacts[this.funFactIndex];
    }

    hasFavorites() {
        return this.getFavoriteFunFacts().length != 0;
    }

    setFavoritesSelected(newStatus: boolean) {
        this.favoritesSelected = newStatus;
    }
}
