const db = require('../index');

const categories = [
   'afghani',
   'african',
   'senegalese',
   'southafrican',
   'newamerican',
   'tradamerican',
   'arabian',
   'argentine',
   'armenian',
   'asianfusion',
   'australian',
   'austrian',
   'bangladeshi',
   'bbq',
   'basque',
   'belgian',
   'brasseries',
   'brazilian'
]

const createCategories = () => {
  categories.forEach(c => {
    db.runQuery(`MERGE (:Category { name: '${c}' })`);
  });
}

createCategories();
// CREATE INDEX ON :Category(name)

module.exports.categories = categories;
