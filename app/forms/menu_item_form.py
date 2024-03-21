from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError
from app.models import MenuItem

def menu_item_name_exist(form, field):
    name = field.data
    item = MenuItem.query.filter(MenuItem.name == name).first()
    if item:
        raise ValidationError('Item name already exists')


class MenuItemForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), menu_item_name_exist])
    price = FloatField('price', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    category = StringField('category', validators=[DataRequired()])
    photo_url = StringField('photo_url', validators=[DataRequired()])
