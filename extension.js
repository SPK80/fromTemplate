// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');


function prepareTemplatePath(documentPath) {
	let templatePath = vscode.workspace
		.getConfiguration('fromTemplate')
		.get('templateFile');

	const dir = path.dirname(documentPath)
	const ext = path.extname(documentPath)

	if (path.extname(templatePath) == '.*') {
		templatePath = templatePath.substr(0, templatePath.lastIndexOf(".")) + ext;
	}

	return path.resolve(dir, templatePath)
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const command = vscode.commands.registerTextEditorCommand('fromTemplate.insert',
		textEditor => {

			if (textEditor.document.getText().length > 0) {
				vscode.window.showInformationMessage('document is not empty')
			}
			else {
				const templatePath = prepareTemplatePath(textEditor.document.uri.fsPath)
				fs.readFile(templatePath, (err, data) => {
					if (!err && data) {
						textEditor.edit(editBuilder =>
							editBuilder.insert(new vscode.Position(0, 0), data.toString() + '\n')
						)
					}
					else {
						vscode.window.
							showInformationMessage(`readFile error: ${err}`)
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