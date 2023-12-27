import { useState, useEffect } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import * as SQLite from "expo-sqlite";
import BalanceCard from "../components/BalanceCard";
import CategoriesList from "../components/CategoriesList";
import Colors from "../constants/Colors";
import AddButton from "../components/common/AddButton";
import ExpenseCard from "../components/ExpenseCard";
import { parseToFloatFx2 } from "../scripts/noParse";
import Icon from "../components/common/Icon";
import BudgetMeter from "../components/BudgetMeter";
import { SQLite_updateBalance, SQLite_updateSpendings } from "../scripts/db";

const DashboardScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [balance, setBalance] = useState(0);
  const [activeCategory, setActiveCategory] = useState(1);
  const [allSpending, setAllSpending] = useState(0);
  const [allBudget, setAllBudget] = useState(0);
  const [filteredAllSpending, setFilteredAllSpending] = useState(0);
  const [filteredAllBudget, setFilteredAllBudget] = useState(0);

  const updateBalance = (balance) => {
    SQLite_updateBalance(balance);
    setBalance(balance);
  };

  const updateSpendings = (amount, categoryID) => {
    SQLite_updateSpendings(amount, categoryID);
    setAllSpending(allSpending + amount);
  };

  const selectActiveCategory = (selectedCategory) => {
    setActiveCategory(selectedCategory);
    if (selectedCategory === 1) {
      setExpenses(allExpenses);
      setFilteredAllBudget(allBudget);
      setFilteredAllSpending(allSpending);
      return;
    }
    const filteredExpenses = allExpenses.filter(
      (expense) => expense.categoryID === selectedCategory
    );
    setExpenses(filteredExpenses);

    let _filteredAllBudget = 0;
    let _filteredAllSpending = 0;

    categories.forEach((category) => {
      if (category.categoryID === selectedCategory) {
        _filteredAllBudget = _filteredAllBudget + category.budget;
        _filteredAllSpending = _filteredAllSpending + category.spending;
      }
    });

    setFilteredAllBudget(_filteredAllBudget);
    setFilteredAllSpending(_filteredAllSpending);
  };

  const deleteExpense = (
    expenseID,
    value,
    categoryID,
    validForCurrentCalculation
  ) => {
    Alert.alert(
      "Confirmation",
      "Please confirm if you want to delete this record?",
      [
        { text: "Cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const db = SQLite.openDatabase("AppDB.db");
            db.transaction((tx) => {
              tx.executeSql("DELETE FROM expenses WHERE expenseID = ?", [
                expenseID,
              ]);
              const filteredExpenses = expenses.filter(
                (expense) => expense.expenseID !== expenseID
              );
              setExpenses(filteredExpenses);
              const filteredAllExpenses = allExpenses.filter(
                (expense) => expense.expenseID !== expenseID
              );
              setAllExpenses(filteredAllExpenses);
            });
            db.transaction((tx) => tx.executeSql("DELETE FROM balance"));
            db.transaction((tx) =>
              tx.executeSql("INSERT INTO balance (balance) VALUES(?)", [
                balance + value,
              ])
            );
            setBalance(balance + value);
            if (validForCurrentCalculation === 1) {
              db.transaction((tx) =>
                tx.executeSql(
                  "UPDATE categories SET spending = spending - ? WHERE CategoryID = ?",
                  [value, categoryID]
                )
              );
              setAllSpending(allSpending - value);
              setFilteredAllSpending(filteredAllSpending - value);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setActiveCategory(1);
      const db = SQLite.openDatabase("AppDB.db");
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM categories", [], (_, { rows }) => {
          setCategories(rows._array);
          let _allSpending = 0;
          let _allBudget = 0;
          rows._array.forEach((category) => {
            _allSpending = _allSpending + category.spending;
            _allBudget = _allBudget + category.budget;
          });
          setAllSpending(_allSpending);
          setAllBudget(_allBudget);
          setFilteredAllSpending(_allSpending);
          setFilteredAllBudget(_allBudget);
        });
      });
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM balance", [], (_, { rows }) =>
          setBalance(rows._array[0].balance)
        );
      });
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM expenses", [], (_, { rows }) => {
          const sortedExpenses = rows._array.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setExpenses(sortedExpenses);
          setAllExpenses(sortedExpenses);
        });
      });
    });
  }, [navigation]);

  if (categories.length === 0 || allBudget === 0) {
    return <Text>Loading</Text>;
  }
  return (
    <View style={styles.background}>
      <View style={styles.iconContainer}>
        <Icon
          path="ellipsis-horizontal-outline"
          onPress={() => navigation.navigate("settingsScreen")}
        />
      </View>
      <BalanceCard balance={parseToFloatFx2(balance)} navigation={navigation} />
      <BudgetMeter amount={filteredAllSpending} budget={filteredAllBudget} />
      <CategoriesList
        activeCategory={activeCategory}
        onCategorySelection={selectActiveCategory}
        categories={categories}
        navigation={navigation}
      />
      <View style={styles.row}>
        <Text>Recent Expenses</Text>
        <AddButton
          text="Add"
          color={Colors.primary}
          onClick={() =>
            navigation.navigate("addExpenseScreen", {
              updateBalance: updateBalance,
              updateSpendings: updateSpendings,
            })
          }
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {expenses.length > 0
          ? expenses.map((expense) => (
              <ExpenseCard
                key={expense.expenseID}
                iconID={expense.iconID}
                categoryName={expense.categoryName}
                date={expense.date}
                value={expense.value}
                onPress={deleteExpense}
                expenseID={expense.expenseID}
                categoryID={expense.categoryID}
                validForCurrentCalculation={expense.validForCurrentCalculation}
              />
            ))
          : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  row: {
    height: Dimensions.get("screen").height * 0.05,
    width: Dimensions.get("screen").width * 0.9,
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  iconContainer: {
    width: Dimensions.get("screen").width * 0.9,
    marginTop: "10%",
    height: 50,
    flexDirection: "row-reverse",
    alignItems: "center",
  },
});

export default DashboardScreen;
