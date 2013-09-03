$(function(){
  var $modal1 = $('div.ex1-modal').omniWindow();
  $('a.ex1').click(function(e){
    e.preventDefault();
    $modal1.trigger('show');
  });

  var $modal2 = $('div.ex2-modal').omniWindow({
    overlay: {
      selector:  '.custom-overlay',
      hideClass: 'custom-overlay-closed'
    },
    modal: {
      hideClass: 'custom-modal-closed'
    }
  });
  $('a.ex2').click(function(e){
    e.preventDefault();
    $modal2.trigger('show');
  });

  var $modal3 = $('div.ex3-modal').omniWindow();
  $('div.ex3-modal a.close-button').click(function(e){
    e.preventDefault();
    $modal3.trigger('hide');
  });

  $('a.ex3').click(function(e){
    e.preventDefault();
    $modal3.trigger('show');
  });

  var $modal6 = $('div.ex6-modal').omniWindow({
    overlay: {
      animations: {
        hide: function(subjects, internalCallback) {
          subjects.overlay.fadeOut(250, function(){
            internalCallback(subjects); // call internal callback AFTER jQuery animations will stop
          })
        },
        show: function(subjects, internalCallback) {
          subjects.overlay.fadeIn(250, function(){
            internalCallback(subjects);
          })
        }
      }
    }
  });

  $('a.ex6').click(function(e){
    e.preventDefault();
    $modal6.trigger('show');
  });

  var $modal8 = $('div.ex8-modal').omniWindow({
    callbacks: {
      afterShow: function(subjects, internalCallback) {
        subjects.modal.find('input').val('').focus();
        subjects.modal.find('div.error').hide();
        return internalCallback(subjects);
      },
      beforeHide: function(subjects, internalCallback) {
        var $input = subjects.modal.find('input');
        if ($input.val().length == 0) {
          subjects.modal.find('div.error').show();
          $input.focus();
          return false;           // doesn't allow to hide!
        } else {
          return internalCallback(subjects);
        }
      }
    }
  });

  $('a.ex8').click(function(e){
    e.preventDefault();
    $modal8.trigger('show');
  });



});