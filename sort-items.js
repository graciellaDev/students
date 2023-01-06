export function sortItems(list, item) {
    const elClasses = item.target.classList;
    const itemsAll = list.querySelectorAll('.student__info');
    const studentsTitle = list.querySelectorAll('.students__title');
    const countItemsTitle = studentsTitle.length;
    
    if ( !elClasses.contains('students__title_sort-up') && !elClasses.contains('students__title_sort-down') ) {
        let activeFilterUp = list.querySelector('.students__title_sort-up');
        let activeFilterDown = list.querySelector('.students__title_sort-down');
        ( activeFilterUp != null ) ? activeFilterUp.classList.remove('students__title_sort-up') : '';
        ( activeFilterDown != null )  ? activeFilterDown.classList.remove('students__title_sort-down') : '';
        item.target.classList.add('students__title_sort-up');
    } else {
      item.target.classList.toggle('students__title_sort-up');
      item.target.classList.toggle('students__title_sort-down');
    }

    const targetDataItem = item.target.dataset.item;
    const targetInfo = list.querySelectorAll(`.${targetDataItem}`);
    let itemNumber = 0;
    
    studentsTitle.forEach((el, i) => {
        if( el.dataset.item == targetDataItem ) {
            itemNumber = i;
            return el;
        }
    })
    
    let arrayItems = [];

    targetInfo.forEach((el, i) => {
        arrayItems.push({key: i, item: el});
    });
    arrayItems.sort((firstItem, secondItem) => {
        let first = firstItem.item.textContent;
        let second = secondItem.item.textContent;
        let firstValue;
        let secondValue;
        if( targetDataItem == 'birth' ) {
            firstValue = first.split(' (')[0].split('.').reverse().join('');
            secondValue = second.split(' (')[0].split('.').reverse().join('');
        } else {
            firstValue = first;
            secondValue = second;
        }
        if( (!elClasses.contains('students__title_sort-down')) ) {
            
            if( firstValue > secondValue ) {
                return 1;
            } else {
                return -1;
            }
        } else {
            if( firstValue < secondValue ) {
                return 1;
            } else {
                return -1;
            }
        }
        return 0;
    });
    itemsAll.forEach((item) => {
        list.removeChild(item);
    });
    arrayItems.forEach((item) => {
        for( let j = 0; j < countItemsTitle; j++ ) {
            list.appendChild(itemsAll[(item['key']) * countItemsTitle + j]);
        }
    })
}