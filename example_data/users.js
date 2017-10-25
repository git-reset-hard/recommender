const faker = require('faker');
const fs = require('fs');
const generateUsers = (num) => {
  let test_users = []
  for (var i = 0; i < num; i++) {
    test_users.push(
      {
        ustomer_id: Math.floor(Math.random()*10000000),
        star_pref: Math.random(),
        distance_pref: Math.random(),
        price_pref: Math.random(),
        openness: Math.random(),
        hometown_latitude: faker.address.latitude(),
        hometown_longitude: faker.address.longitude(),
        "personality": [
          {
            "name": "Openness",
            "percentile": Math.random(),
            "children": [
              {
                "name": "Adventurousness",
                "percentile": Math.random()
              },
              {
                "name": "Artistic interests",
                "percentile": Math.random()
              },
              {
                "name": "Emotionality",
                "percentile": Math.random()
              },
              {
                "name": "Imagination",
                "percentile": Math.random()
              },
              {
                "name": "Intellect",
                "percentile": Math.random()
              },
              {
                "name": "Authority-challenging",
                "percentile": Math.random()
              }
            ]
          },
          {
            "name": "Conscientiousness",
            "percentile": Math.random(),
            "children": [
              {
                "name": "Achievement striving",
                "percentile": Math.random()
              },
              {
                "name": "Cautiousness",
                "percentile": Math.random()
              },
              {
                "name": "Dutifulness",
                "percentile": Math.random()
              },
              {
                "name": "Orderliness",
                "percentile": Math.random()
              },
              {
                "name": "Self-discipline",
                "percentile": Math.random()
              },
              {
                "name": "Self-efficacy",
                "percentile": Math.random()
              }
            ]
          },
          {
            "name": "Extraversion",
            "percentile": Math.random(),
            "children": [
              {
                "name": "Activity level",
                "percentile": Math.random()
              },
              {
                "name": "Assertiveness",
                "percentile": Math.random()
              },
              {
                "name": "Cheerfulness",
                "percentile": Math.random()
              },
              {
                "name": "Excitement-seeking",
                "percentile": Math.random()
              },
              {
                "name": "Outgoing",
                "percentile": Math.random()
              },
              {
                "name": "Gregariousness",
                "percentile": Math.random()
              }
            ]
          },
          {
            "name": "Agreeableness",
            "percentile": Math.random(),
            "children": [
              {
                "name": "Altruism",
                "percentile": Math.random()
              },
              {
                "name": "Cooperation",
                "percentile": Math.random()
              },
              {
                "name": "Modesty",
                "percentile": Math.random()
              },
              {
                "name": "Uncompromising",
                "percentile": Math.random()
              },
              {
                "name": "Sympathy",
                "percentile": Math.random()
              },
              {
                "name": "Trust",
                "percentile": Math.random()
              }
            ]
          },
          {
            "name": "Emotional range",
            "percentile": Math.random(),
            "children": [
              {
                "name": "Fiery",
                "percentile": Math.random()
              },
              {
                "name": "Prone to worry",
                "percentile": Math.random()
              },
              {
                "name": "Melancholy",
                "percentile": Math.random()
              },
              {
                "name": "Immoderation",
                "percentile": Math.random()
              },
              {
                "name": "Self-consciousness",
                "percentile": Math.random()
              },
              {
                "name": "Susceptible to stress",
                "percentile": Math.random()
              }
            ]
          }
        ],
        "needs": [
          {
            "name": "Challenge",
            "percentile": Math.random()
          },
          {
            "name": "Closeness",
            "percentile": Math.random()
          },
          {
            "name": "Curiosity",
            "percentile": Math.random()
          },
          {
            "name": "Excitement",
            "percentile": Math.random()
          },
          {
            "name": "Harmony",
            "percentile": Math.random()
          },
          {
            "name": "Ideal",
            "percentile": Math.random()
          },
          {
            "name": "Liberty",
            "percentile": Math.random()
          },
          {
            "name": "Love",
            "percentile": Math.random()
          },
          {
            "name": "Practicality",
            "percentile": Math.random()
          },
          {
            "name": "Self-expression",
            "percentile": Math.random()
          },
          {
            "name": "Stability",
            "percentile": Math.random()
          },
          {
            "name": "Structure",
            "percentile": Math.random()
          }
        ],
        "values": [
          {
            "name": "Conservation",
            "percentile": Math.random()
          },
          {
            "name": "Openness to change",
            "percentile": Math.random()
          },
          {
            "name": "Hedonism",
            "percentile": Math.random()
          },
          {
            "name": "Self-enhancement",
            "percentile": Math.random()
          },
          {
            "name": "Self-transcendence",
            "percentile": Math.random()
          }
        ]
      }
    )
  }
  return test_users;
}
generateUsers(10000);
module.exports = {
  generateUsers
}

