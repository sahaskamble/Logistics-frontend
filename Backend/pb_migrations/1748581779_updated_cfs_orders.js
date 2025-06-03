/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2872855771")

  // remove field
  collection.fields.removeById("relation3785202386")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2872855771")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_863811952",
    "hidden": false,
    "id": "relation3785202386",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "service",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
