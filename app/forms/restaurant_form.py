from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Restaurant

def restaurant_name_exists(form, field):
    # check to see if restaurant name exists
    name = field.data
    restaurant = Restaurant.query.filter(Restaurant.name == name).first()
    if restaurant:
        raise ValidationError('Restaurant name already exists')


class RestaurantForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), restaurant_name_exists])
    logo = StringField('logo', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    zip_code = IntegerField('zip_code', validators=[DataRequired()])
