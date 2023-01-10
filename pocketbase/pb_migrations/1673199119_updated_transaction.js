migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b2l3rn6d54z1dtb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "soihdhus",
    "name": "exchange_rate",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b2l3rn6d54z1dtb")

  // remove
  collection.schema.removeField("soihdhus")

  return dao.saveCollection(collection)
})
