from . import todolist
from flask import request, json, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

import datetime

from app import db
from ..models import TodoList, TodoListSchema


@todolist.route('/todolist/save', methods=['POST'])
@jwt_required
def save_todo():
    """
    Save a todolist
    """
    # Retrieve the data from request
    data = request.data
    data_js = json.loads(data)

    title = data_js.get('title')
    description = data_js.get('description')
    author = data_js.get('author')
    due_date = data_js.get('due_date')

    todoitem = TodoList(title=title, description=description, author=author, due_date=due_date)
    db.session.add(todoitem)
    db.session.commit()
    todo_schema = TodoListSchema()
    return todo_schema.jsonify(TodoList.query.get_or_404(todoitem.uid))


@todolist.route('/todolist/show', methods=['GET'])
@jwt_required
def show_todo():
    """
    Show all todolist
    """
    todoitems = TodoList.query.all()
    todo_schema = TodoListSchema(many=True)
    return todo_schema.jsonify(todoitems)


@todolist.route('/todolist/update/<int:uid>', methods=['POST', 'GET'])
@jwt_required
def update_todo(uid):
    """
    Update all todolist
    """
    # Retrieve item from database
    todoitem = TodoList.query.get_or_404(uid)

    if request.method == 'POST':
        # Retrieve the data from request
        data = request.data
        data_js = json.loads(data)

        # Get the individual values
        title = data_js.get('title')
        description = data_js.get('description')
        author = data_js.get('author')
        done = data_js.get('done')
        due_date = data_js.get('due_date')

        # Update the changes
        todoitem.title = title
        todoitem.description = description
        todoitem.author = author
        todoitem.done = done
        todoitem.due_date = due_date
        db.session.commit()

        # Return response
        todo_schema = TodoListSchema()
        return todo_schema.jsonify(todoitem)

    else:
        # Return response
        todo_schema = TodoListSchema()
        return todo_schema.jsonify(todoitem)


@todolist.route('/todolist/delete/<int:uid>', methods=['POST'])
@jwt_required
def delete_todo(uid):
    """
    Delete todolist
    """
    todoitem = TodoList.query.get_or_404(uid)
    db.session.delete(todoitem)
    db.session.commit()
    return jsonify("Item deleted"), 200
