import { redirect } from "react-router-dom";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

/**
 * Fetches data from the local storage based on the provided key.
 * @param {string} key - The key used to retrieve data from local storage.
 * @returns {Object} The data stored in the local storage corresponding to the provided key. Parsed as JS object
 */
export const fetchUserData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

/**
 * Deletes a given item from local storage based on key.
 * @param {string} key - The key of the item to be deleted from local storage.
 * @returns {void}
 */
export const deleteItem = ({key}) => {
    return localStorage.removeItem(key)
}

/**
 * Delete user data from local storage, sends a confirmation notification,
 * and redirects the user to the front page.
 */
export async function logOut() {
    try {
        localStorage.clear();
        Toastify({ text: "You have deleted your account.", duration: 5000, 
        style: {
            background: "purple"
          } }).showToast();
        return redirect('/');
    } catch (error) {
        Toastify({ text: "There was error while deleting your account.", 
                    duration: 5000, backgroundColor: "red" }).showToast();
    }
}

// Functions for updating local storage and saving user data to it.

/**
 * Creates a new income base and stores it in local storage.
 * @param {string} name - The name for the income base.
 * @returns {void}
 */
export const createIncomeBase = ( {name} ) => {
    const newItem = {
        name: name,
        date: Date.now(),
        id: Math.random().toString(36).substring(2),
    }

    const previousIncomeBases = fetchUserData('incomeBases') ?? [];
    // Add to local storage
    return localStorage.setItem('incomeBases', JSON.stringify([...previousIncomeBases, newItem]))
}

/**
 * Creates a new budget and stores it in local storage.
 * @param {string} name - The name of the budget.
 * @param {number} limit - The spending limit of the budget.
 * @param {string} date - The date associated with the budget.
 * @returns {void} 
 */
export const createNewBudget = ( {name, limit, date} ) => {
    const newItem = {
        name: name,
        limit: +limit,
        date: date,
        id: Math.random().toString(36).substring(2),
    }

    // Check for existing budgets, if true fetch budgets / if not create new empty arrow
    const previousBudgets = fetchUserData('budgets') ?? [];
    return localStorage.setItem('budgets', JSON.stringify([...previousBudgets, newItem]))
}

/**
 * Creates a new saving goal and stores it in local storage.
 * @param {string} name - The name of the saving goal.
 * @param {number} goal - The goal amount for the saving goal.
 * @param {string} date - The goal date for the saving goal.
 * @returns {void}
 */
export const createNewSaving = ( {name, goal, date} ) => {
    const newItem = {
        name: name,
        goal: +goal,
        date: date,
        id: Math.random().toString(36).substring(2),
    }
    const previousGoals = fetchUserData('savings') ?? [];
    return localStorage.setItem('savings', JSON.stringify([...previousGoals, newItem]))
}

/**
 * Updates incomes and bases by adding a new income entry and storing it in local storage.
 * @param {string} name - The name of the income / action.
 * @param {number} amount - The amount of the new income.
 * @param {string} incomeBaseId - The ID of the income base to which income belongs.
 * @returns {void}
 */
export const updateIncomes = ({name, amount, incomeBaseId}) => {
    const newItem = {
        name: name,
        amount: +amount, 
        incomeBaseId: incomeBaseId,
        date: Date.now(),
        id: Math.random().toString(36).substring(2),
    } 
    const previousUpdates = fetchUserData('incomes') ?? [];
    return localStorage.setItem('incomes', JSON.stringify([...previousUpdates, newItem]))
}

/**
 * Creates a new expense and stores it in local storage.
 * @param {string} name - The name of the expense.
 * @param {number} amount - The amount of the expense.
 * @param {string} categoryId - The ID of the budget to which expense belongs.
 * @returns {void}
 */
export const createNewExpense = ( {name, amount, categoryId} ) => {
    const newItem = {
        name: name,
        amount: +amount,
        budgetId: categoryId,
        date: Date.now(),
        id: Math.random().toString(36).substring(2),
    }
    const previousExpences = fetchUserData('expenses') ?? [];

    // Check for budget limit after new transaction
    notifyBudgetLimit({expenses: previousExpences, budgetId: categoryId, newExpe: newItem});
    return localStorage.setItem('expenses', JSON.stringify([...previousExpences, newItem]));
}

