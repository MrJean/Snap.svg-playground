/**
 * Thermometer
 */

function Thermometer(options) {

    var svg, temperatureBar = undefined;
    var maxTemperature = 30;

    function drawThermometer() {
        svg = Snap(ops.element);
        svg.attr({ viewBox: "0 0 100 100" });
        svg.path("M43,30 A6,6 45 1,1 55,30 L55,50 A12,12 0 1,1 43,50 L43,30 z").attr({
            stroke: ops.fill,
            strokeWidth: 2,
            fill: 'none'
        });
        svg.circle(49, 61, 5).attr({
            fill: ops.innerFill
        });
        temperatureBar = svg.rect(47, 56, 4, 7, 2).attr({
            fill: ops.innerFill
        });
    }

    function animateThermometer() {
        if (ops.temperature > maxTemperature) {
            ops.temperature = maxTemperature;
        }

        temperatureBar.animate({
            y: 27 + (maxTemperature - ops.temperature),
            height: 36 - (maxTemperature - ops.temperature)
        }, ops.speed);
    }

    function extend(a, b){
        for(var key in b)
            if(b.hasOwnProperty(key))
                a[key] = b[key];
        return a;
    }

    var ops = {
        element: '#thermometer',
        fill: '#000',
        innerFill: '#f00',
        speed: 1000,
        temperature: 20
    };
    
    extend(ops, options);
    drawThermometer();
    animateThermometer();

    return {
        setTemperature : function(temperature) {
            ops.temperature = temperature;
            animateThermometer()
        }
    }
};