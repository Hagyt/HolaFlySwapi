const db = require('../../db')

const { peopleFactory, CommonPeople } = require('../models')

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

module.exports = {
    findPersonById,
}