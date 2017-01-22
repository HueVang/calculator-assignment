$(function() {
  console.log('document loaded');

  $('#calculator').on('click', 'button', calculate);
  $('#clear').on('click', clear);
});


function calculate(event) {
  event.preventDefault();
  var math = $(this).attr('id');
  console.log(math);
  var numbers = $(this).parent().serialize() + '&type=' + math;
  console.log(numbers);
  $.ajax({
    url: '/calc/' + math,
    data: numbers,
    type: 'POST',
    success: showResult
  });
}

function showResult() {
  $.ajax({
    url: '/calc',
    type: 'GET',
    success: appendResult
  });
}

function appendResult(obj) {
  $('#display').append('<div class="answer">'+ obj.result +'</div>');
}

function clear() {
  $('.answer').remove()
  $('#calculator')[0].reset();
}
