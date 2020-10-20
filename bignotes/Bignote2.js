// use ES6 class syntax for better reading
class NotePointer {
    constructor(link, list) {
        // I don't have any idea what purpose this class should have.
        // I guess it's something like a hashtable.
        this.link = link
        this.list = list
    }
}

class Note extends NotePointer {
    // A note represents a textfield on the screen
    // It extends NotePointer since they both share the same properties.
    constructor(root, link = '.field_big' ) { // you can use default parameters like this
        // calling the base class via super() before initalizing this instance
        super(link, [root])
        this.pointers = {
            top : new NotePointer('.field_top', []),
            right : new NotePointer('.field_right', []),
            bottom : new NotePointer('.field_bottom', []),
            left : new NotePointer('.field_left', []),
        }
        // read in the sourrounding fields
        for (const key in this.pointers) {
            const pointer = this.pointers[key];
            document.querySelectorAll(pointer.link + ' ul li').forEach(element => {
                pointer.list.push(element.innerHTML)
            })
        }
    }
}

// define the application namespace
class BigNoteApp {
    // !! please insert a project desciption here !!
    // what should the program do?
    constructor() {
        //define application state vars
        this.selected_last = undefined
        this.store_id = 'bignotes_'
        // using template strings to generate new html elements in one go
        const buttons = `<div class="highbuttons">
                        <button class="b1_load">load</button>  
                        <button class="b2_save">save</button>  
                        <button class="b3_">edit</button>  
                       </div>`
        // create the new element
        let highbuttons = document.createElement('div')
        highbuttons.innerHTML = buttons
        // setting up event handlers
        highbuttons.querySelector('.b1_load').addEventListener('click', event => {
            const data = JSON.parse(localStorage.getItem(this.store_id))
            console.log(data)
        })
        highbuttons.querySelector('.b2_save').addEventListener('click', event => {
            const root = document.querySelector('#bignote .highlighter')
            let note = new Note(root) // no need to set the second parameter, since we setup a default value
            // find the "getnode" functionality inside the Note constructor
            localStorage.setItem(this.store_id, JSON.stringify(note))
            console.log('saved as :', this.store_id)
        })
        // append new elements
        document.querySelector('#bignote .highlighter').append(highbuttons)

        // setting up global event handlers
        document.querySelectorAll('li').forEach(element => {
            element.addEventListener('click', event => {
                let fontSize = parseInt(element.style.fontSize)
                if(event.ctrlKey) {
                    fontSize = Math.round(fontSize * 1.16)
                }else if(event.altKey) {
                    fontSize = Math.round(fontSize * 0.84)
                }else{
                    element.classList.toggle('selected', true)
                    this.selected_last = element
                }
                element.style.fontSize = fontSize + 'px'
            })
        })

        document.querySelectorAll('.bignote').forEach(element => {
            element.addEventListener('wheel', event => {
                // findig the host element
                let [host] = event.path.filter(element => {
                    if (element.classList) return element.classList.contains('bignote')
                    return false
                })
                if (event.deltaY > 0) {
                    // rotate counter clockwise
                    
                }else{
                    // rotate clockwise
                    host.querySelector('')
                }
                
            })
        })
 
    }
}

export { BigNoteApp }

window.BigNoteApp = new BigNoteApp()