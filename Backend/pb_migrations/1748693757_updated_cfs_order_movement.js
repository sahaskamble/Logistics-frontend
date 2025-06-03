/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1015806038")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2872855771",
    "hidden": false,
    "id": "relation4113142680",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "order",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "date2862495610",
    "max": "",
    "min": "",
    "name": "date",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1156222427",
    "max": 0,
    "min": 0,
    "name": "remarks",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "file104153177",
    "maxSelect": 99,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "files",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1015806038")

  // remove field
  collection.fields.removeById("relation4113142680")

  // remove field
  collection.fields.removeById("date2862495610")

  // remove field
  collection.fields.removeById("text1156222427")

  // remove field
  collection.fields.removeById("file104153177")

  return app.save(collection)
})
