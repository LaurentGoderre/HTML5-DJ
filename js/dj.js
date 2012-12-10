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
			table1.audio.volume = table1.volume * ((this.crossfade < 0) ? 1 : 1 - this.crossfade);
			table2.audio.volume = table2.volume * ((this.crossfade > 0) ? 1 : 1 - this.Math.abs(crossfade));
		}
	}
	
window.URL = window.URL || window.webkitURL;

$(document).ready(function () {
	table1.ui = $('#table-1');
	table2.ui = $('#table-2');
	
	get_table = function (id) {console.log(id.substr(0,6));
		switch (id.substr(0,6)){
			case 'table1':
				return table1;
			case 'table2':
				return table2;
		}
	}
	
	$('#crossfade').on('change', function () {
		mixer.crossfade = this.value;
		mixer.update_volumes();
	})
	
	$('.table-file').on('change', function () {
		var table = get_table(this.id), 
			url = window.URL.createObjectURL(this.files[0]);
		table.audio = new Audio(url);
	});
	
	$('.table-play').on('click', function () {
		var table = get_table(this.id);
		if (table.audio.paused === true) {
			table.audio.play();
		} else {
			table.audio.pause();
		}
	});
	
	$('.table-tempo').on('change', function () {
		var table = get_table(this.id);
		table.tempo = this.value;
		table.audio.playbackRate = table.tempo;
	});
	
	$('.table-volume').on('change', function () {
		var table = get_table(this.id);
		table.volume = this.value;
		mixer.update_volumes();
	});
});