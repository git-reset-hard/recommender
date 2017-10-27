const db = require('../index';

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

const q = `
MERGE (:Category { name: ${c} })
CREATE INDEX ON :Category(name)
`
var createCategories = () => {
  categories.forEach(c => {
    db.runQuery(q);
  })
}

createCategories();
