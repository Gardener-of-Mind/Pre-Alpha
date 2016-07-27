/* global $ */

const conditions = {
  '': 0,
  'lesser than': 1,
  'greater than': 2,
  'lesser than or equal to': 3,
  'greater than or equal to': 4,
  between: 5,
  'equal to': 6,
};

const $score = $(`
  <div id="score">
    <span id="help">?</span> Score

    <select id="condition">
      ${
        Object.keys(conditions).map((k) => (
          `<option value=${conditions[k]}>${k}</option>`
        )).join('')
      }
    </select>

    <input type="text" id="num-1" style="display:none" value="0" />
    <span id="and" style="display:none">and</span>
    <input type="text" id="num-2" style="display:none" value="0" />

    <label id="not" style="display:none">Not <input type="checkbox" /></label>

    <div id="english"></div>
  </div>
`);

function renderEnglish() {
  const parts = [
    'Score',
  ];

  if ($score.find('#not input').prop('checked')) {
    parts.push('not');
  }

  parts.push(
    Object.keys(conditions).
      filter((k) => conditions[k] === +$score.find('#condition').val()).
      slice(0));

  switch (+$score.find('#condition').val()) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 6:
      parts.push(+$score.find('#num-1').val());
      break;

    case 5:
      parts.push(+$score.find('#num-1').val());
      parts.push('and');
      parts.push(+$score.find('#num-2').val());
      break;

    default:
  }
  $score.find('#english').html(parts.join(' '));
}

$score.find('select').change(function onSelectChange() {
  switch (+this.value) {
    case 0:
      $('#num-1').css('display', 'none');
      $('#num-2').css('display', 'none');
      $('#and').css('display', 'none');
      $('#not').css('display', 'none');
      break;

    case 1:
    case 2:
    case 3:
    case 4:
    case 6:
      $('#num-1').css('display', 'inline-block');
      $('#num-2').css('display', 'none');
      $('#and').css('display', 'none');
      $('#not').css('display', 'inline-block');
      break;

    case 5:
      $('#num-1').css('display', 'inline-block');
      $('#num-2').css('display', 'inline-block');
      $('#and').css('display', 'inline-block');
      $('#not').css('display', 'inline-block');
      break;

    default:
  }

  renderEnglish();
});

$score.find('input').change(() => {
  renderEnglish();
});

$score.find('#help').hover(() => {
  $score.find('#english').css('display', 'block');
}, () => {
  $score.find('#english').css('display', 'none');
});

export default $score;
