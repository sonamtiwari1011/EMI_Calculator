document.querySelector('#calculate').addEventListener('click', function () {
    let loan = parseFloat(document.getElementById('amount').value);
    let interestRate = parseFloat(document.getElementById('apr').value);
    let tenure = parseFloat(document.getElementById('tenure').value);

    if (isNaN(loan) || isNaN(interestRate) || isNaN(tenure)) {
        alert('Please fill in all the fields.');
        return;
    }

    let noOfMonths = tenure * 12;
    let monthlyRate = (interestRate / 100) / 12;
    let onePlusR = Math.pow(1 + monthlyRate, noOfMonths);
    let emi = (loan * monthlyRate * onePlusR) / (onePlusR - 1);
    let totalAmt = emi * noOfMonths;
    let totalInterest = totalAmt - loan;

    document.getElementById('emi').textContent = emi.toFixed(2);
    document.getElementById('totalInterest').textContent = totalInterest.toFixed(2);
    document.getElementById('totalPayment').textContent = totalAmt.toFixed(2);

    // Clear existing table data
    document.getElementById('monthTable').innerHTML = '';
    document.getElementById('yearTable').innerHTML = '';

    generateMonthlyBreakdown(emi, loan, monthlyRate, noOfMonths);
    generateYearlyBreakdown(emi, loan, monthlyRate, noOfMonths);
});

function generateMonthlyBreakdown(emi, loan, monthlyRate, noOfMonths) {
    let monthTable = document.getElementById('monthTable');
    let balance = loan;
    let totalInterestPaid = 0;

    let headerRow = `<tr>
                        <th>Month</th>
                        <th>EMI</th>
                        <th>Interest</th>
                        <th>Principal</th>
                        <th>Balance</th>
                    </tr>`;
    monthTable.insertAdjacentHTML('beforeend', headerRow);

    for (let i = 1; i <= noOfMonths; i++) {
        let interest = balance * monthlyRate;
        let principal = emi - interest;
        balance -= principal;

        totalInterestPaid += interest;

        let row = `<tr>
                    <td>${i}</td>
                    <td>₹${emi.toFixed(2)}</td>
                    <td>₹${interest.toFixed(2)}</td>
                    <td>₹${principal.toFixed(2)}</td>
                    <td>₹${balance.toFixed(2)}</td>
                   </tr>`;
        monthTable.insertAdjacentHTML('beforeend', row);
    }
}

function generateYearlyBreakdown(emi, loan, monthlyRate, noOfMonths) {
    let yearTable = document.getElementById('yearTable');
    let balance = loan;
    let totalInterestPaid = 0;

    let headerRow = `<tr>
                        <th>Year</th>
                        <th>Total EMI</th>
                        <th>Total Interest</th>
                        <th>Total Principal</th>
                        <th>Balance</th>
                    </tr>`;
    yearTable.insertAdjacentHTML('beforeend', headerRow);

    for (let i = 1; i <= noOfMonths / 12; i++) {
        let yearlyEMI = 0;
        let yearlyInterest = 0;
        let yearlyPrincipal = 0;

        for (let j = 1; j <= 12; j++) {
            let interest = balance * monthlyRate;
            let principal = emi - interest;
            balance -= principal;

            yearlyEMI += emi;
            yearlyInterest += interest;
            yearlyPrincipal += principal;
        }

        let row = `<tr>
                    <td>${i}</td>
                    <td>₹${yearlyEMI.toFixed(2)}</td>
                    <td>₹${yearlyInterest.toFixed(2)}</td>
                    <td>₹${yearlyPrincipal.toFixed(2)}</td>
                    <td>₹${balance.toFixed(2)}</td>
                   </tr>`;
        yearTable.insertAdjacentHTML('beforeend', row);
    }
}
