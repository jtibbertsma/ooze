$(function () {
  var working = false;
  
  var doInsert = function () {
    if (working) { return; }
    working = true;

    var $mainDiv = $(".color-explosion"),

        tilesPerRow = Math.floor($(document).width() / 10),
        leftoverWidth = $(document).width() - (tilesPerRow * 10),

        numRows = Math.floor($(document).height() / 10),
        leftoverHeight = $(document).height() - (tilesPerRow * 10),
        $row, i, j;
    

    $mainDiv.empty();

    window.EXPLOSION_ROWS = numRows;
    window.EXPLOSION_COLS = tilesPerRow;

    // TODO: refactor?
    for (i = 0; i < numRows; ++i) {
      $row = $("<div>").addClass("explosion-row");

      for (j = 0; j < tilesPerRow; ++j) {
        $row.append(
          $("<div>")
            .addClass("explosion-tile")
            .data("pos", [i, j])
        );
      }

      if (leftoverWidth > 0) {
        $row.append(
          $("<div>")
            .addClass("explosion-tile")
            .css("width", '' + leftoverWidth + 'px')
            .data("pos", [i, tilesPerRow])
        )
      }

      $mainDiv.append($row);
    }

    if (leftoverHeight > 0) {
      $row = $("<div>").addClass("explosion-row");
      for (i = 0; i < tilesPerRow; ++i) {
        $row.append(
          $("<div>")
            .addClass("explosion-row")
            .css("height", '' + leftoverHeight + 'px')
            .data("pos", [numRows, i])
        )
        window.EXPLOSION_ROWS += 1;
      }
      if (leftoverWidth > 0) {
        $row.append(
          $("<div>")
            .addClass("explosion-tile")
            .css("height", '' + leftoverHeight + 'px')
            .css("width", '' + leftoverWidth + 'px')
            .data("pos", [numRows, tilesPerRow])
        )
        // XXX: Won't be set properly if vertical pixels % 10 is 0
        window.EXPLOSION_COLS += 1;
      }
      $mainDiv.append($row);
    }

    working = false;
  };

  doInsert();

  // uncomment and all your resources are belong to us if window is resized
  // I don't know why this doesn't work properly
  //$(window).on('resize', doInsert);
})