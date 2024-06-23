import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { createNewDeposit, createNewExpense, fetchUserData, createNewBudget, 
  createNewSaving, updateIncomes, createIncomeBase, deleteFunction } from '../functions';
import Register from './Register';
import AddNewBudget from '../components/AddNewBudget';
import AddNewSavingGoal from '../components/AddNewSavingGoal';
import AddExpense from '../components/AddExpense';
import AddDeposit from '../components/AddDeposit';
import Incomes from '../components/Incomes';
import AddIncomes from '../components/AddIncomes';
import BudgetCard from '../components/BudgetCard';
import SavingGoalCard from '../components/SavingGoalCard';
import WavingHandOutlinedIcon from '@mui/icons-material/WavingHandOutlined';

/**
 * Loader function for the main board component.
 * This function fetches user data from local storage and prepares it for rendering on the main board.
 * @returns {Object} An object containing the user data retrieved from local storage.
 */

// loader
export function loadMain() {
  const userName = fetchUserData("userName");
  const password = fetchUserData("password");
  const budgets = fetchUserData("budgets");
  const savings = fetchUserData("savings");
  const incomeBases = fetchUserData("incomeBases");
  return { userName, password, budgets, savings, incomeBases }
}

/**
 * Create a new user after a registration form is posted. Handles users actions based on requests.
 * Uses different helper functions from functions.js file.
 * 
 * @param {Object} request - The request object containing form data.
 * @returns {Promise<null>} A promise that resolves after the user is created.
 * @throws {Error} Throws an error if there's a problem while signing up.
 */

export async function mainboardAct({request}) {
  const upcomingData = await request.formData();
  const {_action, ...values} = Object.fromEntries(upcomingData)
  
  // Create new user based on form data.
  if (_action === "newUser") {
    try {
      localStorage.setItem('userName', JSON.stringify(values.userName));
      localStorage.setItem('password', JSON.stringify(values.password));
    } catch (error) {
      throw new Error ('There was problem while signing up.');
    }
    return null;
  }

  // Create new income base.
  if (_action === "createIncomeBase") {
    try {
      createIncomeBase({name: values.nameIncome});
      Toastify({ text: "New income base has been created!", duration: 3000, 
                  style: { background: "purple" } }).showToast();
      document.getElementById('incomeForm').reset(); 
    } catch (error) {
      throw new Error ('There was problem while creating new income base.');
    }
    return null;
  }

  // Create new budget.
  if (_action === "createNewBudget") {
    try {
      createNewBudget({name: values.budgetName, limit: values.budgetLimit, date: values.startDate});
      Toastify({ text: "New budget has been created!", duration: 3000, style: { background: "purple" } }).showToast();
      document.getElementById('budgetForm').reset(); 
    } catch (error) {
      throw new Error ('There was problem while creating a new budget.');
    }
    return null;
  }

  // Create new saving goal.
  if (_action === "createNewSaving") {
    try {
      createNewSaving({name: values.savingsName, goal: values.savingGoal, date: values.readyDate});
      Toastify({ text: "New saving goal has been created!", duration: 3000, style: { background: "purple" }}).showToast();
      document.getElementById('savingForm').reset(); 
    } catch (error) {
      throw new Error ('There was problem while creating a new saving goal.');
    }
    return null;
  }

  // Add new income to existing base.
  if (_action === "addNewIncome") {
    try {
      updateIncomes({name: values.newIncomeName, amount: values.newIncomeAmount, 
                      incomeBaseId: values.newIncomeCat});
      Toastify({ text: "Income base has been updated!", duration: 3000, style: { background: "purple" } }).showToast();
      document.getElementById('newIncomeForm').reset(); 
    } catch (error) {
      throw new Error ('There was problem while adding new income to the base.');
    }
    return null;
  }

  // Add new expense for existing budget.
  if (_action === "createNewExpense") {
    try {
      createNewExpense({name: values.expenseName, amount: values.expenseAmount, 
                        categoryId: values.newExpenseCateg});
      Toastify({ text: "New expense has been added!", duration: 3000, style: { background: "purple" }}).showToast();
      document.getElementById('expenseForm').reset(); 
    } catch (error) {
      throw new Error ('There was problem while adding new expense.');
    }
    return null;
  }

  // Add new deposit / saved amount for existing saving goal.
  if (_action === "createNewDeposit") {
    try {
      createNewDeposit({amount: values.amountsaved, savingGoalId: values.depositCateg, 
                        comment: values.depoComment});
      Toastify({ text: "New deposit has been added!", duration: 3000, style: { background: "purple" }}).showToast();
      document.getElementById('depositForm').reset(); 
    } catch (error) {
      throw new Error ('There was problem while adding deposit.');
    }
    return null;
  }

  if (_action === "deleteBudget") {
    try {
      // Delete related expenses
      const expenses = fetchUserData('expenses') ?? [];
      const relatedExpenses = expenses.filter(expense => expense.budgetId === values.budgetId);
      relatedExpenses.forEach(expense => {
          deleteFunction({ key: 'expenses', id: expense.id });
      });
      // Delete budget
      deleteFunction({key: 'budgets', id: values.budgetId});
      Toastify({ text: `You have now deleted your budget "${values.budgetName}"`, 
                  duration: 4000, style: { background: "purple"} }).showToast();
    } catch (error) {
      throw new Error ('There was problem while deleting budget.');
    }
    return null;
  }

  if (_action === "deleteSavingGoal") {
    try {
      // Delete related deposits
      const deposits = fetchUserData('deposits') ?? [];
      const relatedDeposits = deposits.filter(deposit => deposit.savingGoalId === values.goalId);
      relatedDeposits.forEach(deposit => {
          deleteFunction({ key: 'deposits', id: deposit.id });
      });
      // Delete saving goal
      deleteFunction({key: 'savings', id: values.goalId});
      Toastify({ text: `You have now deleted your saving goal "${values.goalName}"`, 
                  duration: 4000, style: { background: "purple" }}).showToast();
    } catch (error) {
      throw new Error ('There was problem while deleting saving goal.');
    }
    return null;
  }
}

