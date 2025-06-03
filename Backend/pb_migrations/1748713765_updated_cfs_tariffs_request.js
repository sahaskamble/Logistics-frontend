/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3215430941")

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "bool1531251113",
    "name": "merchantVerified",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(10, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation2891322017",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "merchantVerifiedBy",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(11, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "bool465722684",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "golVerified",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3215430941")

  // remove field
  collection.fields.removeById("bool1531251113")

  // remove field
  collection.fields.removeById("relation2891322017")

  // remove field
  collection.fields.removeById("bool465722684")

  return app.save(collection)
})
