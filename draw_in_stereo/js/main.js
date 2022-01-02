$(document).on("ready", function() {
	$("#zoomRange").on("change", changeZoom);
	$("#left").on("mousemove", updateCursors);
	// http://stackoverflow.com/a/17283938
	$('#left').bind('wheel mousewheel', function(e){
        var delta;

        if (e.originalEvent.wheelDelta !== undefined)
            delta = e.originalEvent.wheelDelta;
        else
            delta = e.originalEvent.deltaY * -1;

            if(delta > 0 &&
            	scrollOffset < 100) {
            	scrollOffset++;
            }
            else if (scrollOffset > -100) {
            	scrollOffset--;
            }

         updateCursors({ pageX: cursorX, pageY: cursorY });
        });
	$("#left").on("mousedown", function() {draw(); isDrawing = !isDrawing;});
	$("#left").on("mouseleave", function() {isDrawing = false;});
	$("#reset").on("click", reset);

	// Size and position
	var cursorX = 0;
	var cursorY = 0;
	var scrollOffset = 0; // Min = -100, Max = 100 (min = closest, max = furthest)
	var defaultCursorWidth = 16;
	var currentCursorSize = 16;

	var cursor1 = {x: 0, y: 0};
	var cursor2 = {x: 0, y: 0};

	// Drawing
	var isDrawing = false;


	function changeZoom() {
		var zoom = $("#zoomRange").val();

		$("main").css("flex", zoom.toString());
	}

	function updateCursors(event) {
		var imgHalfWidth = currentCursorSize / 2;

		cursorX = event.pageX;
		cursorY = event.pageY;

		var x = cursorX - imgHalfWidth;
		var y = cursorY - imgHalfWidth;


		var widthOffset = $("#left").css("width");
		widthOffset = parseInt(widthOffset.substring(0, widthOffset.length - 1));

		cursor1.x = x + scrollOffset;
		cursor1.y = y;
		cursor2.x = x + widthOffset - scrollOffset;
		cursor2.y = y;

		$("#cursor1").css("top", cursor1.y);
		$("#cursor1").css("left", cursor1.x);
		$("#cursor1Outline").css("top", cursor1.y);
		$("#cursor1Outline").css("left", cursor1.x);
		$("#cursor2").css("top", cursor2.y);
		$("#cursor2").css("left", cursor2.x);
		$("#cursor2Outline").css("top", cursor2.y);
		$("#cursor2Outline").css("left", cursor2.x);

		if (isDrawing)
			draw();

		resizeCursor();
	}

	function resizeCursor() {
		currentCursorSize = defaultCursorWidth - defaultCursorWidth * 0.01 * scrollOffset;

		$(".cursor").each(function() {
			$(this).css("width", currentCursorSize);
			$(this).css("height", currentCursorSize);
			$(this).css("z-index", -scrollOffset + 100);
			$(this).css("background", getBackgroundColor);
			$(this).css("border-radius", currentCursorSize / 2);
		});

		$(".cursorOutline").each(function() {
			$(this).css("width", currentCursorSize);
			$(this).css("height", currentCursorSize);
			$(this).css("z-index", 201); // One above maximum z-index value for paint
			$(this).css("border-radius", currentCursorSize / 2);
		});
	}

	function draw() {
		var backgroundString = getBackgroundColor();
		var zIndex = -scrollOffset + 100;

		$("#left").append("<div class='paint' style='left:" + cursor1.x + "px;top:" + cursor1.y + "px;height:" + currentCursorSize + "px;width:" + currentCursorSize + "px;border-radius:" + currentCursorSize + "px;z-index:" + zIndex + ";background:" + backgroundString + ";'></div>");
		$("#right").append("<div class='paint' style='left:" + cursor2.x + "px;top:" + cursor2.y + "px;height:" + currentCursorSize + "px;width:" + currentCursorSize +  "px;border-radius:" + currentCursorSize + "px;z-index:" + zIndex + ";background:" + backgroundString + ";'></div>");
	}

	function getBackgroundColor() {
		var scrollOffsetCompensated = scrollOffset + 100;

		var hue = Math.floor(scrollOffsetCompensated / 200 * 360);
		var saturation = Math.floor(70);
		var lightness = Math.floor(70);

		var backgroundString = "hsl(" + hue + ", " + saturation + "%, " + lightness + "%)";

		return backgroundString;
	}

	function reset() {
		defaultCursorWidth = 16;
		currentCursorSize = 16;
		scrollOffset = 0;
		isDrawing = false;
		$("#left").html("");
		$("#right").html("");
	}
});