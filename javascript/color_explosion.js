$(function () {
  $.ExplosionTile = function (tile) {
    this.$tile = $(tile);
    this.pos = this.$tile.data("pos");

    this.$tile.data("explosion", this);

    this.$tile.on("mouseover", this.madTransitions.bind(this));
  };

  $.fn.colorExplosion = function () {
    return this.find(".explosion-tile").each(function () {
      new $.ExplosionTile(this);
    })
  };

  // var NEIGHBOR_DELTAS = [
  //             [-1, 0],

  //   [ 0, -1],          [ 0, 1],

  //             [ 1, 0]
  // ];

  var NEIGHBOR_DELTAS = [
    [-1, -1], [-1, 0], [-1, 1],

    [ 0, -1],          [ 0, 1],

    [ 1, -1], [-1, 0], [ 1, 1]
  ];

  // var NEIGHBOR_DELTAS = [
  //   [-1, -1],          [-1, 1],



  //   [ 1,  1],          [ 1, 1],
  // ];

  $.ExplosionTile.prototype.neighbors = function () {
    var thisPos = this.pos;

    return $(NEIGHBOR_DELTAS
      .map(function (delta) {
        return [thisPos[0] + delta[0], thisPos[1] + delta[1]];
      })
      .filter(function (pos) {
        var r = pos[0], c = pos[1];

        if (r < 0 || r > window.EXPLOSION_ROWS ||
            c < 0 || c > window.EXPLOSION_COLS) {
          return false;
        }

        return true;
      })
      .map(function (pos) {
        var r = pos[0], c = pos[1];

        return $(".color-explosion")
          .find(".explosion-row")
          .eq(r)
          .find(".explosion-tile")
          .eq(c)
          .data("explosion");
      })
    );
  };

  $.ExplosionTile.prototype.madTransitions = function () {
    // comment out lines with // !!!
    // to see something cool
    // but it eats up a lot of cpu

    if (this.transitioning) { return; } // !!!
    var that = this;                    // !!!
    var $tile = this.$tile;
    $tile.removeClass("explosion-red explosion-blue explosion-green " +
                      "explosion-yellow explosion-orange explosion-purple"
    );
    
    that.transitioning = true;          // !!!
    
    $tile.addClass("explosion-yellow");

    // TODO: refactor
    setTimeout(function () {
      $tile.removeClass("explosion-yellow");
      $tile.addClass("explosion-orange");

      setTimeout(function () {
        $tile.removeClass("explosion-orange")
        $tile.addClass("explosion-red");

        setTimeout(function () {
          $tile.removeClass("explosion-red")
          $tile.addClass("explosion-purple");

          setTimeout(function () {
            $tile.removeClass("explosion-purple");
            $tile.addClass("explosion-blue");

            setTimeout(function () {
              $tile.removeClass("explosion-blue");
              $tile.addClass("explosion-green");

              setTimeout(function () {
                $tile.removeClass("explosion-green");
                $tile.addClass("explosion-yellow");

                setTimeout(function () {
                  $tile.removeClass("explosion-yellow");
                  that.transitioning = false; // !!!
                }, 400);
              }, 400);
            }, 400);
          }, 400);
        }, 400);
      }, 400);
    }, 400);

  setTimeout(function () {
    this.neighbors().each(function(idx, $neighbor) {
      $neighbor.madTransitions();
    });
  }.bind(this), 150);
  };

  $(".color-explosion").colorExplosion();
});