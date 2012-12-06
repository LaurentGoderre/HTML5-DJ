var table_default = {
		volume: 1,
		tempo: 1,
		audio: null,
		ui: null
	},
	table1 = $.extend({}, table_default),
	table2 = $.extend({}, table_default),
	mixer = {
		crossfade:0,
		update_volumes: function () {
			table1.audio.volume = table1.volume * ((mixer.crossfade < 0) ? 1 : 1 - mixer.crossfade);
			table2.audio.volume = table2.volume * ((mixer.crossfade > 0) ? 1 : 1 - Math.abs(mixer.crossfade));
		}
	}

$(document).ready(function () {
	table1.ui = $('#table-1');
	table2.ui = $('#table-2');
	
	table1.audio = new Audio('1.ogg');
	table2.audio = new Audio('2.ogg');
	
	$('#crossfade').on('change', function () {
		mixer.crossfade = this.value;
		mixer.update_volumes();
	})
	
	$('.table-play').on('click', function () {
		switch (this.id) {
			case 'table1-play':
				if (table1.audio.paused === true) {
					table1.audio.play();
				} else {
					table1.audio.pause();
				}
				break;
			case 'table2-play':
				if (table2.audio.paused === true) {
					table2.audio.play();
				} else {
					table2.audio.pause();
				}
				break;
		}
	});
	
	$('.table-tempo').on('change', function () {
		switch (this.id) {
			case 'table1-tempo':
				table1.tempo = this.value;
				table1.audio.playbackRate = table1.tempo;
				break;
			case 'table2-tempo':
				table2.tempo = this.value;
				table2.audio.playbackRate = table2.tempo;
				break;
		}
	});
	
	$('.table-volume').on('change', function () {
		switch (this.id) {
			case 'table1-volume':
				table1.volume = this.value;
				break;
			case 'table2-volume':
				table2.volume = this.value;
				break;
		}
		mixer.update_volumes();
	});
});