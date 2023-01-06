export function unvisible(el, index, items, className, count = 0) {
    if(!el.classList.contains(className)) {
        for( let j = 0; j < count; j++ ) {
            items[index * count + j].classList.add(className);
        }
    }
}

export function visible(el, index, items, className, count) {
    if(el.classList.contains(className)) {
        
        for( let j = 0; j < count; j++ ) {
            items[index * count + j].classList.remove(className);
        }
    }
}
