/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2872855771")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_uLjPoop6Vx` ON `cfs_orders` (\n  `igmNo`,\n  `blNo`,\n  `boeNo`\n)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2872855771")

  // update collection data
  unmarshal({
    "indexes": []
  }, collection)

  return app.save(collection)
})
