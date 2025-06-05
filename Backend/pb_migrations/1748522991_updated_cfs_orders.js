/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2872855771")

  // remove field
  collection.fields.removeById("text3882496157")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2872855771")

  // add field
  collection.fields.addAt(14, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3882496157",
    "max": 0,
    "min": 0,
    "name": "cargoType",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
