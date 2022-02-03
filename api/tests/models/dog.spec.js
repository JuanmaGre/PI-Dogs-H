const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');
const { dogs } = require("./array.js");

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
    });

  describe(' Create dogs ', () => {
    beforeEach(()=> {
    Dog.bulkCreate(dogs)
    })
    
    describe ('Search dog', () => {
      it('Length db', done => {
        Dog.findAll()
        .then(r => expect(r.length).to.be(2))    
        .catch(() => done())
      });

      it('Name Dog', done => {
        Dog.findAll()
        .then(r => expect(r[0].name).to.be.true('Robert'))
        .catch(() => done())
      });
      
      it('Fake name Dog', done => {
        Dog.findAll()
        .then(r => expect(r[1].name).to.be.false('Robert'))
        .catch(() => done())
      });
    })
  })
});

});
