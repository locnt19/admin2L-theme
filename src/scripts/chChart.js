$(document).ready(function () {
	var $hChart = $('#h-chart');
	var $cChart = $('#c-chart');
	var months = [
		'Tháng 1',
		'Tháng 2',
		'Tháng 3',
		'Tháng 4',
		'Tháng 5',
		'Tháng 6',
		'Tháng 7',
		'Tháng 8',
		'Tháng 9',
		'Tháng 10',
		'Tháng 11',
		'Tháng 12'
	];

	var chart2018 = {
		label: '2018',
		data: [25, 46, 68, 95, 125, 248, 124, 235, 125, 300, 294, 236],
		backgroundColor: 'rgba(255, 99, 132, .2)',
		borderColor: 'rgba(255, 99, 132, 1)',
		borderWidth: 1
	}

	var chart2019 = {
		label: '2019',
		data: [68, 45, 95, 125, 212, 249, 354, 258, 195, 162, 154, 150],
		backgroundColor: 'rgba(54, 162, 235, 0.2)',
		borderColor: 'rgba(54, 162, 235, 1)',
		borderWidth: 1
	}

	var hChart = new Chart($hChart, {
		type: 'bar',
		data: {
			labels: months,
			backgroundColor: 'rgba(54, 162, 235, 1)',
			datasets: [chart2018, chart2019]
		},
	});

	var cChart = new Chart($cChart, {
		type: 'pie',
		data: {
			labels: [2018, 2019],
			datasets: [{
				label: [2018, 2019],
				data: [3659, 4569],
				backgroundColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)'
				]
			}]
		}
	});
	cChart.aspectRatio = 1;
	// Change aspectRatio when responsive
	$(window).resize(function () {
		if (window.outerWidth < 992) {
			hChart.aspectRatio = 4 / 3;
		} else hChart.aspectRatio = 2;
	});

});