function condition(operator, value, negate = 0) {
  return {
    operator,
    value,
    negate,
  };
}

function group(conditions, operator = '') {
  return {
    conditions,
    operator,
  };
}

function evaluateCondition(x, c) {
  let result;
  switch (c.operator) {
    case 'lt':
      result = (x < c.value);
      break;

    case 'gt':
      result = (x > c.value);
      break;

    case 'le':
      result = (x <= c.value);
      break;

    case 'ge':
      result = (x >= c.value);
      break;

    case 'eq':
      result = (x === c.value);
      break;

    case 'ne':
      result = (x !== c.value);
      break;

    default:
      console.error('Invalid condition operator:', c);
  }
  if (c.negate) {
    result = !result;
  }
  return result;
}

function evaluateGroup(x, g) {
  return g.conditions.
    map((c) => {
      if ('conditions' in c) {
        return evaluateGroup(x, c);
      }
      return evaluateCondition(x, c);
    }).
    reduce((result, cResult) => {
      switch (g.operator) {
        case 'and':
          return result && cResult;

        case 'or':
          return result || cResult;

        default:
          console.log('Invalid group operator:', g);
          return -1;
      }
    });
}

const c1 = condition('lt', 10);
const c2 = condition('gt', 100, 1);
const c3 = condition('eq', 50);

const g1 = group([c1, c2], 'or');
const g2 = group([g1, c3], 'and');

console.log(evaluateGroup(10, group([c1])));
