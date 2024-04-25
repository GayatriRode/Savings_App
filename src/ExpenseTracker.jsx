import React, { useState, useEffect } from 'react';

const ExpenseTracker = () => {
  const [monthsData, setMonthsData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState('');
  const [salary, setSalary] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [totalSavings, setTotalSavings] = useState(0);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('expenseTrackerData'));
    if (savedData) {
      setMonthsData(savedData.monthsData || []);
      setCurrentMonth(savedData.currentMonth || '');
      setSalary(savedData.salary || '');
      setExpenses(savedData.expenses || []);
      setTotalSavings(savedData.totalSavings || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'expenseTrackerData',
      JSON.stringify({
        monthsData,
        currentMonth,
        salary,
        expenses,
        totalSavings,
      })
    );
  }, [monthsData, currentMonth, salary, expenses, totalSavings]);

  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount || 0), 0);
  };

  const calculateMonthlySavings = () => {
    const totalExpenses = calculateTotalExpenses();
    return parseFloat(salary) - totalExpenses;
  };

  const addExpense = () => {
    if (title && amount) {
      const newExpense = { title, amount: parseFloat(amount || 0) };
      setExpenses([...expenses, newExpense]);
      setTitle('');
      setAmount('');
    } else {
      alert('Please enter title and amount for the expense.');
    }
  };

  const addMonth = () => {
    if (currentMonth && salary) {
      const totalExpenses = calculateTotalExpenses();
      const monthlySavings = calculateMonthlySavings();
      const updatedMonthData = {
        month: currentMonth,
        salary: parseFloat(salary),
        expenses: expenses,
        totalExpenses: totalExpenses,
        monthlySavings: monthlySavings,
      };
      setMonthsData([...monthsData, updatedMonthData]);
      setCurrentMonth('');
      setSalary('');
      setExpenses([]);
    } else {
      alert('Please enter month and salary for the new month.');
    }
  };

  const calculateGrandSavings = () => {
    const grandTotalSavings = monthsData.reduce((total, monthData) => total + monthData.monthlySavings, 0);
    return grandTotalSavings;
  };

  return (
    <div>
      <video autoPlay muted loop id="background-video">
        <source src="https://motionbgs.com/media/1031/paradise-sunset.960x540.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h2 className='text-center text-white p-4'>Track Your Savings</h2>
      <div className='container-fluid'>
        <div className='wrapper'>
          <div className='box1'>
            <div>
              <label>Select Month:</label>
              <select className='form-control' value={currentMonth} onChange={(e) => setCurrentMonth(e.target.value)}>
                <option value="">Select Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
            <br />

            <div>
              <label>Enter Salary:</label>
              <input type="number" className='form-control' value={salary} onChange={(e) => setSalary(e.target.value)} /><br />
            </div>

            <div>
              <label>Expense Title:</label>
              <input type="text" className='form-control' value={title} onChange={(e) => setTitle(e.target.value)} /><br />
            </div>

            <div>
              <label>Expense Amount:</label>
              <input type="number" className='form-control' value={amount} onChange={(e) => setAmount(e.target.value)} /><br />
            </div>

            <div className='d-flex justify-content-center'>
              <button className='btn btn-primary mr-2' onClick={addExpense}>Add Expense</button>
              <button className='btn btn-success' onClick={addMonth}>Add Month</button>
            </div>
          </div>

          <div className="monthly-details bg-white p-4">
            <h2>Monthly Details</h2>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Expenses</th>
                  <th>Total Expenses</th>
                  <th>Monthly Savings</th>
                </tr>
              </thead>
              <tbody>
                {monthsData.map((monthData, index) => (
                  <tr key={index}>
                    <td>{monthData.month}</td>
                    <td>
                      <table className='table'>
                        <tbody>
                          {monthData.expenses.map((expense, expenseIndex) => (
                            <tr key={expenseIndex}>
                              <td>{expense.title}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                    <td>Rs. {monthData.totalExpenses}</td>
                    <td>Rs. {monthData.monthlySavings}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div>
              <h3>Total Savings</h3>
              <p>Rs. {calculateGrandSavings()}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
