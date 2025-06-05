/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3222384912")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_863811952",
    "hidden": false,
    "id": "relation3785202386",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "service",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3190968249",
    "hidden": false,
    "id": "relation2462348188",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "provider",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation2375276105",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "user",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3222384912")

  // remove field
  collection.fields.removeById("relation3785202386")

  // remove field
  collection.fields.removeById("relation2462348188")

  // remove field
  collection.fields.removeById("relation2375276105")

  return app.save(collection)
})
