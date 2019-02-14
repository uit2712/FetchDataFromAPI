export default class Hero {
    heroId: number;
    heroName: string;
    heroPowers: any;

    constructor(data: any) {
        this.heroId = data['HeroId'];
        this.heroName = data['HeroName'];
        this.heroPowers = data['heroPowers'];
    }

    clone() {
        return new Hero({ HeroId: this.heroId, HeroName: this.heroName, HeroPowers: this.heroPowers });
    }
}