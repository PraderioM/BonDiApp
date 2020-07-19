import { Component, OnInit } from "@angular/core";
import { openUrl } from "tns-core-modules/utils/utils"
import { getNumber, getString, setNumber, setString } from "tns-core-modules/application-settings";


class FunFact {
    constructor(public caption: string, public  image: string, public reference?: string) { }

    public hasReference() {
        return this.reference != null
    }
}

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    error = false;
    buttonMsg = "Pitja'm per dades ràndom.";
    minFunFactTimeSpacing = 22 * 60 * 60 * 1000;
    errorMsg = "Ja has rebut el teu 'fun fact'/'bon dia' diari ara toca afrontar el dia amb un somriure.";
    funFact?: FunFact;
    lastFunFactTimeName = 'lastFunFactTime';
    seenFunFactsSeparator = ',';
    seenFunFactsName = 'seenFunFacts';

    allFunFacts: FunFact[] = [
        new FunFact(
            'Que tinguis un bon dia.',
            '~/images/imatge.png',
            )
    ];

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    isGoodMorning() {
        return this.funFact != null
    }

    getFunFact() {
        let lastFunFactTime = getNumber(this.lastFunFactTimeName, 0);
        let now = new Date().getTime();

        if (now - lastFunFactTime < this.minFunFactTimeSpacing) {
            this.error = true;
        }
        else {

            let seenFunFacts = this.getSeenFunFacts();
            let newFunFactIndex = this.getNewFunFactIndex(seenFunFacts);
            this.funFact = this.allFunFacts[newFunFactIndex];

            seenFunFacts.push(newFunFactIndex);
            this.setSeenFunFacts(seenFunFacts);
            setNumber(this.lastFunFactTimeName, now);
        }

    }

    goToReference() {
        openUrl(this.funFact.reference);
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
        let seenFunFacts: number[] = [];
        let seenFunFactsJointString = getString(this.seenFunFactsName, '');
        if (seenFunFactsJointString.length != 0) {
            let seenFunFactsStrings = seenFunFactsJointString.split(this.seenFunFactsSeparator);
            for (let i = 0; i < seenFunFactsStrings.length; i++) {
                seenFunFacts.push(parseInt(seenFunFactsStrings[i]));
            }
        }

        return seenFunFacts;
    }

    setSeenFunFacts(seenFunFacts: number[]) {
        // Consider trivial cases.
        if (seenFunFacts.length == this.allFunFacts.length || seenFunFacts.length == 0) {
            setString(this.seenFunFactsName, '');
        }
        else {

            // Get full string.
            let seenFunFactsJointString: string = seenFunFacts[0].toString();
            for (let i = 1; i < seenFunFacts.length; i++) {
                seenFunFactsJointString = seenFunFactsJointString + this.seenFunFactsSeparator + seenFunFacts[i].toString()
            }

            setString(this.seenFunFactsName, seenFunFactsJointString);
        }
    }
}
