const AbstractPeople = require('./abstractPeople');
const swapiFunctions = require('../../swapiFunctions')

class WookieePeople extends AbstractPeople {
    
    constructor(id){
        super();
        this.id = id
    }

    async init() {
        const swUrl = 'https://swapi.dev/api';

        // Se obtiene data de persona en idioma Wookiee
        const personData = await swapiFunctions.genericRequest(
            `${swUrl}/people/${this.id}?format=wookiee`,
            'GET',
            null
        );
        const planetUrlSplitted = personData.acooscwoohoorcanwa.split('/'); 
        const planetId = planetUrlSplitted[planetUrlSplitted.length - 2];
        // Se obtiene data de planeta en idioma Wookiee
        const homeWorldData = await swapiFunctions.genericRequest(
            `${swUrl}/planets/${planetId}?format=wookiee`,
            'GET',
            null
        );

        this.name = personData.whrascwo;
        this.mass = personData.scracc;
        this.height = personData.acwoahrracao;
        this.homeworldName = homeWorldData.whrascwo;
        this.homeworldId = personData.acooscwoohoorcanwa.split('raakah/')[1];
    }
}

module.exports = WookieePeople;