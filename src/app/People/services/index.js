const db = require('../../db');

const { peopleFactory, CommonPeople } = require('../models');
const Planet = require('../../Planet');

const findPersonById = async (id, lang) => {

    if (lang == 'wookiee') {
        return await peopleFactory(id, lang);
    }

    const personData = await db.swPeople.findByPk(id);
    
    if (!personData) {
        console.log('La persona consultada no se encuentra en base de datos');
        const person = await peopleFactory(id, lang);
        
        await db.swPeople.create({
            id: person.getId(),
            name: person.getName(),
            mass: person.getMass(),
            height: person.getHeight(),
            homeworld_name: person.getHomeworldName(),
            homeworld_id: person.getHomeworldId()
        });

        return person;
    }
    
    console.log('La persona se encuentra en base de datos');

    const {
        name,
        mass,
        height,
        homeworld_name,
        homeworld_id
    } = personData.dataValues;

    return new CommonPeople(
        id,
        name,
        mass,
        height,
        homeworld_name,
        homeworld_id
    );
}

const getWeightOnPlanetRandom = async () => {
    const min = Math.floor(1);
    const maxPeople = Math.floor(82);
    const maxPlanet = Math.floor(60);
    const randomPeopleId = Math.floor(Math.random() * (maxPeople - min) + min);
    const randomPlanetId = Math.floor(Math.random() * (maxPlanet - min) + min);

    const person = await findPersonById(randomPeopleId, 'common');
    console.log(
        `Persona seleccionada. Id: ${person.getId()} Nombre: ${person.getName()} Mass: ${person.getMass()}`
    );

    const planet = await Planet.services.findPlanetById(randomPlanetId);
    console.log(
        `Planeta seleccionado. Id: ${planet.getId()} Nombre: ${planet.getName()} Gravity: ${planet.getGravity()}`
    );

    return person.getWeightOnPlanet(planet);
}

module.exports = {
    findPersonById,
    getWeightOnPlanetRandom
}