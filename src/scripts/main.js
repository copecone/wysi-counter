Number.prototype.fillZero = function(width){
	let n = String(this);//문자열 변환
	return n.length >= width ? n:new Array(width-n.length+1).join('0') + n;//남는 길이만큼 0으로 채움
}

document.addEventListener("DOMContentLoaded", () => {
	const countDownTimer = function (id, date) {
		var _vDate = new Date(date); // 전달 받은 일자
		var _second = 1000;
		var _minute = _second * 60;
		var _hour = _minute * 60;
		var _day = _hour * 24;
		var timer;

		var text = document.getElementById(id);
		function showRemaining() {
			var now = new Date();
			var distDt = _vDate - now;

			if (distDt <= 0) {
				text.textContent = '와! 생일!';
				return;
			}

			var days = Math.floor(distDt / _day);
			var hours = Math.floor((distDt % _day) / _hour);
			var minutes = Math.floor((distDt % _hour) / _minute);
			var seconds = Math.floor((distDt % _minute) / _second);

			text.textContent = ''
			//document.getElementById(id).textContent = date.toLocaleString() + "까지 : ";
			if (days > 0) text.textContent = days.fillZero(2) + '일 '
			if (hours > 0) text.textContent += hours.fillZero(2) + '시간 '
			text.textContent += minutes.fillZero(2) + '분 '
			text.textContent += seconds.fillZero(2) + '초'

			requestAnimationFrame(showRemaining);
		}

		requestAnimationFrame(showRemaining);
	}

	var dateObj = new Date();
	dateObj.setDate(dateObj.getDate() + 1);

	countDownTimer('counter', '07/27/2023 07:27:27 PM');
})