const swapiFunctions = require('../../swapiFunctions');

class Planet {
    constructor(id, name = null, gravity = null){
        this.id = id;
        this.name = name;
        this.gravity = gravity;
    }

    async init() {
        const swUrl = 'https://swapi.dev/api';

        // Se obtiene data de planeta
        const planetData = await swapiFunctions.genericRequest(
            `${swUrl}/planets/${this.id}`,
            'GET',
            null,
            true
        );
        const gravity = parseFloat(planetData.gravity.split(' ')[0]);
        this.name = planetData.name;
        this.gravity = isNaN(gravity) ? 0 : gravity;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getGravity() {
        return this.gravity;
    }
}

module.exports = Planet;