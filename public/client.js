$(function() {
  console.log('document loaded');

  $('.input').on('click', typeInput);
  $('.operation').on('click', typeOperation);
  $('#calculator').on('click', '#equals', calculate);
  $('#clear').on('click', clear);
});
var inputCount = 1;
var operator = '';

function typeInput(event) {
  event.preventDefault();
  $('#input' + inputCount).append($(this).attr('id'));
}

function typeOperation(event) {
  event.preventDefault();
  operator = $(this).attr('id');
  inputCount += 1;
  $('#input' + inputCount).append($(this).text());
  inputCount += 1;
}

function calculate(event) {
  event.preventDefault();

  var val1 = $('#input1').text();
  var val2 = $('#input3').text();
  console.log(operator);
  var numbers = 'x=' + val1 + '&y=' + val2;
  console.log(numbers);
  $.ajax({
    url: '/calc/' + operator,
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
  inputCount = 1;
}

function clear() {
  $('.answer').remove();
  $('.screen').text('');
  inputCount = 1;
}
