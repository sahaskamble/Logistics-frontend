/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3891445662")

  // remove field
  collection.fields.removeById("bool1531251113")

  // remove field
  collection.fields.removeById("relation2891322017")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3891445662")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "bool1531251113",
    "name": "merchantVerified",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(5, new Field({
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

  return app.save(collection)
})
