from flask_wtf import FlaskForm
from wtforms import SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import Menu

def menu_exists(form, field):
    restId = form.restaurant_id
    name = field.data
    menu = Menu.query.filter(Menu.name == name, Menu.restaurant_id == restId).first()
    if menu:
        raise ValidationError('Menu Already exists')

# def more_than_four_menu(form, field):


class MenuForm(FlaskForm):
    name = SelectField('name', choices=['Breakfast', 'Lunch', 'Dinner', 'Beverages'], validators=[DataRequired(), menu_exists])
    restaurant_id = None
