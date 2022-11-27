import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Export a function that is used to PUT to the database
export const putDb = async (content) => {
  console.log('PUT requestuest to update the database');

  // Create a connection to the database and the version we want to use
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and that we want to 'readwrite' to the database
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open up the object store
  const store = tx.objectStore('jate');

  // Use the .put() method on the store and pass in the content
  const request = store.put({ jate: content });

  // Get confirmation of the request
  const result = await request;
  console.log('Data saved to jateDb', result);
};

// Export a function that is used to GET to the database
export const getDb = async () => {
  console.log('GET data from the database');

  // Create a connection to the database and the version we want to use
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and that we want to 'readonly' to the database
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the object store
  const store = tx.objectStore('jate');

  // Use the .getAll() method on the store to get all data in the database
  const request = store.getAll();

  // Get confirmation of the request
  const result = await request;
  console.log('Data saved to jateDb', result);
}

initdb();
