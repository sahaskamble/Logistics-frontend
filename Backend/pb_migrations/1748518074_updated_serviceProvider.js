/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3190968249")

  // update collection data
  unmarshal({
    "name": "service_provider"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3190968249")

  // update collection data
  unmarshal({
    "name": "serviceProvider"
  }, collection)

  return app.save(collection)
})
