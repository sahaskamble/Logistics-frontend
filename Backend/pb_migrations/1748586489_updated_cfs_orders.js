/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2872855771")

  // add field
  collection.fields.addAt(14, new Field({
    "hidden": false,
    "id": "bool1531251113",
    "name": "merchantVerified",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(15, new Field({
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
  collection.fields.addAt(16, new Field({
    "hidden": false,
    "id": "bool465722684",
    "name": "golVerified",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(17, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation3429284244",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "golVerifiedBy",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2872855771")

  // remove field
  collection.fields.removeById("bool1531251113")

  // remove field
  collection.fields.removeById("relation2891322017")

  // remove field
  collection.fields.removeById("bool465722684")

  // remove field
  collection.fields.removeById("relation3429284244")

  return app.save(collection)
})