/**
 * Creates a new deposit and stores it in local storage.
 * @param {number} amount - The amount of the deposit.
 * @param {string} savingGoalId - The ID of the saving goal to which deposit belongs.
 * @param {string} [comment] - An optional comment for the deposit.
 * @returns {void}
 */
export const createNewDeposit = ( {amount, savingGoalId, comment} ) => {
    const newItem = {
        amount: +amount, 
        savingGoalId: savingGoalId,
        comment: comment || '-',
        date: Date.now(),
        id: Math.random().toString(36).substring(2),
    }

    const previousDeposits = fetchUserData('deposits') ?? [];
    // Check if saving goal completes
    notifySavingGoal({deposits: previousDeposits, goalId: savingGoalId, newDepo: newItem});
    return localStorage.setItem('deposits', JSON.stringify([...previousDeposits, newItem]));
}

// Functions for sending notifications

/**
 * Checks if a saving goal is completed after adding a new deposit. Notifies the user if it's achieved.
 * @param {Object[]} deposits - An array containing all previous deposits.
 * @param {string} goalId - The ID of the saving goal to check.
 * @param {Object} newDepo - Object containing added new deposit.
 * @returns {void}
 */
export const notifySavingGoal = ({deposits, goalId, newDepo}) => {
    const goals = fetchUserData('savings');
    let savedByNow = newDepo.amount;
    let goalAmount = 0;
    let goalName = ''

    // Find the goal by id
    for (const theGoal of goals){
        if (theGoal.id === goalId) {
            goalAmount = theGoal.goal;
            goalName = theGoal.name;
        }
    }

    // Calculate total saved amount for the goal
    for (const goalDeposits of deposits) {
        if (goalDeposits.savingGoalId === goalId) {
            savedByNow += goalDeposits.amount;
        }
    }

    // Notify if the goal is completed
    if (savedByNow >= goalAmount) {
        Toastify({ text: `Congratulations, you have completed your saving goal ${goalName}!`, 
                    duration: 10000, style: { background: "purple" }}).showToast();
    }
}

/**
 * Checks if a budget limit is reached or exceeded after adding a new expense. Notifies the user.
 * @param {Object[]} expenses - An array containing all previous expenses.
 * @param {string} budgetId - The ID of the budget to check.
 * @param {Object} newExpe - Object containing new added expense.
 * @returns {void}
 */
export const notifyBudgetLimit = ({expenses, budgetId, newExpe}) => {
    const budgets = fetchUserData('budgets');
    let usedByNow = newExpe.amount;
    let budgetName = '';
    let limit = 0;

    // Find the budget by its ID
    for (const theBudget of budgets){
        if (theBudget.id === budgetId) {
            limit = theBudget.limit;
            budgetName = theBudget.name;
        }
    }

    // Calculate total used amount for the budget
    for (const budgetExpenses of expenses) {
        if (budgetExpenses.budgetId === budgetId) {
            usedByNow += budgetExpenses.amount;
        }
    }
    
    // Notify if the budget limit is reached or exceeded
    if (usedByNow === limit) {
        Toastify({ text: `HOX, Your budget limit for budget ${budgetName} has been reached!`, 
                    duration: 10000, 
                    style: {
                        background: "purple"
                    }}).showToast();
    } if (usedByNow > limit) {
        Toastify({ text: `HOX, Your budget limit has gone over for budget ${budgetName}!`, 
                    duration: 10000, 
                    style: {
                        background: "purple"
                    }}).showToast();     
    }
}

// Helper functions for calculating budget and saving goal limits.

/**
 * Calculates the total expenses for a given budget ID.
 * @param {string} budgetId - The ID of the budget for which to calculate the total expenses.
 * @returns {number} The total amount of expenses for the specified budget.
 */
export const calcBudgetExpenses = (budgetId) => {
    const allExpenses = fetchUserData('expenses') ?? [];
    let total = 0;
    for (const expense of allExpenses) {
        if( expense.budgetId === budgetId ) {
            total += expense.amount;
        }
    }
    return total;
}

/**
 * Calculates the total of deposits for a given saving goal ID.
 * @param {string} goalId - The ID of the saving goal.
 * @returns {number} The total amount of savings for the specified saving goal.
 */
