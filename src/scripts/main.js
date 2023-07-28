Number.prototype.fillZero = function(width){
	let n = String(this);//문자열 변환
	return n.length >= width ? n:new Array(width-n.length+1).join('0') + n;//남는 길이만큼 0으로 채움
}

var ytAPIReady = false;
function onYouTubeIframeAPIReady() {
	ytAPIReady = true;
}

document.addEventListener("DOMContentLoaded", () => {
	const countDownTimer = function (id, date) {
		var _vDate = new Date(date); // 전달 받은 일자
		var _second = 1000;
		var _minute = _second * 60;
		var _hour = _minute * 60;
		var _day = _hour * 24;
		var timer;

		var text = document.querySelector("." + id);
		function showRemaining() {
			var now = new Date();
			var distDt = _vDate - now;

			if (distDt <= 0) {
				text.textContent = 'WYSI!'
				text.id = 'counter-done'
				setTimeout(loadYT, 0)
				return
			}

			var days = Math.floor(distDt / _day);
			var hours = Math.floor((distDt % _day) / _hour);
			var minutes = Math.floor((distDt % _hour) / _minute);
			var seconds = Math.floor((distDt % _minute) / _second);

			text.textContent = ''
			//document.getElementById(id).textContent = date.toLocaleString() + "까지 : ";
			if (days > 0) text.textContent = days.fillZero(2) + '일 '
			if (hours > 0) text.textContent += hours.fillZero(2) + '시간 '
			if (minutes > 0) {
				text.textContent += minutes.fillZero(2) + '분 '
				text.textContent += seconds.fillZero(2) + '초'
			} else {
				text.textContent += seconds.fillZero(2)
			}

			requestAnimationFrame(showRemaining);
		}

		requestAnimationFrame(showRemaining);
	}

	var videoContainer = document.getElementById('video')
	function loadYT() {
		console.log("Trying to load YouTube...")
		
		if (ytAPIReady) {
			console.log("YT Ready!")

			var player = new YT.Player('youtube-player', {
				width: '1280', height: '720',
				videoId: 'WyV86lBNSes',
				events: {
				  'onReady': onPlayerReady,
				  'onStateChange': onPlayerStateChange
				}
		  	});

			function playVideo(event) {
				event.target.playVideo();
				setTimeout(() => {
					console.log(event)
					if (event.data != YT.PlayerState.PLAYING) {
						console.log("RECALL VIDEO")
						setTimeout(playVideo, 0, event);
					}
				}, 1000);
			}

			function onPlayerReady(event) {
				event.target.setVolume(50)
				event.target.playVideo()
				setTimeout(() => {
					if (event.data != YT.PlayerState.PLAYING) {
						setTimeout(playVideo, 0, event);
					}
				}, 1000);
			}

			var done = false;
			function onPlayerStateChange(event) {
				if (event.data == YT.PlayerState.PLAYING && !done) {
					setTimeout(stopVideo, 200 * 1000);
					done = true;
				}
			}
			
			function stopVideo() {
				player.stopVideo()
			}
		} else {
			requestAnimationFrame(loadYT);
		}
	}

	function setupYouTube() {
		var tag = document.createElement('script');

    	tag.src = "https://www.youtube.com/iframe_api";
    	var firstScriptTag = document.getElementsByTagName('script')[0];
    	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}

	setupYouTube();

	var dateObj = new Date();
	dateObj.setDate(dateObj.getDate() + 1);

	countDownTimer('counter', '07/27/2024 07:27:27 PM');
})
