import { hoverStudentItem } from './hover-item.js';
import { sortItems } from './sort-items.js';
import { searchItems } from './search-items.js';

/* eslint-disable import/prefer-default-export */
function createTableStudents() {
  const listStudents = document.querySelector('.table-students__list');
  let studentsDOM = fetch('db.json')
    .then((response) => response.json())
    .then((data) => {
      const arrayStudentsList = [{ 'ФИО студента': ['surname', 'name', 'patronymic'] }, { 'Курс': 'faculty' }, { 'Дата рождения и возраст': 'birth' }, { 'Годы обучения': 'study' }];
      const arrayFilters = [{ name: 'ФИО', type: 'text', data: 'name' }, { name: 'Курс', type: 'text', data: 'faculty' }, { name: 'Год начала обучения', type: 'number', data: 'begin', minValue: '2000' }, { name: 'Год окончания обучения', type: 'number', data: 'end', minValue: '2000' }];
      const formFieldset = document.querySelector('.table-students__fielset');
      arrayFilters.forEach((el, i) => {
        const label = document.createElement('label');
        label.classList.add('table-students__label');
        label.textContent = el.name;
        formFieldset.appendChild(label);
        const filter = document.createElement('input');
        // filter.setAttribute('name', 'name');
        filter.setAttribute('placeholder', 'Поле ввода...');
        filter.classList.add('table-students__input');
        filter.setAttribute('type', el.type);
        // eslint-disable-next-line eqeqeq
        if (el.type == 'number') {
          filter.setAttribute('min', el.minValue);
          filter.setAttribute('step', '1');
        }
        filter.dataset.item = el.data;
        label.appendChild(filter);
      });
      arrayStudentsList.forEach((el) => {
        const title = document.createElement('li');
        title.classList.add('students__title');
        title.classList.add('student__item');
        const keyArrayStudents = Object.keys(el)[0];
        title.textContent = keyArrayStudents;
        if (Array.isArray(el[keyArrayStudents])) {
          title.dataset.item = 'name';
        } else {
          title.dataset.item = el[keyArrayStudents];
        }
        listStudents.appendChild(title);
      });
      data.forEach((elData) => {
        arrayStudentsList.forEach((elName) => {
          let arrayData = '';
          const propertyEl = Object.values(elName)[0];
          const keyEl = Object.keys(elName)[0];
          if (Array.isArray(propertyEl)) {
            propertyEl.forEach((prop) => {
              arrayData += `${elData[prop]} `;
            });
          } else {
            arrayData += elData[propertyEl];
            const dateNow = new Date();
            if (keyEl === 'Дата рождения и возраст') {
              const stringDateBirthdayStudent = elData[propertyEl].split('.');
              // eslint-disable-next-line max-len
              const dateBirthdayStudent = new Date(stringDateBirthdayStudent[2], stringDateBirthdayStudent[1], stringDateBirthdayStudent[0]);
              let yearStudent = dateNow.getFullYear() - dateBirthdayStudent.getFullYear();
              if (dateNow.getMonth() - dateBirthdayStudent.getMonth() <= 0) {
                // eslint-disable-next-line max-len
                if (dateNow.getMonth() == dateBirthdayStudent.getMonth() && dateNow.getDate() >= dateBirthdayStudent.getDate()) {} else {
                  yearStudent--;
                }
              }
              let yearWord = '';
              switch (yearStudent % 10) {
                case 1:
                  yearWord = 'год';
                  break;
                case 2:
                  yearWord = 'года';
                  break;
                case 3:
                  yearWord = 'года';
                  break;
                case 4:
                  yearWord = 'года';
                  break;
                default:
                  yearWord = 'лет';
              }
              arrayData += ` (${yearStudent} ${yearWord})`;
            }
            if (keyEl === 'Годы обучения') {
              const stringDateStudyStudent = Number(elData[propertyEl]);
              let studyStudent = dateNow.getFullYear() - stringDateStudyStudent;
              if (studyStudent <= 4) {
                if (dateNow.getMonth() < 8) {
                  arrayData += `-${stringDateStudyStudent + 4} (${studyStudent} курс)`;
                } else if (studyStudent == 4) {
                  arrayData += `-${stringDateStudyStudent + 4} (закончил)`;
                } else {
                  arrayData += `-${stringDateStudyStudent + 4} (${++studyStudent} курс)`;
                }
              } else {
                arrayData += `-${stringDateStudyStudent + 4} (закончил)`;
              }
            }
          }
          const itemList = document.createElement('li');
          itemList.classList.add('student__info');
          itemList.classList.add('student__item');
          let classListItem = '';
          switch (keyEl) {
            case 'ФИО студента':
              classListItem = 'name';
              break;
            case 'Курс':
              classListItem = 'faculty';
              break;
            case 'Дата рождения и возраст':
              classListItem = 'birth';
              break;
            case 'Годы обучения':
              classListItem = 'study';
              break;
            default:
              classListItem = '';
          }
          itemList.classList.add(classListItem);
          itemList.textContent = arrayData;
          listStudents.appendChild(itemList);
        });
      });
      // hover effects
      hoverStudentItem(document.querySelectorAll('.student__info:not(.name)'), 'name');

      // sort items class
      const list = document.querySelector('.table-students__list');
      const titleTable = list.querySelectorAll('.students__title');
      titleTable.forEach((el) => {
        el.addEventListener('click', (el) => {
          sortItems(list, el);
        });
      })
      
      // search items
      let searchInputs = document.querySelectorAll('.table-students__input');
      searchInputs.forEach((el) => {
        el.addEventListener('input', () => {
          let items = list.querySelectorAll('.student__info');
          let firstFilter = 0;
          searchInputs.forEach((filter) => {
            if( firstFilter == 0 ) {
              searchItems(filter, items, firstFilter);
              firstFilter++;
            } else {
              items = list.querySelectorAll('.student__info:not(.unvisible)');
              searchItems(filter, items, firstFilter);
            } 
          })
        })
      })
    });   
}
createTableStudents();
