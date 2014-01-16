$(document).ready(function() {

    var gridSize = $('tr').length;
    function resizeAll() {
        var swidth = $(window).width();
        var sheight = $(window).height();

        var biggest = Math.min(swidth, sheight);

        $('#board').css({width:biggest+'px', height:biggest+'px'});
        var gridSize = $('tr').length;
        var iwidth = (biggest + gridSize-1) / gridSize;
        $('.stamp,td').css({width:iwidth+'px', height:iwidth+'px'});
    }

    var offset = 0;
    $('td').each(function(i, element) {
        $(element).append("<img src='/images/stamp1.png' class='stamp'/>");

        var term;

        if ($(element).hasClass('free')) {
            term = "FREE";
            offset = 1;
        }
        else {
            term = terms[i - offset];
        }

        $(element).append('<p class="term">' + term + '</p>');

    });

    $('td').click(function(evt) {
        selectTerm($(evt.target).attr('id'));
        evt.preventDefault();
        evt.stopPropagation();
    });

    $('.term').click(function(evt) {
        selectTerm($(evt.target).parent().attr('id'));
        evt.preventDefault();
        evt.stopPropagation();
    });

    resizeAll();
    $(window).resize(resizeAll);


/////////

function selectTerm(cellId) {
    var $cell = $('#'+cellId);
    $cell.find('.stamp').css('visibility', 'visible');
    $cell.addClass('selected');
    $cell.unbind('click');

    var snd = new Audio('/sounds/done.wav');
    snd.play();

    if (checkForBingo()) {
        $(".winner").fadeIn(250);
    }

}

function checkForBingo() {
    var selectedCount = 0;
    var bingo = false;

    // Check rows
    $('tr').each(function(i, element) {
        selectedCount = 0;
        $(element).find('td').each(function(col, td) {
            if ($(td).hasClass('selected')) {
                selectedCount++;
            }

            if (selectedCount === gridSize) {
                bingo = true;
                return;
            }
        });
    });

    if (bingo) return true;

    // Check columns
    var curCol = 0;
    for (var col=0; col < gridSize; col++) {
        selectedCount = 0;

        for (var row=0; row < gridSize; row++) {
            var cellId = "#cell"+((col*gridSize)+row);

            if ($(cellId).hasClass('selected')) {
                selectedCount++;
            }

            if (selectedCount === gridSize) {
                bingo = true;
                break;
            }
        }
    }

    if (bingo) return true;

    // Check top to bottom diagonal.
    bingo = true;
    for (var col=0; col<gridSize; col++) {
        var cellId = '#cell' + parseInt(col*(gridSize+1), 10);

        if (!$(cellId).hasClass('selected')) {
            bingo = false;
            break;
        }
    }

    if (bingo) return true;

    // Check bottom to top diagonal.
    bingo = true;
    for (var col=0; col<gridSize; col++) {
        var cellId = '#cell' + parseInt((col+1) * (gridSize-1), 10);

        if (!$(cellId).hasClass('selected')) {
            bingo = false;
            break;
        }
    }

    return bingo;
}





});

