import * as SQLite from "expo-sqlite";

export function SQLite_updateBalance(balance) {
  const db = SQLite.openDatabase("AppDB.db");
  db.transaction((tx) => tx.executeSql("DELETE FROM balance"));
  db.transaction((tx) =>
    tx.executeSql("INSERT INTO balance (balance) VALUES(?)", [balance])
  );
}

export function SQLite_updateSpendings(amount, categoryID) {
  const db = SQLite.openDatabase("AppDB.db");
  db.transaction((tx) =>
    tx.executeSql(
      "UPDATE categories SET spending = spending + ? WHERE CategoryID = ?",
      [amount, categoryID]
    )
  );
}
