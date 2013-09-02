/*jslint node:true */
/*jslint nomen:true */
/*jslint es5: true */
/*global escape,Prism,handleError,process,mysql,Layout,module,exports,__dirname,require,$,console,cookie,alert,Ember,jQuery,FileReader,canvas,FB*/

function paths(theme) {
	"use strict";
	var cssPath = "./common/prism/" + theme + "/prism.css",
		jsPath = "./common/prism/" + theme + "/prism.js";

	return {cssPath: cssPath, jsPath: jsPath};
}

function refreshTab3() {
	"use strict";
	$("#tab-3 textarea").val($(".preview").html().replace(/^[\r\n]+|\.|[\r\n]+$/g, "").replace(/[\t]/g,""));
}

function refreshTab2() {
	"use strict";
	var code;

	code = $("#tab-1 textarea").val();
	code = code.replace(/</g, "&lt;");
	code = code.replace(/>/g, "&gt;");

	$(".preview pre code").html(code);
	Prism.highlightAll();
	refreshTab3();
}

$(function() {
	"use strict";

	refreshTab2();

	$(".tabs a").on("click", function(event) {
		var element;

		event.stopPropagation();
		event.preventDefault();
		
		if (event.target.nodeName === "SPAN" || event.target.nodeName === "STRONG") {
			element = event.target.parentNode;
		} else {
			element = event.target;
		}

		$("li a.active").removeClass("active");
		$(element).addClass("active");

		$(".tab.active").removeClass("active");
		$("#tab-" + element.dataset.tab).addClass("active");
	});

	$("#tab-1 textarea").on("blur", function() {
		refreshTab2();
	});

	$("#language").on("change", function() {
		$(".preview pre").attr("class", "");
		$(".preview pre code").attr("class", "language-" + $(this).find(":selected").val());
		refreshTab2();
	});

	$("#theme").on("change", function() {
		var theme,
			chosenTheme = $(this).find(":selected").val();

		if (chosenTheme === "") {
			chosenTheme = "default";
		}

		theme = paths(chosenTheme);

		$("#css").attr("href", theme.cssPath);
		$("#tab-3 h3 a").attr("href", theme.cssPath);
		$("#js").attr("src", theme.jsPath);
		refreshTab2();
	});
	
	$("textarea").focus(function() {
		var $this = $(this);

		$this.select();
		// Work around Chrome's little problem
		$this.mouseup(function() {
		// Prevent further mouseup intervention
		$this.unbind("mouseup");
			return false;
		});
	});
});





