let db;
// create a new db request for a "budget" database.
const request = indexedDB.open("budgetDB", 1);

// performing initialization, triggers if the client does not have a database
request.onupgradeneeded = function(event) {
    // create budgetStore object store and autoincrement contained objects upon creation
    const db = event.target.result;
    db.createObjectStore("budgetStore", { autoIncrement: true });
};

//
request.onsuccess = function(event) {
    db = event.target.result;

    // check if app (browser) is online before reading from db
    if (navigator.onLine) {
        checkDatabase();
    }
};

// 
request.onerror = function(event) {
    console.log("Encountered error: " + event.target.errorCode);
};

function saveRecord(record) {
    // Testing - function execution
    console.log("saveRecord function run");

    // create a transaction on the budgetStore with readwrite access
    const transaction = db.transaction(['budgetStore'], 'readwrite');

    // access the budgetStore object store
    const budgetStore = transaction.objectStore('budgetStore');

    // add the record to the budgetStore object store
    budgetStore.add(record);
}

function checkDatabase() {
    // Testing - function execution
    console.log("checkDatabase function run");

    // create a transaction on the budgetStore with readwrite access
    const transaction = db.transaction(['budgetStore'], 'readwrite');

    // access the budgetStore object store
    const budgetStore = transaction.objectStore('budgetStore');

    // Retrieve all records from the budgetStore
    const getAll = budgetStore.getAll();

    getAll.onsuccess = function () {
        // If there are items in the budgetStore, add them (routes) to the db when the app is online
        if (getAll.result.length > 0) {
            fetch('/api/transaction/bulk', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then(() => {
                // open another transaction on the budgetStore
                const transaction = db.transaction(['budgetStore'], 'readwrite')

                // access the budgetStore object store
                const budgetStore = transaction.objectStore('budgetStore');

                // Clear the items in the budgetStore after all items bulk added
                budgetStore.clear();
                console.log('Database updated, budgetStore cleared!');
            });
        }
    };
}

// Listen for the browser to come back online
window.addEventListener('online', checkDatabase);