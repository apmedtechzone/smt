const defaultDB = {
    "lists": [
        {
            "id": "master",
            "name": "★ Master List"
        },
        {
            "id": "l2",
            "name": "Biovalley Project"
        }
    ],
    "cats": [
        {
            "id": "c1",
            "name": "COE"
        },
        {
            "id": "c2",
            "name": "MILD"
        }
    ],
    "orgs": []
};

// LOAD STATE: Try to load from Browser Storage, otherwise use Default
let db = JSON.parse(localStorage.getItem('amtz_db')) || defaultDB;
