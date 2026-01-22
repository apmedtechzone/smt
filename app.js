const defaultDB = {
    "lists": [
        {
            "id": "master",
            "name": "★ Master List"
        },
        {
            "id": "1769077814484",
            "name": "AMTZ"
        },
        {
            "id": "1769077819038",
            "name": "KIHT"
        }
    ],
    "cats": [],
    "orgs": []
};

// LOAD STATE: Try to load from Browser Storage, otherwise use Default
let db = JSON.parse(localStorage.getItem('amtz_db')) || defaultDB;
