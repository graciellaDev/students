let btnAdd = document.querySelector('.add');
let popupFormAdd = document.querySelector('.popup-add');

btnAdd.addEventListener('click', () => {
    popupFormAdd.classList.toggle('hidden');
});
popupFormAdd.addEventListener('click', (event) => {
    (event.target.classList.contains('popup-add')) ? popupFormAdd.classList.toggle('hidden') : '';
});

let formAdd = popupFormAdd.querySelector('.popup-add__form');
let btnAddSubmit = formAdd.querySelector('.popup-add__btn');
let success = popupFormAdd.querySelector('.popup-add__success');

function addErrorValid(el, parentEl, textError) {
    let error = document.createElement('div');
    error.classList.add('error');
    error.textContent = textError;
    parentEl.appendChild(error);
    el.value = '';
}
btnAddSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    let inputs = popupFormAdd.querySelectorAll('input');
    let allValidate = 0;
    let countInputs = inputs.length;

    inputs.forEach((el) => {
        let valueInput = el.value;
        let parentLabel = el.parentNode;
        
        if( valueInput.trim() == '' ) {
            if( parentLabel.querySelector('.error') == null ) {
                addErrorValid(el, parentLabel, 'Обязательное поле');
            } 
        } else {
            let today = new Date();
            let year = today.getFullYear();
            let month = today.getMonth() + 1;
            let day = today.getDay() + 1;
            let monthString = ( month < 10 ) ? `0${month}` : `${month}`;
            let dayString = ( day < 10 ) ? `0${day}` : `${day}`;
            let dateNow = Number(`${year}${monthString}${dayString}`);
            
            switch(el.getAttribute('type')) {
                case 'text':
                    el.value = valueInput.trim();
                    ++allValidate;
                    break;
                case 'date':
                    let dateUser = Number(valueInput.split('-').join(''));
                    
                    if( dateUser < 19000101 ||  dateUser > dateNow) {
                        if( parentLabel.querySelector('.error') == null ) {
                            addErrorValid(el, parentLabel, `Дата от 01.01.1900 до ${dayString}.${monthString}.${year}`);
                        } else {
                            parentLabel.querySelector('.error').textContent = `Дата от 01.01.1900 до ${dayString}.${monthString}.${year}`;
                        }
                    } else {
                        ++allValidate;
                    };
                    break;
                case 'number':
                    if( Number(valueInput) >= 2000 &&  Number(valueInput) <= year) {
                        ++allValidate;
                    } else {
                        if( parentLabel.querySelector('.error') == null ) {
                            addErrorValid(el, parentLabel, `От 2000 до ${year}`);
                        } else {
                            parentLabel.querySelector('.error').textContent = `От 2000 до ${year}`;
                        }
                    };
                    break;
                default:
                    ++allValidate;
            }
            // ++allValidate;
        }

        el.addEventListener('input', () => {
            inputs.forEach((el) => {
                let parentLabel = el.parentNode;
                let errorActive = parentLabel.querySelector('.error');
                if( errorActive != null ) {
                    parentLabel.removeChild(errorActive);
                }
            })
        })
    })
    console.log(allValidate);
    if( allValidate == countInputs ) {
        let addStudenteReq = fetch('add-student.php', {
            method: 'POST',
            body: new FormData(formAdd)
        })
        .then((response) => response.text())
        .then((data) => {
            if( data == 'true' ) {
                formAdd.classList.add('hidden');
                success.classList.remove('hidden');
                setTimeout(() => {
                    location.reload();
                }, 2000)
            }
        });
    } else {
        console.log('false validate');
    }
    
})


