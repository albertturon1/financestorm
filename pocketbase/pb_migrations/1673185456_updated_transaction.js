migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b2l3rn6d54z1dtb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dmfs58hc",
    "name": "base_currency_value",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lgtdeoid",
    "name": "quote_currency_value",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b2l3rn6d54z1dtb")

  // remove
  collection.schema.removeField("dmfs58hc")

  // remove
  collection.schema.removeField("lgtdeoid")

  return dao.saveCollection(collection)
})
