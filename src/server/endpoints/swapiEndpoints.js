
const _isWookieeFormat = (req) => {
    if(req.query.format && req.query.format == 'wookiee'){
        return true;
    }
    return false;
}


const applySwapiEndpoints = (server, app) => {

    server.get('/hfswapi/test', async (req, res) => {
        const data = await app.swapiFunctions.genericRequest('https://swapi.dev/api/', 'GET', null, true);
        if (req.query.p == "1") {
            await app.db.populateDB();  
        } else if (req.query.d == "1") {
            await app.db.deleteDB();
        }

        await app.db.watchDB();
        res.send(data);
    });

    server.get('/hfswapi/getPeople/:id', async (req, res) => {
        let lang = req.query.lang;
        if (!lang) lang = 'common';

        try {
            const person = await app.People.services.findPersonById(req.params.id, lang);
            res.send({
                name: person.getName(),
                mass: person.getMass(),
                height: person.getHeight(),
                homeworldName: person.getHomeworldName(),
                homeworldId: person.getHomeworldId(),
            });
        } catch (error) {
            console.log(error.stack);
            res.status(500).send({
                message: 'Error no controlado, contactar administrador'
            });
        }
    });

    server.get('/hfswapi/getPlanet/:id', async (req, res) => {
        try {
            const planet = await app.Planet.services.findPlanetById(req.params.id);
            res.send({
                name: planet.getName(),
                gravity: planet.getGravity()
            });
        } catch (error) {
            console.log(error.stack);
            res.status(500).send({
                message: 'Error no controlado, contactar administrador'
            });
        }
    });

    server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
        try {
            const personWeight = await app.People.services.getWeightOnPlanetRandom();
            if (personWeight === 'ERROR') {
                res.status(422).send({
                    message:
                        'Se ha intentado calcular el peso de un personaje en su planeta natal'
                })
            }
            res.send({
                personWeight: personWeight
            });
        } catch (error) {
            console.log(error.stack);
            res.status(500).send({
                message: 'Error no controlado, contactar administrador'
            });
        }
    });

    server.get('/hfswapi/getLogs',async (req, res) => {
        const data = await app.db.logging.findAll();
        res.send(data);
    });

}

module.exports = applySwapiEndpoints;