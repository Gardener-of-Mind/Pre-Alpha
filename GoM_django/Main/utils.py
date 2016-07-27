from Main.models import Question
from bson.objectid import ObjectId


def resolve_next_question(question_response):
    eval_scheme = question_response.question.eval_scheme
    default_question_id = eval_scheme[0]['to']
    next_question_id = default_question_id
    question_type = question_response.question.query_type
    for rule in eval_scheme[1:]:
        if question_type in ['dropdownbox', 'radio', 'rating', 'dual']:
            if question_response.single_option == int(rule['value']):
                next_question_id = rule['to']
                break
        elif question_type == 'text':
            if question_response.text_response == rule['value']:
                next_question_id = rule['to']
                break
        else:
            if question_response.response_per_option == [bool(option_value) for option_value in rule['value']]:
                next_question_id = rule['to']
                break
        if next_question_id == -1:
            return None
    return Question.objects(id=ObjectId(next_question_id)).first()
