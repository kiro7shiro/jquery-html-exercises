import { ListItem } from './ListItem.js'

/**
 * Represents a list of notes
 * @class List
 */
class List {
    /**
     * Creates an instance of List.
     * @param {String} name
     * @param {HTMLElement} element an unordered list
     * @memberof List
     */
    constructor(name, element) {
        if(!element) throw new Error('element must be given!')
        this.addButton = undefined
        this.inputBox = undefined
        this.element = element
        this.element.classList.add('w3-ul', 'w3-border')
        this.element.addEventListener('mouseenter', this.mouseEnter.bind(this))
        this.element.addEventListener('mouseleave', this.mouseLeave.bind(this))
        this.name = name
    }
    get items() {
        return this.element.children
    }
    append(text) {
        const item = new ListItem(text)
        this.element.append(item.element)
    }
    load(name) {
        const saved = localStorage.getItem(name).split(',')
        saved.forEach(item => this.append(item))
    }
    mouseLeave(event) {
        if(this.addButton) {
            this.addButton.remove()
            this.addButton = undefined
        }
        if(this.inputBox) {
            this.inputBox.remove()
            this.inputBox = undefined
        }
    }
    mouseEnter(event) {
        if (!this.addButton) {
            this.addButton = document.createElement('button')
            this.addButton.innerHTML = 'add'
            this.addButton.addEventListener('click', event => {
                this.inputBox = document.createElement('input')
                this.inputBox.addEventListener('keyup', event => {
                    if(event.key === 'Enter') {
                        this.append(this.inputBox.value)
                        this.mouseLeave()
                    }
                })
                this.element.prepend(this.inputBox)
                this.inputBox.focus()
            })
            this.element.prepend(this.addButton)
        }
    }
    prepend(text) {
        const item = new ListItem(text)
        this.element.prepend(item.element)
    }
    remove(index) {
        this.items[index].remove()
    }
    save() {
        localStorage.setItem(this.name, this.toArray())
    }
    shiftDown(element) {
        this.prepend(element.innerHTML)
        this.element.lastElementChild.remove()
    }
    shiftUp(element) {
        this.append(element.innerHTML)
        this.element.firstElementChild.remove()
    }
    toArray() {
        const result = []
        const self = Array.from(this.items)
        self.forEach(item => result.push(item.innerHTML))
        return result
    }
}

export { List }