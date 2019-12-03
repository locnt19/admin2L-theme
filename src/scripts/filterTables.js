function drawCell(td, value, index, head, item) {
	if (head.name === 'status') {
		console.log('1')
		var span = $("<code>").html('statuses[value][0]').addClass('statuses[value][1]');
		console.log(span)
		// $(td).html(span);
	}
}

function setFilter(flt, checked) {
	var table = $('#template_table').data('table');
	var label = [
		"Đủ thông tin",
		"Thiếu thông tin"
	]
	if (checked) {
		window[flt] = table.addFilter(function (row, heads) {
			var is_active_index = 0;
			heads.forEach(function (el, i) {
				if (el.name === "status") {
					is_active_index = i;
				}
			});
			if (flt == 'filterThieuThongTin') {
				return row[is_active_index].contains(label[1]);
			}
			if (flt == 'filterDuThongTin') {
				return row[is_active_index].contains(label[0]);
			}
		}, true);
	} else {
		table.removeFilter(window[flt], true);
	}
}