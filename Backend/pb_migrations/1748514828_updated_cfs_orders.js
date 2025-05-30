/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2872855771")

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
    "id": "text3733864923",
    "max": 0,
    "min": 0,
    "name": "consigneeName",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3096597736",
    "max": 0,
    "min": 0,
    "name": "chaName",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3190968249",
    "hidden": false,
    "id": "relation1333477580",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "cfs",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(9, new Field({
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
  collection.fields.addAt(10, new Field({
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
  collection.fields.addAt(11, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text4091482013",
    "max": 0,
    "min": 0,
    "name": "pickUpLocation",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(12, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3830108918",
    "max": 0,
    "min": 0,
    "name": "dropLocation",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(13, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3429085233",
    "max": 0,
    "min": 0,
    "name": "commodityDescription",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

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

  // add field
  collection.fields.addAt(15, new Field({
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
  const collection = app.findCollectionByNameOrId("pbc_2872855771")

  // remove field
  collection.fields.removeById("relation2444010507")

  // remove field
  collection.fields.removeById("text3733864923")

  // remove field
  collection.fields.removeById("text3096597736")

  // remove field
  collection.fields.removeById("relation1333477580")

  // remove field
  collection.fields.removeById("date3149528700")

  // remove field
  collection.fields.removeById("date301681072")

  // remove field
  collection.fields.removeById("text4091482013")

  // remove field
  collection.fields.removeById("text3830108918")

  // remove field
  collection.fields.removeById("text3429085233")

  // remove field
  collection.fields.removeById("text3882496157")

  // remove field
  collection.fields.removeById("select2063623452")

  return app.save(collection)
})
