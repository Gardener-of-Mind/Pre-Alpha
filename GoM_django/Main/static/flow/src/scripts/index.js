/* global $ */

require('../styles/index.scss');

import questions from './questions';

import Condition from './Condition';

import renderQuestion from './renderQuestion';
import renderCondition from './renderCondition';

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie != '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

$.ajaxSetup({ headers: { 'X-CSRFToken': getCookie('csrftoken') } });

function init() {
  let activeQuestion = 0;
  renderQuestion(activeQuestion);

  $('#load-next').click(() => {
    if (activeQuestion === questions.length - 1) {
      return;
    }
    activeQuestion++;
    renderQuestion(activeQuestion);
  });

  $('#load-prev').click(() => {
    if (activeQuestion === 0) {
      return;
    }
    activeQuestion--;
    renderQuestion(activeQuestion);
  });

  $('#submit').click(() => {
    /*
      Invalid fLow reasons:
        1. No default condition
        2. No destination set in condition
        3. Incorrect destination question set in condition
        4. No value for testing set in condition
    */

    let isValid = true;

    const noDefaultConditionQuestions = questions.
      filter((q) => q.conditions.length === 0);

    if (noDefaultConditionQuestions.length) {
      isValid = false;
      alert(`At least default condition must be set:\n${noDefaultConditionQuestions.
        map((q) => `Q ${1 + q.idx})`).
        join('\n')
      }
    `);
    }

    questions.forEach((q) => {
      const noToQuestions = q.conditions.
        filter((c) => !c.to);

      if (noToQuestions.length) {
        isValid = false;
        alert(`No destination question set:\n${noToQuestions.
          map((c) => `Q ${1 + q.idx}) -> ${c.idx ?
            `Condition ${c.idx}` :
            'Default condition'
          }`).
          join('\n')
        }
      `);
      }

      const incorrectToQuestions = q.conditions.
        filter((c) => c.to < 0 || c.to > questions.length);

      if (incorrectToQuestions.length) {
        isValid = false;
        alert(`Incorrect destination question set:\n${incorrectToQuestions.
          map((c) => `Q ${1 + q.idx}) -> ${c.idx ?
            `Condition ${c.idx}` :
            'Default condition'
          }`).
          join('\n')
        }
      `);
      }

      const noValueQuestions = q.conditions.slice(1).
          filter((c) => !c.value);

      if (noValueQuestions.length) {
        isValid = false;
        alert(`At least default condition must be set:\n${noValueQuestions.
          map((c) => `Q ${1 + q.idx}) - ${c.idx}`).
          join('\n')
        }
      `);
      }
    });

    if (isValid) {
      const data = questions.reduce((_data, q) => {
        _data[q._id.$oid] = q.conditions.
          map(({ from, to, value }) =>
            ({ from, to, value }));

        return _data;
      }, {});

      $.post('.', { evaluation_scheme: JSON.stringify(data) });
    }

    // questions.forEach((q) => {
    //   q.eval_scheme = q.conditions.map(({ from, to, value }) =>
    //     ({ from, to, value }));
    // });
  });

  $('.add-condition').click(() => {
    const question = questions[activeQuestion];
    const condition = new Condition(question);
    question.conditions.push(condition);
    renderCondition(condition);
  });
}

$.post('.', { questions: 1 }, (response) => {
  JSON.parse(response.questions).forEach((q, i) => {
    questions.push({
      ...q,
      idx: i,
      conditions: [],
      element: undefined,
    });
  });

  init();
});