// const example_users = [
//   {
//     customer_id: number,
//     star_pref: 0-1,
//     distance_pref: 0-1,
//     price_pref: 0-1,
//     openness: 0-1,
//     hometown_latitude: number,
//     hometown_longitude: number,
//   "personality": [
//     {
//       "trait_id": "big5_openness",
//       "name": "Openness",
//       "category": "personality",
//       "percentile": 0.9952897287855893,
//       "children": [
//         {
//           "trait_id": "facet_adventurousness",
//           "name": "Adventurousness",
//           "category": "personality",
//           "percentile": 0.40012199763224987
//         },
//         {
//           "trait_id": "facet_artistic_interests",
//           "name": "Artistic interests",
//           "category": "personality",
//           "percentile": 0.968847865246944
//         },
//         {
//           "trait_id": "facet_emotionality",
//           "name": "Emotionality",
//           "category": "personality",
//           "percentile": 0.3120907374368431
//         },
//         {
//           "trait_id": "facet_imagination",
//           "name": "Imagination",
//           "category": "personality",
//           "percentile": 0.10085756927152789
//         },
//         {
//           "trait_id": "facet_intellect",
//           "name": "Intellect",
//           "category": "personality",
//           "percentile": 0.9941163113723842
//         },
//         {
//           "trait_id": "facet_liberalism",
//           "name": "Authority-challenging",
//           "category": "personality",
//           "percentile": 0.9953508765341763
//         }
//       ]
//     },
//     {
//       "trait_id": "big5_conscientiousness",
//       "name": "Conscientiousness",
//       "category": "personality",
//       "percentile": 0.7756202590705741,
//       "children": [
//         {
//           "trait_id": "facet_achievement_striving",
//           "name": "Achievement striving",
//           "category": "personality",
//           "percentile": 0.46074899172720174
//         },
//         {
//           "trait_id": "facet_cautiousness",
//           "name": "Cautiousness",
//           "category": "personality",
//           "percentile": 0.9965021418631783
//         },
//         {
//           "trait_id": "facet_dutifulness",
//           "name": "Dutifulness",
//           "category": "personality",
//           "percentile": 0.7728569455116601
//         },
//         {
//           "trait_id": "facet_orderliness",
//           "name": "Orderliness",
//           "category": "personality",
//           "percentile": 0.91583965759451
//         },
//         {
//           "trait_id": "facet_self_discipline",
//           "name": "Self-discipline",
//           "category": "personality",
//           "percentile": 0.670571798178782
//         },
//         {
//           "trait_id": "facet_self_efficacy",
//           "name": "Self-efficacy",
//           "category": "personality",
//           "percentile": 0.46186296086541134
//         }
//       ]
//     },
//     {
//       "trait_id": "big5_extraversion",
//       "name": "Extraversion",
//       "category": "personality",
//       "percentile": 0.5840317194856006,
//       "children": [
//         {
//           "trait_id": "facet_activity_level",
//           "name": "Activity level",
//           "category": "personality",
//           "percentile": 0.3518594177552484
//         },
//         {
//           "trait_id": "facet_assertiveness",
//           "name": "Assertiveness",
//           "category": "personality",
//           "percentile": 0.5332130716105662
//         },
//         {
//           "trait_id": "facet_cheerfulness",
//           "name": "Cheerfulness",
//           "category": "personality",
//           "percentile": 0.0839249001663136
//         },
//         {
//           "trait_id": "facet_excitement_seeking",
//           "name": "Excitement-seeking",
//           "category": "personality",
//           "percentile": 0.03381246391041426
//         },
//         {
//           "trait_id": "facet_friendliness",
//           "name": "Outgoing",
//           "category": "personality",
//           "percentile": 0.17699289850235123
//         },
//         {
//           "trait_id": "facet_gregariousness",
//           "name": "Gregariousness",
//           "category": "personality",
//           "percentile": 0.11430205389363157
//         }
//       ]
//     },
//     {
//       "trait_id": "big5_agreeableness",
//       "name": "Agreeableness",
//       "category": "personality",
//       "percentile": 0.28587437356233736,
//       "children": [
//         {
//           "trait_id": "facet_altruism",
//           "name": "Altruism",
//           "category": "personality",
//           "percentile": 0.37791570989516265
//         },
//         {
//           "trait_id": "facet_cooperation",
//           "name": "Cooperation",
//           "category": "personality",
//           "percentile": 0.9712577322368388
//         },
//         {
//           "trait_id": "facet_modesty",
//           "name": "Modesty",
//           "category": "personality",
//           "percentile": 0.3607838632909256
//         },
//         {
//           "trait_id": "facet_morality",
//           "name": "Uncompromising",
//           "category": "personality",
//           "percentile": 0.8525945805199694
//         },
//         {
//           "trait_id": "facet_sympathy",
//           "name": "Sympathy",
//           "category": "personality",
//           "percentile": 0.8971205218826594
//         },
//         {
//           "trait_id": "facet_trust",
//           "name": "Trust",
//           "category": "personality",
//           "percentile": 0.8208825097136129
//         }
//       ]
//     },
//     {
//       "trait_id": "big5_neuroticism",
//       "name": "Emotional range",
//       "category": "personality",
//       "percentile": 0.7853335735512921,
//       "children": [
//         {
//           "trait_id": "facet_anger",
//           "name": "Fiery",
//           "category": "personality",
//           "percentile": 0.07523218638501689
//         },
//         {
//           "trait_id": "facet_anxiety",
//           "name": "Prone to worry",
//           "category": "personality",
//           "percentile": 0.048648772855724776
//         },
//         {
//           "trait_id": "facet_depression",
//           "name": "Melancholy",
//           "category": "personality",
//           "percentile": 0.2854173022459811
//         },
//         {
//           "trait_id": "facet_immoderation",
//           "name": "Immoderation",
//           "category": "personality",
//           "percentile": 0.7106283700153597
//         },
//         {
//           "trait_id": "facet_self_consciousness",
//           "name": "Self-consciousness",
//           "category": "personality",
//           "percentile": 0.5786605476607816
//         },
//         {
//           "trait_id": "facet_vulnerability",
//           "name": "Susceptible to stress",
//           "category": "personality",
//           "percentile": 0.1026715769292098
//         }
//       ]
//     }
//   ],
//   "needs": [
//     {
//       "trait_id": "need_challenge",
//       "name": "Challenge",
//       "category": "needs",
//       "percentile": 0.08828612267837327
//     },
//     {
//       "trait_id": "need_closeness",
//       "name": "Closeness",
//       "category": "needs",
//       "percentile": 0.28323685500958107
//     },
//     {
//       "trait_id": "need_curiosity",
//       "name": "Curiosity",
//       "category": "needs",
//       "percentile": 0.7875003557559236
//     },
//     {
//       "trait_id": "need_excitement",
//       "name": "Excitement",
//       "category": "needs",
//       "percentile": 0.028276016802403936
//     },
//     {
//       "trait_id": "need_harmony",
//       "name": "Harmony",
//       "category": "needs",
//       "percentile": 0.1746841083524806
//     },
//     {
//       "trait_id": "need_ideal",
//       "name": "Ideal",
//       "category": "needs",
//       "percentile": 0.27309670589722435
//     },
//     {
//       "trait_id": "need_liberty",
//       "name": "Liberty",
//       "category": "needs",
//       "percentile": 0.09804935677244286
//     },
//     {
//       "trait_id": "need_love",
//       "name": "Love",
//       "category": "needs",
//       "percentile": 0.25199338068561233
//     },
//     {
//       "trait_id": "need_practicality",
//       "name": "Practicality",
//       "category": "needs",
//       "percentile": 0.07286856160145833
//     },
//     {
//       "trait_id": "need_self_expression",
//       "name": "Self-expression",
//       "category": "needs",
//       "percentile": 0.0740055953660696
//     },
//     {
//       "trait_id": "need_stability",
//       "name": "Stability",
//       "category": "needs",
//       "percentile": 0.23985350863212018
//     },
//     {
//       "trait_id": "need_structure",
//       "name": "Structure",
//       "category": "needs",
//       "percentile": 0.6909670425143394
//     }
//   ],
//   "values": [
//     {
//       "trait_id": "value_conservation",
//       "name": "Conservation",
//       "category": "values",
//       "percentile": 0.02141498459972535
//     },
//     {
//       "trait_id": "value_openness_to_change",
//       "name": "Openness to change",
//       "category": "values",
//       "percentile": 0.585959655667071
//     },
//     {
//       "trait_id": "value_hedonism",
//       "name": "Hedonism",
//       "category": "values",
//       "percentile": 0.28635473881775875
//     },
//     {
//       "trait_id": "value_self_enhancement",
//       "name": "Self-enhancement",
//       "category": "values",
//       "percentile": 0.20974603019548388
//     },
//     {
//       "trait_id": "value_self_transcendence",
//       "name": "Self-transcendence",
//       "category": "values",
//       "percentile": 0.24906969229742615
//     }
//   ],
//   "consumption_preferences": [
//     {
//       "consumption_preference_category_id": "consumption_preferences_shopping",
//       "name": "Purchasing Preferences",
//       "consumption_preferences": [
//         {
//           "consumption_preference_id": "consumption_preferences_automobile_ownership_cost",
//           "name": "Likely to be sensitive to ownership cost when buying automobiles",
//           "score": 1
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_automobile_safety",
//           "name": "Likely to prefer safety when buying automobiles",
//           "score": 1
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_clothes_quality",
//           "name": "Likely to prefer quality when buying clothes",
//           "score": 1
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_clothes_style",
//           "name": "Likely to prefer style when buying clothes",
//           "score": 0
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_clothes_comfort",
//           "name": "Likely to prefer comfort when buying clothes",
//           "score": 1
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_influence_brand_name",
//           "name": "Likely to be influenced by brand name when making product purchases",
//           "score": 0
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_influence_utility",
//           "name": "Likely to be influenced by product utility when making product purchases",
//           "score": 0
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_influence_online_ads",
//           "name": "Likely to be influenced by online ads when making product purchases",
//           "score": 1
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_influence_social_media",
//           "name": "Likely to be influenced by social media when making product purchases",
//           "score": 0
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_influence_family_members",
//           "name": "Likely to be influenced by family when making product purchases",
//           "score": 1
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_spur_of_moment",
//           "name": "Likely to indulge in spur of the moment purchases",
//           "score": 0
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_credit_card_payment",
//           "name": "Likely to prefer using credit cards for shopping",
//           "score": 1
//         }
//       ]
//     },
//     {
//       "consumption_preference_category_id": "consumption_preferences_health_and_activity",
//       "name": "Health & Activity Preferences",
//       "consumption_preferences": [
//         {
//           "consumption_preference_id": "consumption_preferences_eat_out",
//           "name": "Likely to eat out frequently",
//           "score": 0
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_gym_membership",
//           "name": "Likely to have a gym membership",
//           "score": 0
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_outdoor",
//           "name": "Likely to like outdoor activities",
//           "score": 1
//         }
//       ]
//     },
//     {
//       "consumption_preference_category_id": "consumption_preferences_environmental_concern",
//       "name": "Environmental Concern Preferences",
//       "consumption_preferences": [
//         {
//           "consumption_preference_id": "consumption_preferences_concerned_environment",
//           "name": "Likely to be concerned about the environment",
//           "score": 1
//         }
//       ]
//     },
//     {
//       "consumption_preference_category_id": "consumption_preferences_entrepreneurship",
//       "name": "Entrepreneurship Preferences",
//       "consumption_preferences": [
//         {
//           "consumption_preference_id": "consumption_preferences_start_business",
//           "name": "Likely to consider starting a business in next few years",
//           "score": 0.5
//         }
//       ]
//     },
//     {
//       "consumption_preference_category_id": "consumption_preferences_movie",
//       "name": "Movie Preferences",
//       "consumption_preferences": [
//         {
//           "consumption_preference_id": "consumption_preferences_movie_romance",
//           "name": "Likely to like romance movies",
//           "score": 0
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_movie_adventure",
//           "name": "Likely to like adventure movies",
//           "score": 1
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_movie_horror",
//           "name": "Likely to like horror movies",
//           "score": 0
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_movie_musical",
//           "name": "Likely to like musical movies",
//           "score": 0
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_movie_historical",
//           "name": "Likely to like historical movies",
//           "score": 1
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_movie_science_fiction",
//           "name": "Likely to like science-fiction movies",
//           "score": 1
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_movie_war",
//           "name": "Likely to like war movies",
//           "score": 0
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_movie_drama",
//           "name": "Likely to like drama movies",
//           "score": 0
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_movie_action",
//           "name": "Likely to like action movies",
//           "score": 1
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_movie_documentary",
//           "name": "Likely to like documentary movies",
//           "score": 1
//         }
//       ]
//     },
//     {
//       "consumption_preference_category_id": "consumption_preferences_music",
//       "name": "Music Preferences",
//       "consumption_preferences": [
//         {
//           "consumption_preference_id": "consumption_preferences_music_rap",
//           "name": "Likely to like rap music",
//           "score": 0.5
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_music_country",
//           "name": "Likely to like country music",
//           "score": 0.5
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_music_r_b",
//           "name": "Likely to like R&B music",
//           "score": 0.5
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_music_hip_hop",
//           "name": "Likely to like hip hop music",
//           "score": 0.5
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_music_live_event",
//           "name": "Likely to attend live musical events",
//           "score": 1
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_music_playing",
//           "name": "Likely to have experience playing music",
//           "score": 1
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_music_latin",
//           "name": "Likely to like Latin music",
//           "score": 1
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_music_rock",
//           "name": "Likely to like rock music",
//           "score": 1
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_music_classical",
//           "name": "Likely to like classical music",
//           "score": 1
//         }
//       ]
//     },
//     {
//       "consumption_preference_category_id": "consumption_preferences_reading",
//       "name": "Reading Preferences",
//       "consumption_preferences": [
//         {
//           "consumption_preference_id": "consumption_preferences_read_frequency",
//           "name": "Likely to read often",
//           "score": 1
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_books_entertainment_magazines",
//           "name": "Likely to read entertainment magazines",
//           "score": 0
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_books_non_fiction",
//           "name": "Likely to read non-fiction books",
//           "score": 1
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_books_financial_investing",
//           "name": "Likely to read financial investment books",
//           "score": 1
//         },
//         {
//           "consumption_preference_id": "consumption_preferences_books_autobiographies",
//           "name": "Likely to read autobiographical books",
//           "score": 1
//         }
//       ]
//     },
//     {
//       "consumption_preference_category_id": "consumption_preferences_volunteering",
//       "name": "Volunteering Preferences",
//       "consumption_preferences": [
//         {
//           "consumption_preference_id": "consumption_preferences_volunteer",
//           "name": "Likely to volunteer for social causes",
//           "score": 1
//         }
//       ]
//     }
//   ],
//   "warnings": []
// }
// ]
