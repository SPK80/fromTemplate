// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const command = vscode.commands.registerTextEditorCommand('fromTemplate.insert',
		textEditor => {
			const fsPath = textEditor.document.uri.fsPath;
			const dir = path.dirname(fsPath)
			const ext = path.extname(fsPath)
			const templPath = `${dir}${path.sep}_template${ext}`

			if (textEditor.document.getText().length > 0) {
				vscode.window.showInformationMessage('document is not empty')
			}
			else {
				fs.readFile(templPath, (err, data) => {
					if (!err && data) {
						textEditor.edit(editBuilder =>
							editBuilder.insert(new vscode.Position(0, 0), data.toString() + '\n')
						)
					}
				})
			}
		})

	context.subscriptions.push(command);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}