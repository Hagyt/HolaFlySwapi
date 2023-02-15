const db = require('../../db');

const { Planet } = require('../models')

const findPlanetById = async id => {

    const planetData = await db.swPlanet.findByPk(id);

    if (!planetData) {
        console.log('El planeta consultado no se encuentra en base de datos');
        
        const planet = new Planet(id);
        await planet.init();

        await db.swPlanet.create({
            id: planet.getId(),
            name: planet.getName(),
            gravity: planet.getGravity()
        });

        return planet;
    }

    console.log('El planeta consultado se encuentra en base de datos');

    const { name, gravity } = planetData;

    return new Planet(id, name, gravity);
}

module.exports = {
    findPlanetById
}