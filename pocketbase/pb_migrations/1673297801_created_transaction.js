migrate((db) => {
  const collection = new Collection({
    "id": "yk8otz4wibqtzvn",
    "created": "2023-01-09 20:56:41.146Z",
    "updated": "2023-01-09 20:56:41.146Z",
    "name": "transaction",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pzqi1dbb",
        "name": "base_currency",
        "type": "select",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "pln",
            "eur",
            "gbp",
            "chf",
            "usd"
          ]
        }
      },
      {
        "system": false,
        "id": "j2jxxuty",
        "name": "quote_currency",
        "type": "select",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "pln",
            "eur",
            "gbp",
            "chf",
            "usd"
          ]
        }
      },
      {
        "system": false,
        "id": "xucjt6dv",
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
        "id": "2dknvtoh",
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
        "id": "q9mtpnjc",
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
        "id": "fxvpmtmz",
        "name": "exchange_rate",
        "type": "number",
        "required": true,
        "unique": false,
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
  const collection = dao.findCollectionByNameOrId("yk8otz4wibqtzvn");

  return dao.deleteCollection(collection);
})
