import React, { useState, useEffect } from 'react';

const ExpenseTracker = () => {
  const [month, setMonth] = useState('');
  const [salary, setSalary] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [totalSavings, setTotalSavings] = useState(0);
  const [prevMonth, setPrevMonth] = useState('');
  const [prevMonthSalary, setPrevMonthSalary] = useState(0);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('expenseTrackerData'));
    if (savedData) {
      setMonth(savedData.month);
      setSalary(savedData.salary);
      setExpenses(savedData.expenses);
      setTotalSavings(savedData.totalSavings);
      setPrevMonth(savedData.prevMonth);
      setPrevMonthSalary(savedData.prevMonthSalary);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('expenseTrackerData', JSON.stringify({ month, salary, expenses, totalSavings, prevMonth, prevMonthSalary }));
    if (month !== prevMonth) {
      const newTotalSavings = parseFloat(totalSavings || 0) + parseFloat(prevMonthSalary || 0) - calculateTotalExpenses();
      setTotalSavings(newTotalSavings);
      setPrevMonth(month);
      setPrevMonthSalary(parseFloat(salary || 0));
      setSalary('');
    }
  }, [month, salary, expenses, totalSavings, prevMonth, prevMonthSalary]);

  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount || 0), 0);
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
    if (month && salary) {
      const newTotalSavings = parseFloat(totalSavings || 0) + parseFloat(prevMonthSalary || 0) - calculateTotalExpenses();
      setTotalSavings(newTotalSavings);
      setPrevMonth(month);
      setPrevMonthSalary(parseFloat(salary || 0));
      setMonth('');
      setSalary('');
      setExpenses([]);
    } else {
      alert('Please enter month and salary for the new month.');
    }
  };

  return (
    <div>
      <h2 className='text-center p-4'>Track Your Savings</h2>
      <div className=' container-fluid'>
      <div className="wrapper">
        <div className="box1">
            <div>
                <label>Select Month:</label>
                <select className='form-control' value={month} onChange={(e) => setMonth(e.target.value)}>
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
            </div><br />
      
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
    
        <div className='box2'>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense, index) => (
                        <tr key={index}>
                            <td>{expense.title}</td>
                            <td>Rs. {expense.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        
            <div>
                <h3>Total Savings: Rs. {totalSavings}</h3>
            </div>
        </div>
    </div>
    </div>
</div>
  );
};

export default ExpenseTracker;
