migrate((db) => {
  const collection = new Collection({
    "id": "b2l3rn6d54z1dtb",
    "created": "2023-01-08 13:36:20.818Z",
    "updated": "2023-01-08 13:36:20.818Z",
    "name": "transaction",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "kduossch",
        "name": "base_currency",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "2djqefuv",
        "name": "quote_currency",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
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
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("b2l3rn6d54z1dtb");

  return dao.deleteCollection(collection);
})
