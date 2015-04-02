/**
 * Beaufort
 */

function Beaufort(options) {

    var svg, flag = undefined;
    var flagAnimationSpeed = ['r0', 'r10', 'r20'];

    function drawWindmeter() {
        var windmeter = Snap(ops.element);
        windmeter.attr({ viewBox: "0 0 100 100" });
        var pole = windmeter.rect(30, 25, 2, 50).attr({
            fill: ops.fill
        });
        var flagPart1 = windmeter.rect(35, 19, 3, 15).attr();
        var flagPart2 = windmeter.path("M45,20 L55,21 L55,32 L45,33 z");
        var flagPart3 = windmeter.rect(63, 22, 3, 9);
        var flagTop = windmeter.line(35, 19, 66, 22).attr({
            strokeWidth: '1'
        });
        var flagBottom = windmeter.line(35, 34, 66, 31).attr({
            strokeWidth: '1'
        });
        flag = windmeter.g(flagPart1, flagPart2, flagPart3, flagTop, flagBottom);
        flag.attr({
            stroke: ops.flagFill,
            fill: ops.flagFill
        });
        animateFlag();
    }

    function animateFlag() {
        flag.stop().animate(
            {
                transform: flagAnimationSpeed[ops.beaufort] + ', 35, 18'
            },
            ops.speed
        );
    }

    function extend(a, b){
        for(var key in b)
            if(b.hasOwnProperty(key))
                a[key] = b[key];
        return a;
    }

    var ops = {
        element: '#windmeter',
        fill: '#000',
        flagFill: '#f00',
        speed: 1000,
        beaufort: 0
    };
    
    extend(ops, options);
    drawWindmeter();

    return {
        setBeaufort : function(beaufort) {
            if (beaufort > 2) {
                beaufort = 2;
            }
            ops.beaufort = beaufort
            animateFlag();
        }
    }
};