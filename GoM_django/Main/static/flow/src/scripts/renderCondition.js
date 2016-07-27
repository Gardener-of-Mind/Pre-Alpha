/* global $ */

function deleteCondition(condition) {
  condition.question.conditions = [
    ...condition.question.conditions.slice(0, condition.idx),
    ...condition.question.conditions.slice(1 + condition.idx),
  ];
  condition.handle.remove();
  if (condition.idx < condition.question.conditions.length) {
    render(condition.question.conditions[condition.idx]);
  } else {
    console.log(condition.question.conditions.slice(-1)[0])
    render(condition.question.conditions.slice(-1)[0]);
  }
}

function render(condition) {
  if (condition.default) {
    $('.condition .heading #idx').text('Default');
    $('.condition .heading #close').hide();
    $('.condition .body .data').empty();
  } else {
    $('.condition .heading #idx').text(`Condition ${condition.idx}`);
    $('.condition .heading #close').show();
    $('.condition .body .data').html(condition.element);
    $('.condition .heading #close')[0].onclick = () => deleteCondition(condition);
  }

  $('.condition .heading #from').val(1 + condition.from);
  $('.condition .heading #to').val(1 + condition.to);
}

export default function renderCondition(condition) {
  $('.condition .heading #to')[0].onchange = (e) => {
    condition.to = +e.target.value.length ?
      +e.target.value - 1 :
      '';
  };

  const $handle = $(`<button class="btn">${condition.default ? 'D' : condition.idx}</button>`);
  $handle.click(() => { render(condition); });
  condition.handle = $handle;

  if (condition.default) {
    $('.add-condition + span').html($handle);
  } else {
    $('.add-condition + span').append($handle);
  }
  render(condition);
}
