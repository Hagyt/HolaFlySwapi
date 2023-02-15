const AbstractPeople = require('./abstractPeople');

class CommonPeople extends AbstractPeople {

    constructor(id, name = null, mass = null, height = null, homeworldName = null, homeworldId = null){
        super();
        this.id = id;
        this.name = name;
        this.mass = mass;
        this.height = height;
        this.homeworldName = homeworldName;
        this.homeworldId = homeworldId;
    }
}

module.exports = CommonPeople;