migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("b2l3rn6d54z1dtb");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "b2l3rn6d54z1dtb",
    "created": "2023-01-08 13:36:20.818Z",
    "updated": "2023-01-08 17:31:59.905Z",
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
        "id": "dmfs58hc",
        "name": "base_currency_value",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
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
      },
      {
        "system": false,
        "id": "0v0lhlqo",
        "name": "user_id",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
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
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
