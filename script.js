const dateStart = document.querySelector('#start-date')
const dateEnd = document.querySelector('#end-date')
const out = document.querySelector('#out')


// официальные праздничные дни и перенесенные при совпадении праздничных и рабочих
const holidays = [
	Date.parse('2021-10-14'),
	Date.parse('2021-12-27'),
	Date.parse('2022-01-01'),
	Date.parse('2022-01-03'),
	Date.parse('2022-01-07'),
	Date.parse('2022-03-08'),
	Date.parse('2022-04-24'),
	Date.parse('2022-04-25'),
	Date.parse('2022-05-01'),
	Date.parse('2022-05-02'),
	Date.parse('2022-05-09'),
	Date.parse('2022-06-12'),
	Date.parse('2022-06-13'),
	Date.parse('2022-06-28'),
	Date.parse('2022-08-24'),
]

// каникулы
const vacation = [
	Date.parse('2021-10-25'),
	Date.parse('2021-10-26'),
	Date.parse('2021-10-27'),
	Date.parse('2021-10-28'),
	Date.parse('2021-10-29'),
	Date.parse('2021-12-28'),
	Date.parse('2021-12-29'),
	Date.parse('2021-12-30'),
	Date.parse('2021-12-31'),
	Date.parse('2022-01-03'),
	Date.parse('2022-01-04'),
	Date.parse('2022-01-05'),
	Date.parse('2022-01-06'),
	Date.parse('2022-03-28'),
	Date.parse('2022-03-29'),
	Date.parse('2022-03-30'),
	Date.parse('2022-03-31'),
	Date.parse('2022-04-01'),
]

// перенос рабочих дней по рекомендации правительства
const transferFrom1 = Date.parse('2021-10-15');
const transferTo1 = Date.parse('2021-10-23');

const transferFrom2 = Date.parse('2022-03-07');
const transferTo2 = Date.parse('2022-03-12');

const transferFrom3 = Date.parse('2022-06-27');
const transferTo3 = Date.parse('2022-07-02');


document.querySelector('.first').onclick = function() {
	dateStart.value = '2021-09-01';
	dateEnd.value = '2021-12-31';
}

document.querySelector('.second').onclick = function() {
	dateStart.value = '2022-01-01';
	dateEnd.value = '2022-05-27';
}


document.querySelector('form').addEventListener('submit', (event) => {
	event.preventDefault();
	out.innerHTML = '';

	const start = Date.parse(dateStart.value);
	const end = Date.parse(dateEnd.value);

	let daysWeek = [];
	let checks = document.getElementsByName('day');

	for (let i = 0; i < checks.length; i++) {
		if (checks[i].checked) {
			daysWeek.push(+checks[i].value);
		}
		
	}

	for (let i = start; i <= end; i=i+24*60*60*1000) {

		date = new Date(i);
		if (daysWeek.includes(date.getDay()) && !holidays.includes(i) && !vacation.includes(i)) {

			if (i == transferFrom1) {
				date = new Date(transferTo1);
			} else if (i == transferFrom2) {
        date = new Date(transferTo2);
      } else if (i == transferFrom3) {
        date = new Date(transferTo3);
      }

			// преобразование даты к виду ДД.ММ.ГГГГ
			let day = date.getDate();
			if (day < 10) {
				day = '0' + day;
			}
			let month = date.getMonth() + 1;
			if (month < 10) {
				month = '0' + month;
			}
			let year = date.getFullYear();

			out.innerHTML += day + '.' + month + '.' + year + '<br>';
		}
	}

});



