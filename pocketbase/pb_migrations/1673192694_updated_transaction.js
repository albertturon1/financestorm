migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b2l3rn6d54z1dtb")

  // remove
  collection.schema.removeField("iep6poow")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b2l3rn6d54z1dtb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iep6poow",
    "name": "user_id",
    "type": "number",
    "required": true,
    "unique": true,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
