$(function() {
  var imageModal = $('.image-modal');
  var imageClose = $('.close-modal');
  var caption = $('.modal-caption');
  var src;
  var title;

  $('.image-wrap a').click(function(e) {
    e.preventDefault();
    src = $(this).attr('href');
    title = $(this).attr('title');

    imageModal.trigger('show');
  });

  imageClose.click(function(){ imageModal.trigger('hide'); });

  imageModal.omniWindow({
    modal: {
      animations: {
        show: function(subjects, internalCallback) {
          subjects.modal.fadeIn(250, function(){
            internalCallback(subjects);
          })
        }
      }
    },
    callbacks: {
      positioning: $.noop,
      beforeShow: function(subjects, internalCallback) {

        var imageObj = new Image();
        $(imageObj).addClass('main-image');

        imageObj.onload = function() {
          var modalSize = {
            width: this.width,
            height: this.height
          };

          subjects.modal.animate({
            marginLeft: Math.round(modalSize.width / -2),
            height: modalSize.height,
            width: modalSize.width
          }, 250, function() {
            subjects.modal.append(imageObj);
            $(imageObj).fadeIn(250);
            $('.modal-caption').text(title);
            imageModal.removeClass('loading');
          });

        };
        imageObj.src = src;

        return internalCallback(subjects);
      },
      afterHide: function(subjects, internalCallback) {
        imageModal.find('.main-image').remove();
        $('.modal-caption').empty();
        imageModal.addClass('loading');

        return internalCallback(subjects);
      }
    }
  });
});