/* MainBoard is the base for whole application.
If userName exists, user has been created and main page can be shown.
Else application shows registration page.*/

const MainBoard = () => {
    const { userName, budgets, savings, incomeBases } = useLoaderData()
    return (
      <div className='mainBoard'>
        {userName ? ( 
        <div>
          <div className='budgetArea'>
            <h1 className='welcometext'>Welcome {userName}! <WavingHandOutlinedIcon/></h1>
            { (budgets && budgets.length > 0) || (savings && savings.length > 0) 
            || (incomeBases && incomeBases.length > 0 ) ? 
            (
            <div>
              <div className='addNewArea'>
                <h2 className='intertitle1'>Track your incomes</h2>
                <Incomes></Incomes>
                {incomeBases && incomeBases.length > 0 && <AddIncomes prevIncomes={incomeBases}></AddIncomes>}
                <h2 className='intertitle2'>Create budgets and saving goals</h2>
                <AddNewBudget></AddNewBudget>
                <AddNewSavingGoal></AddNewSavingGoal>
                {( (budgets && budgets.length) || (savings && savings.length)) 
                    && <h2 className='intertitle3'>Add new expenses or deposits</h2>}
                {budgets && budgets.length > 0 && <AddExpense prevbudgets={budgets}></AddExpense>}
                {savings && savings.length > 0 && <AddDeposit prevsavings={savings}></AddDeposit>}
              </div>
              { budgets && budgets.length > 0 && 
                <div className='budgets'>
                <h2 className='intertitle4'>View your existing budgets:</h2>
                  <div className='CardArea'>
                    {budgets.map((budget) => <BudgetCard key={budget.id} budget={budget}></BudgetCard>)}
                  </div>
                </div>
              }
              { savings && savings.length > 0 && 
                <div className='savings'>
                <h2 className='intertitle4'>View how your saving goals progress:</h2>
                <div className='CardArea'>
                {savings.map((savingGoal) => <SavingGoalCard key={savingGoal.id} 
                  savingGoal={savingGoal}></SavingGoalCard>)}
                </div>
                </div>
              }
            </div>
            ) : (
            <div className='addNewArea'>
              <p className='introText'>Let's get started!</p>
              <h2 className='intertitle1'>Track your incomes</h2>
              <Incomes></Incomes>
              <h2 className='intertitle2'>Create budgets and saving goals</h2>
              <AddNewBudget></AddNewBudget>
              <AddNewSavingGoal></AddNewSavingGoal>
            </div>
            )}
          </div>
        </div> ) : <Register/>}      
      </div>
    )
}

export default MainBoard
