$(function() {
  console.log('document loaded');
  // all four of the 'on click' event handlers used for:
  // numbers, operators, equal, and clear respectively.
  $('.input').on('click', typeInput);
  $('.operation').on('click', typeOperation);
  $('#calculator').on('click', '#equals', calculate);
  $('#clear').on('click', clear);
});
// inputCount is used to specify which of the three spans to append the value on.
// first span : input1(first value), second span : input2(operator), third span : input3(second value).
var inputCount = 1;
// operator keeps track of which operation is going to be used in the 'typeOperation' function.
var operator = '';

// whenever this function is called, it appends the value clicked to the selected span.
function typeInput(event) {
  event.preventDefault();
  $('#input' + inputCount).append($(this).attr('id'));
}

// whenever this function is called it saves the operation id
// into 'operator', increments the inputCount by 1, appends the operation into the second span,
// and finally adds 1 to inputCount.
function typeOperation(event) {
  event.preventDefault();
  if (inputCount == 1) {
    operator = $(this).attr('id');
    inputCount += 1;
    $('#input' + inputCount).append($(this).text());
    inputCount += 1;
  }
}

// converts #input1 and #input2's text into url encoded data to send to the server.
// also chooses which route to send the data to by appending the operation name
// on the URL.
function calculate(event) {
  event.preventDefault();
  if (inputCount == 3) {
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
}

// Makes a GET request to obtain the value on the server side, then runs appendResult.
function showResult() {
  $.ajax({
    url: '/calc',
    type: 'GET',
    success: appendResult
  });
}

// Removes the previous class 'answer' div if there was one on the DOM.
// Appends a new div of class 'answer' with the result of the calculation onto the #display div.
// On the next click of any button on the calculator, it clears the screen.
function appendResult(obj) {
  $('.answer').remove();
  $('#display').append('<div class="answer">'+ '= ' + obj.result +'</div>');
  if(inputCount == 3) {
    $('#buttons').one('click', clear);
  }
}

// Clears the screen and removes the div with class 'answer'.
function clear() {
  $('.answer').remove();
  $('.screen').text('');
  inputCount = 1;
}
