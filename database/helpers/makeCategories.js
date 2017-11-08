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
  'brazilian',
  'breakfast_brunch',
  'british',
  'buffets',
  'burgers',
  'burmese',
  'cafes',
  'themedcafes',
  'cafeteria',
  'cajun',
  'cambodian',
  'caribbean',
  'dominican',
  'haitian',
  'puertorican',
  'trinidadian',
  'catalan',
  'cheesesteaks',
  'chickenshop',
  'chicken_wings',
  'chinese',
  'cantonese',
  'dimsum',
  'hainan',
  'shanghainese',
  'szechuan',
  'comfortfood',
  'creperies',
  'cuban',
  'czech',
  'delis',
  'diners',
  'dinnertheater',
  'ethiopian',
  'hotdogs',
  'filipino',
  'fishnchips',
  'fondue',
  'food_court',
  'foodstands',
  'french',
  'mauritius',
  'reunion',
  'gamemeat',
  'gastropubs',
  'german',
  'gluten_free',
  'greek',
  'guamanian',
  'halal',
  'hawaiian',
  'himalayan',
  'honduran',
  'hkcafe',
  'hotdog',
  'hotpot',
  'hungarian',
  'iberian',
  'indpak',
  'indonesian',
  'irish',
  'italian',
  'calabrian',
  'sardinian',
  'sicilian',
  'tuscan',
  'japanese',
  'conveyorsushi',
  'izakaya',
  'japacurry',
  'ramen',
  'teppanyaki',
  'kebab',
  'korean',
  'kosher',
  'laotian',
  'latin',
  'colombian',
  'salvadoran',
  'venezuelan',
  'raw_food',
  'malaysian',
  'mediterranean',
  'falafel',
  'mexican',
  'tacos',
  'mideastern',
  'egyptian',
  'lebanese',
  'modern_european',
  'mongolian',
  'moroccan',
  'newmexican',
  'nicaraguan',
  'noodles',
  'pakistani',
  'panasian',
  'persian',
  'peruvian',
  'pizza',
  'polish',
  'portuguese',
  'poutineries',
  'russian',
  'salad',
  'sandwiches',
  'scandinavian',
  'scottish',
  'seafood',
  'singaporean',
  'slovakian',
  'soulfood',
  'soup',
  'southern',
   'spanish',
  'srilankan',
 'steak',
  'sushi',
 'syrian',
 'taiwanese',
  'tapas',
  'tapasmallplates',
 'tex-mex',
 'thai',
 'turkish',
 'ukrainian',
 'uzbek',
 'vegan',
 'vegetarian',
 'vietnamese',
 'waffles',
 'wraps'
];
//
const createCategories = (categories) => {
  db.session.writeTransaction(tx => {
    return categories.forEach(c => tx.run(`MERGE (:Category { name: '${c}' })`))
  }).then(() => {
    db.session.close();
    // db.driver.close();
  });
    // let q = `
    // UNWIND ${categories} AS c
    // MERGE (:Category { name: c })`
    //  db.runQuery(q);

};
// console.log(categories.length);
// createCategories(categories);
// CREATE INDEX ON :Category(name)

module.exports.categories = categories;