export const calcSavings = (goalId) => {
    const allDeposits = fetchUserData('deposits') ?? [];
    let total = 0;
    for (const deposit of allDeposits) {
        if( deposit.savingGoalId === goalId ) {
            total += deposit.amount;
        }
    }
    return total;
}

// Functions for 'recent' -pages

/**
 * Deletes a specific item from local storage based on key and id.
 * @param {string} key - The key for the item to be deleted.
 * @param {string} id - The id of the item to be deleted.
 * @returns {void}
 */
export const deleteFunction = ({key, id}) => {
    const data = fetchUserData(key);
    if (id) {
        const newData = data.filter((item) => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
}

/**
 * Deletes expense from local storage based on users request.
 * @param {request} - The request object containing form data. 
 *                    Contains two values: key and id for transaction to be deleted.
 * @returns {void}
 */
export async function recentExpenses({request}) {
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);
    // delete expense
    if (_action === "deleteExpense") {
        try {
            deleteFunction({key: 'expenses', id: values.actionId});
            return Toastify({ text: "Expense deleted successfully!", duration: 4000, 
                                style: { background: "purple" }}).showToast();
        } catch (error) {
            throw new Error ('There was problem while deleting expense.');
        }
  }
}

/**
 * Deletes income from local storage based on users request.
 * @param {request} - The request object containing form data. 
 *                    Contains two values: key and id for transaction to be deleted.
 * @returns {void}
 */
export async function recentIncomes({request}) {
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);
    // delete income
    if (_action === "deleteIncome") {
        try {
            deleteFunction({key: 'incomes', id: values.actionId});
            return Toastify({ text: "Income deleted successfully!", duration: 4000, 
                                style: { background: "purple" }}).showToast();
        } catch (error) {
            throw new Error ('There was problem while deleting income.');
        }
  }
}

/**
 * Deletes deposit from local storage based on users request.
 * @param {request} - The request object containing form data. 
 *                    Contains two values: key and id for transaction to be deleted.
 * @returns {void}
 */
export async function recentDeposits({request}) {
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);
    // delete deposit
    if (_action === "deleteDeposit") {
        try {
            deleteFunction({key: 'deposits', id: values.actionId});
            return Toastify({ text: "Deposit deleted successfully!", duration: 4000,
                                style: { background: "purple" }}).showToast();
        } catch (error) {
            throw new Error ('There was problem while deleting deposit.');
        }
  }
}

/**
 * Retrieves the username from local storage.
 * @returns {string} - The username stored in local storage. If no username is stored, returns an empty string.
 */
export const getUsername = () => {
    return localStorage.getItem('userName') || '';
};
  
/**
 * Stores a given username in local storage. Updates new username to old ones place.
 * @param {string} username - The username to be stored in local storage.
 * @returns {void}
 */
export const setUsername = (username) => {
    return localStorage.setItem('userName', JSON.stringify(username));
};

/**
 * Retrieves the password from local storage.
 * @returns {string} - The password stored in local storage. If no password is stored, returns an empty string.
 */
export const getPassword = () => {
    return localStorage.getItem('password') || '';
};

/**
 * Stores a given password in local storage. Updates new password to old ones place.
 * @param {string} password - The password to be stored in local storage.
 * @returns {void}
 */
export const setPassword = (password) => {
    return localStorage.setItem('password', JSON.stringify(password));
};

/**
 * Deletes income base and incomes related to the base from local storage based on users request.
 * @param {request} - The request object containing form data. 
 *                    Contains two values: key and id for transaction to be deleted.
 * @returns {void}
 */
export async function recentBases({request}) {
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);
    if (_action === "deleteBase") {
        try {
           // Delete related incomes
            const incomes = fetchUserData('incomes') ?? [];
            const relatedIncomes = incomes.filter(income => income.incomeBaseId === values.actionId);
            relatedIncomes.forEach(income => {
                deleteFunction({ key: 'incomes', id: income.id });
            });
            // Delete base
            deleteFunction({key: 'incomeBases', id: values.actionId});
            Toastify({ text: "Income base and it's incomes deleted successfully!", duration: 5000, 
                        style: { background: "purple" }}).showToast();
            return redirect('/')
        } catch (error) {
            throw new Error ('There was problem while deleting base and incomes in it.');
        }
    }
}