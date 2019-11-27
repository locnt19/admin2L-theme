// Create map instance
var chart = am4core.create("chart-maps", am4maps.MapChart);

// Set map definition
chart.geodata = am4geodata_worldUltra;

// Set projection
chart.projection = new am4maps.projections.Miller();

// // Setting map center
// chart.deltaLongitude = -160;

// Add button
var zoomOut = chart.tooltipContainer.createChild(am4core.ZoomOutButton);
zoomOut.align = "right";
zoomOut.valign = "top";
zoomOut.margin(20, 20, 20, 20);
zoomOut.events.on("hit", function () {
	if (currentSeries) {
		currentSeries.hide();
	}
	chart.goHome();
	zoomOut.hide();
	currentSeries = regionalSeries.US.series;
	currentSeries.show();
});
zoomOut.hide();

// Export
chart.exporting.menu = new am4core.ExportMenu();

// Zoom control
chart.zoomControl = new am4maps.ZoomControl();

// Series for World map
var worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
worldSeries.include = ["VN", "JP"]
// Asia
// worldSeries.include = ["AF", "AM", "AZ", "BH", "BD", "BT", "BN", "KH", "CN", "GE", "HK", "IN", "ID", "IR", "IQ", "IL", "JP", "JO", "KZ", "KW", "KG", "KP", "LA", "LB", "MO", "MY", "MV", "MN", "MM", "NP", "OM", "PK", "PH", "QA", "SA", "SG", "KR", "LK", "SY", "TW", "TJ", "TH", "TR", "TM", "AE", "UZ", "VN", "YE"];
worldSeries.useGeodata = true;
var polygonTemplate = worldSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";
// polygonTemplate.fill = am4core.color("#74B266");
polygonTemplate.propertyFields.disabled = "disabled";
var hs = polygonTemplate.states.create("hover");
// hs.properties.fill = am4core.color("#367B25");
worldSeries.data = [{
	id: "VN",
	disabled: true
}, {
	id: "JP",
	disabled: true
}];

// Series for Viet Nam map
var japanSeries = chart.series.push(new am4maps.MapPolygonSeries());
japanSeries.geodata = am4geodata_japanHigh
var japanTemplate = japanSeries.mapPolygons.template;
japanTemplate.tooltipText = "{name}";
japanTemplate.fill = am4core.color("#FF6384");
var hs = japanTemplate.states.create("hover");
hs.properties.fill = am4core.color("#FF3D67");

// Series for Viet Nam map
var vietnamSeries = chart.series.push(new am4maps.MapPolygonSeries());
vietnamSeries.geodata = am4geodata_vietnamHigh
var polygonTemplate = vietnamSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";
polygonTemplate.fill = am4core.color("#36A2EB");
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#059BFF");

var currentActive;
polygonTemplate.events.on("hit", function (e) {
	if (currentActive) {
		currentActive.setState("default");
	}
	chart.zoomToObject(e.target);
	currentActive = e.target;
})