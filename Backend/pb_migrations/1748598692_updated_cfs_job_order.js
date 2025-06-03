/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2947930106")

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
    "id": "date3149528700",
    "max": "",
    "min": "",
    "name": "fromDate",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "date301681072",
    "max": "",
    "min": "",
    "name": "toDate",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2651147062",
    "hidden": false,
    "id": "relation1138201242",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "serviceType",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1864144027",
    "hidden": false,
    "id": "relation2444010507",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "containers",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(6, new Field({
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
  collection.fields.addAt(7, new Field({
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

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "select2063623452",
    "maxSelect": 1,
    "name": "status",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Pending",
      "Accepted",
      "Rejected",
      "In Progress",
      "Completed"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2947930106")

  // remove field
  collection.fields.removeById("relation4113142680")

  // remove field
  collection.fields.removeById("date3149528700")

  // remove field
  collection.fields.removeById("date301681072")

  // remove field
  collection.fields.removeById("relation1138201242")

  // remove field
  collection.fields.removeById("relation2444010507")

  // remove field
  collection.fields.removeById("text1156222427")

  // remove field
  collection.fields.removeById("file104153177")

  // remove field
  collection.fields.removeById("select2063623452")

  return app.save(collection)
})
