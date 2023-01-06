import * as visible from "./visible.js";

export function searchItems(element, items, indicator) {
    if(items != null) {
        let list = document.querySelector('.table-students__list');
        let dataEl = element.dataset.item;
        let valueEl = element.value;
        let titleCount = list.querySelectorAll('.students__title').length;
    
        if( dataEl == 'name' || dataEl == 'faculty' ) {
            let searchItems = (indicator == 0) ? list.querySelectorAll(`.${dataEl}`) : list.querySelectorAll(`.${dataEl}:not(.unvisible)`);
            
            searchItems.forEach((el, i) => {
                let textEl = el.textContent;
                if( textEl.substr(0, valueEl.length).toUpperCase() === valueEl.toUpperCase() ) {
                    visible.visible(el, i, items, 'unvisible', titleCount);
                } else {
                    visible.unvisible(el, i, items, 'unvisible', titleCount);
                } 
            });
        }
        let datesStudy = (indicator == 0) ? list.querySelectorAll('.study') : list.querySelectorAll('.study:not(.unvisible)');
    
        if( dataEl == 'begin' || dataEl == 'end' ) {
            if( valueEl.length == 4 ) { 
                datesStudy.forEach((el, i) => {
                    let dataIn = (dataEl == 'begin') ? el.textContent.split(' (')[0].split('-')[0] : ((dataEl == 'end') ?  el.textContent.split(' (')[0].split('-')[1] : '');
    
                    if( dataIn === valueEl ) {
                        visible.visible(el, i, items, 'unvisible', titleCount);
                    } else {
                        visible.unvisible(el, i, items, 'unvisible', titleCount);
                    }
                })
            } else {
                datesStudy.forEach((el, i) => {
                    visible.visible(el, i, items, 'unvisible', titleCount);
                })
            }
        }
    } 
}