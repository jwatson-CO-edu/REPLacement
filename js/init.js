/*
init.js
James Watson, 2015 January
Setup, helpers, and event listeners for REPLacement, environment-specific
*/

/*
 == LOG ==
2015-02-13: 'txtInput.onkeyup' refactored with 'switch' instead of 'if'
2015-02-12: Imported window creation code from "JScript\Chrome_App\Ex_chrome-app-codelab\00_manual-steps\Step-4_ExternalWeb\js\controller.js"
2015-01-16: * Created file
            * Copied definitions from "REPLacement.htm"

 == TODO ==
* Consider bundling REPL interactions somehow. This has the potential to grow into an Emacs-looking monster
*/

/* The following adds 'String.trim' where it does not already exist, which is not a standard feature of IE8. Taken from:
URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim */
if( !String.prototype.trim ){ String.prototype.trim = function(){ return this.replace(/^\s+|\s+$/gm, ''); }; }

// Store references to <PRE>s for access
var preDebug = document.getElementById('debug');
var preDisplay = document.getElementById('display');

// Store references to <TEXTAREA>s for access
var txtInput = document.getElementById('input');
var txtOutput = document.getElementById('output');

// Store references to <BUTTON>s for access
var btnPickFil = document.getElementById('btnChooseFil');
var btnPickDir = document.getElementById('btnChooseDir');  

// Test writing to <TEXTAREA>s, 2013-04-17: Both *.innerText and *.value seem to work
txtInput.value = "";
txtOutput.value = "";

// == Evaluation Interaction ==

txtInput.outputTarget = txtOutput; // Refernce to the <TEXTAREA> where output will be sent

function append_eval_result(inbox, outbox){ // eval inbox with 'REPLacement', write to outbox, then erase inbox
	outbox.value += (outbox.value ? "\n" : "") + "input: " + inbox.value.trim() + " -->\n" + p(value(s(inbox.value)));
	inbox.value = "";
}

txtInput.onkeyup = function(e){ // Determine what key was pressed inside the input area and take the appropriate action
	e = e || window.event; // Catch event details in FF || IE
	var code = e.keyCode || e.which;

	preDisplay.innerText = txtInput.value;

	// URL, Arrow keys: http://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript
	// left = 37, up = 38, right = 39, down = 40
	switch(code){
		case 13: // if the key released was [Enter], then eval the input text
			append_eval_result(txtInput, txtOutput);
			break;
		default:
			// Let all the other keys do their thing, man!
	}

}

// == End Interaction ==

// == File Interaction ==

btnPickFil.onclick = External.choose_file_and_load;
btnPickDir.onclick =  function(){ preDebug.innerText = External.choose_file_load_path(); };

// == End File ==


// == Editor Interaction ==

function new_editor_window(){
	chrome.app.window.create(
		'editor.html',
		{hidden: false}//, // only show window when webview is configured
		/*
		function(appWin){
			appWin.contentWindow.addEventListener(
				'DOMContentLoaded',
				function(e){
					// when window is loaded, set webview source
					var webview = appWin.contentWindow.document.querySelector('webView');
					webview.src = url;
					appWin.show(); // now we can show it
				}
			);
		}
		*/
	);
}
btnEditor.onclick = new_editor_window;

// == End Editor ==