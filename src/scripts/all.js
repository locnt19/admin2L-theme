$(document).ready(function () {
	const dashboardReportMonthly = $('#dashboard_report-monthly')
	var chartDashboardReportMonthly = new Chart(dashboardReportMonthly, {
		// The type of chart we want to create
		type: 'bar',

		// The data for our dataset
		data: {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [{
				label: 'My First dataset',
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgb(255, 99, 132)',
				data: [0, 10, 5, 2, 20, 30, 45]
			}]
		},
		// Configuration options go here
		options: {}
	})
});