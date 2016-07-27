/* global $ */

import QUESTION_TYPES from './QuestionTypes';
import questions from './questions';

import Condition from './Condition';

import renderCondition from './renderCondition';

window.questions = questions;
export default function renderQuestion(i) {
  const question = questions[i];

  $('.question .heading').text(`Q${1 + i}) ${question.category}`);
  $('.question .body > p').text(question.text);

  switch (question.query_type) {
    case QUESTION_TYPES.CHOICE_SINGLE:
    case QUESTION_TYPES.CHOICE_MULTIPLE:
      $('.question .body .options').html(question.options.map((o, j) => (
        `<p>
          ${String.fromCharCode(65 + j)}) ${o}
        </p>`
      )).join(' '));
      break;

    default:
      $('.question .body .options').empty();
  }

  if (question.conditions.length === 0) {
    const defaultCondition = new Condition(question, 'default');
    question.conditions.push(defaultCondition);
  }

  renderCondition(question.conditions[0]);
  question.conditions.slice(1).forEach((c) => renderCondition(c));
}
