migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b2l3rn6d54z1dtb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0v0lhlqo",
    "name": "user_id",
    "type": "text",
    "required": true,
    "unique": true,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b2l3rn6d54z1dtb")

  // remove
  collection.schema.removeField("0v0lhlqo")

  return dao.saveCollection(collection)
})
