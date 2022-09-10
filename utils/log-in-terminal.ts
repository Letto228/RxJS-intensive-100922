const terminal = document.querySelector('.terminal pre') as HTMLPreElement;

export function terminalLog<T>(text: T, where: InsertPosition = 'beforeend') {
    terminal.insertAdjacentHTML(where, `<div>${text}</div>`)
}
