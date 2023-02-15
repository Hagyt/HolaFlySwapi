const swapiFunctions = require('../../swapiFunctions')

class AbstractPeople {

    constructor(id) {
        if (this.constructor == AbstractPeople) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    async init(){
        const swUrl = 'https://swapi.dev/api';

        // Se obtiene data de persona
        const personData = await swapiFunctions.genericRequest(
            `${swUrl}/people/${this.id}`,
            'GET',
            null,
            true
        );

        // Se obtiene data de planeta
        const homeWorldData = await swapiFunctions.genericRequest(
            personData.homeworld,
            'GET',
            null,
            true
        );
        const homeWorldId = personData.homeworld.split('api/')[1]
        this.name = personData.name;
        this.mass = personData.mass;
        this.height = personData.height;
        this.homeworldName = homeWorldData.name;
        this.homeworldId = homeWorldId;

    }

    getId() {
       return this.id;
    }

    getName() {
        return this.name;
    }

    getMass() {
        return this.mass;
    }

    getHeight() {
        return this.height;
    }

    getHomeworldName() {
        return this.homeworldName;
    }

    getHomeworldId() {
        return this.homeworldId;
    }

    getWeightOnPlanet(planetId){
        throw new Error('To be implemented');
    }
}

module.exports = AbstractPeople;