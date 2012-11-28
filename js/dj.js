var table_default = {
		volume: 1,
		tempo: 1,
		audio: null,
		ui: null
	},
	table1 = $.extend({}, table_default),
	table2 = $.extend({}, table_default),
	mixer = {
		get_crossfade_volume: function(value, volume_table1, volulme_table2){
			var t1,t2;

			t1 = volume_table1 * ((value < 0) ? 1 : 1 - value);
			t2 = volulme_table2 * ((value > 0) ? 1 : 1 - Math.abs(value));

			return [t1,t2];
		}
	}

$(document).ready(function(){
	table1.ui = $('#table-1');
	table2.ui = $('#table-2');
	
	table1.audio = new Audio('1.ogg');
	table2.audio = new Audio('2.ogg');
	
	$('#crossfade').on('change', function(){
		var v = mixer.get_crossfade_volume(this.value, table1.volume, table2.volume);
		table1.audio.volume = v[0];
		table2.audio.volume = v[1];
	})
	
	$('.table-play').on('click', function(){
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
	
	$('.table-tempo').on('change', function(){console.log(this.value);
		switch (this.id) {
			case 'table1-tempo':
				table1.tempo = this.value;
				table1.audio.playbackRate = table1.tempo;
				break;
			case 'table-2-tempo':
				table2.tempo = this.value;
				table2.audio.playbackRate = table2.tempo;
				break;
		}
	});
});