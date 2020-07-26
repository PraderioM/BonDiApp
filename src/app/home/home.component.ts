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
    constructor(public caption: string, public  image: string, public references: Reference[]) { }

    hasCaption() {
        return this.caption.length != 0;
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
        new FunFact('Bon dia.' , '~/images/bon_dia_000.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_001.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_002.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_003.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_004.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_005.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_006.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_007.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_008.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_009.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_010.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_011.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_012.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_013.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_014.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_015.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_016.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_017.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_018.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_019.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_020.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_021.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_022.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_023.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_024.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_025.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_026.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_027.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_028.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_029.png', []),
        new FunFact('Bon dia.' , '~/images/bon_dia_030.png', []),
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
            for (let funFact of funFacts) {
                funFactsJointString = funFactsJointString + separator + funFact.toString()
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
