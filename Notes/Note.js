import { List } from './List.js'

class Note {
    constructor() {
        this.element = document.createElement('div')
        this.element.classList.add('w3-border', 'w3-padding')
        // setting up a 3x3 grid to host the note lists
        // we leave four cells unoccoupied for easier handling
        // we keep top, right, bottom, left, center as our areas
        // note the use of >>>template strings<<< to write the new html in one go
        this.element.innerHTML = `<div class="w3-row">
                                    <div class="w3-third w3-container"></div>
                                    <div class="w3-third w3-container" id="top">
                                        <h1>top</h1>
                                    </div>
                                    <div class="w3-third w3-container"></div>
                                  </div>
                                  <div class="w3-row">
                                    <div class="w3-third w3-container" id="left">
                                        <h1>left</h1>
                                    </div>
                                    <div class="w3-third w3-container" id="center">
                                        <h1>center</h1>
                                    </div>
                                    <div class="w3-third w3-container" id="right">
                                        <h1>right</h1>
                                    </div>
                                  </div>
                                  <div class="w3-row">
                                    <div class="w3-third w3-container"></div>
                                    <div class="w3-third w3-container" id="bottom">
                                        <h1>bottom</h1>
                                    </div>
                                    <div class="w3-third w3-container"></div>
                                  </div>`
        // saving the areas for easy access
        this.top = {
            element : this.element.querySelector('#top'),
            list : new List('top')
        }
        this.right = {
            element : this.element.querySelector('#right'),
            list : new List('right')
        }
        this.bottom = {
            element : this.element.querySelector('#bottom'),
            list : new List('bottom')
        }
        this.left = {
            element : this.element.querySelector('#left'),
            list : new List('left')
        }
        this.center = {
            element : this.element.querySelector('#center'),
            list : new List('center')
        }
        // attach event handler to areas
        this.top.element.addEventListener('wheel', this.areaWheel.bind(this))
        this.right.element.addEventListener('wheel', this.areaWheel.bind(this))
        this.bottom.element.addEventListener('wheel', this.areaWheel.bind(this))
        this.left.element.addEventListener('wheel', this.areaWheel.bind(this))
        this.center.element.addEventListener('wheel', this.areaWheel.bind(this))
        // adding the lists into the areas
        this.top.element.append(this.top.list.element)
        this.right.element.append(this.right.list.element)
        this.bottom.element.append(this.bottom.list.element)
        this.left.element.append(this.left.list.element)
        this.center.element.append(this.center.list.element)
        // saving a ordered list of our areas
        // this list is used for the rotating process
        this.order = ['top', 'right', 'bottom', 'left', 'center']
    }
    areaWheel(event) {
        // find the start area of our shifting process
        const [start] = event.path.filter(element => {
            if(element.classList) {
                if(element.classList.contains('w3-third') && element.classList.contains('w3-container')) {
                    return true
                }
            }
            return false
        })
        if(event.deltaY > 0) {
            // rotate clockwise
            // pop the last element of the current list and prepend that item to the next cw area list
            // set the current list to the next cw area list
            // repeat until reached start agian
            this.rotateCW(start)
            console.log('cw', start.id)
        }else{
            // rotate counter clockwise
            console.log('ccw', start.id)
        }
    }
    rotateCW(start) {
        const startIndex = this.order.indexOf(start.id)
        const startList = this[start.id].list
        // find the prev and next list in order
        let prev, next
        if(startIndex === 0) {
            prev = this.order[this.order.length - 1]
            next = this.order[startIndex + 1]
        }else if(startIndex === this.order.length - 1) {
            next = this.order[0]
            prev = this.order[startIndex - 1]
        }else{
            prev = this.order[startIndex - 1]
            next = this.order[startIndex + 1]
        }
        prev = this[prev].list
        next = this[next].list
        // rotate
        let last = next.shiftDown(startList.last)
        
        console.log(last)
    }
    rotateCCW(start) {}
}

export { Note }