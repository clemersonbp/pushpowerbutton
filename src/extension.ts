import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "Push Power Button" is now active!');

    const pushFileCommand = vscode.commands.registerCommand('pushpowerbutton.pushFile', async () => {
        const editor = vscode.window.activeTextEditor;
        
        if (editor) {
            const fileName = editor.document.fileName;
            
            await editor.document.save();
            
            const command = `.\\push-file.bat "${fileName}"`;
            
            let terminal = vscode.window.activeTerminal;
            if (!terminal) {
                terminal = vscode.window.createTerminal('PushPowerButton');
            }
            
            terminal.show();
            terminal.sendText(command);
            
            const parentDir = path.dirname(fileName);
            const grandparentDir = path.dirname(parentDir);
            const fileNameWithParentDir = fileName.substring(grandparentDir.length + 1);
            
            vscode.window.showInformationMessage(`Push file: ${fileNameWithParentDir}`);
        } else {
            vscode.window.showWarningMessage('No active editors found');
        }
    });

    context.subscriptions.push(pushFileCommand);
}

export function deactivate() {}