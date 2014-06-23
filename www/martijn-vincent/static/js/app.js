(function () {
	'use strict';
	// swag
	var exercise = null;

    var sensors = {
        accelerometer: null
    };

    var localStorage = {
        setExercises: function() {
            if ('localStorage' in window && window['localStorage'] !== null) {
                try {
                    for( var i = 0; i<localStorage.length; i++){
                        var retrievedObject = JSON.parse(localStorage.getItem('oefening'+i));
                        $("#container_oefeningen").append('<a href="#" name=""><div class="container_item"><img src="img/'+retrievedObject.url+'" /><h1>'+retrievedObject.name+'</h1></div></a>');
                    }
                } catch (e) {
                    console.log(e);
                }
            } else {
                console.log('heb ik niet');
            }
        }, addExersice: function() {
            try {
                for( var i = 0; i<localStorage.length; i++){
                    console.log(i);
                }
                var oefeningObject = "oefening" + localStorage.length;
                console.log(oefeningObject);
                oefeningObject = { 'name': 'Squats', 'url': "squats.jpg" };
                localStorage.setItem("oefening" + i, JSON.stringify(oefeningObject));
            } catch (e) {
                console.log(e);
            }
        }, cleanLocalstorage: function() {
            localStorage.clear();
        }
    };

	var controller = {
		init: function () {
            sensors.accelerometer = new Accelerometer();
            exercise = new Exercise(sensors.accelerometer);

            controller.clickEvents();
			navigator.splashscreen.hide();
		}, update: function() {

			setInterval(function() {
				if(sensors.accelerometer.breakpoint) {


					sensors.accelerometer.breakpoint = false;
				}
			}, 500);
        }, clickEvents: function() {
        	$('.btn_start').click(function(){
			   	$('.btn_start').toggle();
				$('.btn_stop').toggle();

				exercise.startRecord();
			});

			$('.btn_stop').click(function(){
			   	$('.btn_start').toggle();
				$('.btn_stop').toggle();

				exercise.saveRecord();

			});

        }
	};

	document.addEventListener("deviceready", controller.init, false);
})();
