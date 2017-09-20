(function(window, $) {

  $(function() {

    // RIPPLE EFFECT
    $('.ripple').on('click', function(event) {
      event.preventDefault();

      var $div = $('<div/>'),
        btnOffset = $(this).offset(),
        xPos = event.pageX - btnOffset.left,
        yPos = event.pageY - btnOffset.top;

      $div.addClass('ripple-effect');
      var $ripple = $('.ripple-effect');

      $ripple.css('height', $(this).height() / 2);
      $ripple.css('width', $(this).height() / 2);
      $div
        .css({
          top: yPos - ($ripple.height() / 2),
          left: xPos - ($ripple.width() / 2),
          background: $(this).data('ripple-color')
        })
        .appendTo($(this));

      window.setTimeout(function() {
        $div.remove();
      }, 250);
    });

  });

})(window, jQuery);

$('document').ready(function() {

  //VARIABLES
  var history = document.getElementById('displayOp');
  var view = document.getElementById('displayResult');
  var nbr1 = '';
  var nbr2 = '';
  var result = '';
  var operator = '';
  var nums = [];
  var ops = [];
  var value = '';
  nums = document.querySelectorAll('.key-num');
  ops = document.querySelectorAll('.key-op');

  var setNum = function() {
    if (result) {
      nbr1 = this.getAttribute('data-num');
      result = '';
    } else {
      nbr1 += this.getAttribute('data-num');

    }

    view.innerHTML = nbr1;
  };

  $('button').click(function() {
    value = $(this).text();
    history.innerHTML = history.innerHTML + value;
  })

  var moveNum = function() {
    nbr2 = nbr1;
    nbr1 = '';
    operator = this.getAttribute('data-ops');

    equal.setAttribute('data-result', '');
  };

  var displayNum = function() {

    nbr2 = parseFloat(nbr2);
    nbr1 = parseFloat(nbr1);

    switch (operator) {
      case 'add':
        result = nbr2 + nbr1;
        break;

      case 'substract':
        result = nbr2 - nbr1;
        break;

      case 'multiply':
        result = nbr2 * nbr1;
        break;

      case 'divide':
        result = nbr2 / nbr1;
        break;
      default:
        result = nbr1;
    }
    if (!isFinite(result)) {
      if (isNaN(result)) {
        result = 'ERROR!';
      } else {
        result = 'Look at what you ve done';
        document.querySelector('#calculator').classList.add('broken');
        document.querySelector('#reset').classList.add('show');
      }
    }

    view.innerHTML = result;
    view.innerHTML = view.innerHTML.substring(0, 8);
    history.innerHTML = result;
    history.innerHTML = history.innerHTML.substring(0, 25);
    console.log(result);
    equal.setAttribute('data-result', result);
    nbr2 = 0;
    nbr1 = result;
  };

  var clearAll = function() {
    nbr2 = '';
    nbr1 = '';
    view.innerHTML = '0';
    equal.setAttribute('data-result', result);
  };


  for (var i = 0, l = nums.length; i < l; i++) {
    nums[i].onclick = setNum;
  }

  for (var i = 0, l = ops.length; i < l; i++) {
    ops[i].onclick = moveNum;
  }

  equal.onclick = displayNum;

  document.querySelector('#clear').onclick = clearAll;

  document.querySelector('#reset').onclick = function() {
    window.location = window.location;
  };

});
