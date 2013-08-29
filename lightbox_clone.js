(function ($) {
  var $modal, $image;
  var src, title;

  function onClickPreview(e) {
    e.preventDefault();
    src = $(this).attr('href');
    title = $(this).attr('title');

    $modal.trigger('show');
  }

  function onLoadImage() {
    $modal.animate({
      marginLeft: Math.round(this.width / -2),
      height: this.height,
      width: this.width
    }, 250, function () {
      $modal.append($image.hide());
      $image.fadeIn(250, function () {
        $modal.find('.modal-caption').text(title);
        $modal.removeClass('loading');
      });
    });
  }

  $.fn.imageBox = function () {
    $modal = $('.image-modal');
    $modal.omniWindow({
      modal: {
        animations: {
          show: function (subj, sysCall) { subj.modal.fadeIn(250,  function () { sysCall(subj); }); },
          hide: function (subj, sysCall) { subj.modal.fadeOut(250, function () { sysCall(subj); }); }
        }
      },

      callbacks: {
        positioning: $.noop, // do not use default position function

        afterShow: function (subj, sysCall) {
          subj.modal.addClass('loading');

          $image = $(new Image());
          $image.load(onLoadImage);
          $image.attr('src', src);

          return sysCall(subj);
        },

        afterHide: function (subj, sysCall) {
          $image.remove();
          subj.modal.find('.modal-caption').empty();

          return sysCall(subj);
        }
      }
    });

    this.click(onClickPreview);
    $modal.find('.close-modal').click(function () { $modal.trigger('hide'); });

    return this;
  };
})(jQuery);