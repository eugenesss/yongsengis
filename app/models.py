import datetime

from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from passlib.apps import custom_app_context as pwd_context


from flask_marshmallow import fields, Schema

from app import db, login_manager, http_auth
import app
from sqlalchemy.inspection import inspect
from sqlalchemy.orm import relationship, backref
from sqlalchemy import ForeignKey

SECRET_KEY = 'p9342v<3Eid9%$i01'

class Serializer(object):

    def serialize(self):
        return {c: getattr(self, c) for c in inspect(self).attrs.keys()}

    @staticmethod
    def serialize_list(l):
        return [m.serialize() for m in l]

ACCESS = {
    'guest': 0,
    'user': 1,
    'admin': 2
}

class Employee(UserMixin, db.Model, Serializer):
    """
    Create a User table
    """

    __tablename__ = 'employees'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(60), index=True, unique=True)
    username = db.Column(db.String(60), index=True, unique=True)
    first_name = db.Column(db.String(60), index=True)
    last_name = db.Column(db.String(60), index=True)
    password_hash = db.Column(db.String(128))
    is_admin = db.Column(db.Boolean, default=False)
    access = db.Column(db.Integer, index=True)

    def __init__(self, email, username, first_name, last_name, password, access=ACCESS['user']):
        self.email = email
        self.username = username
        self.first_name = first_name
        self.last_name = last_name
        self.password = password
        self.access = access

    def is_user_admin(self):
        return self.access == ACCESS['admin']

    def allowed(self, access_level):
        return self.access >= access_level

    @property
    def password(self):
        """
        Prevent pasword from being accessed
        """
        raise AttributeError('password is not a readable attribute.')

    @password.setter
    def password(self, password):
        """
        Set password to a hashed password
        """
        self.password_hash = pwd_context.encrypt(password)

    def verify_password(self, password):
        """
        Check if hashed password matches actual password
        """
        return pwd_context.verify(password, self.password_hash)

    def admin_or_user(self):
        """
        Verify if user is admin
        """
        return self.is_admin

    def __repr__(self):
        return '<User: {}>'.format(self.username)

    # Set up user_loader
    @login_manager.user_loader
    def load_user(user_id):
        return Employee.query.get(int(user_id))


class UserSchema(Schema):
    """
    User Schema
    """
    class Meta:
        # Fields to expose
        fields = ("id", "email", "username", "first_name", "last_name", "access")


class Warehouse(db.Model, Serializer):
    """
    Create a Warehouse table
    """
    __tablename__ = 'warehouse'
    wid = db.Column("wid", db.Integer, primary_key=True)
    wh_name = db.Column("name", db.String(50))
    location = db.Column("location", db.String(100))

    def __init__(self, wid, wh_name, location):
        self.wid = wid
        self.wh_name = wh_name
        self.location = location

    @property
    def serialize(self):
        return {'wid': self.wid, 'name': self.wh_name, 'location': self.location}


class WarehouseSchema(Schema):
    """
    Inventory Schema
    """

    class Meta:
        # Fields to expose
        fields = ("wid", "wh_name", "location")


class Category(db.Model, Serializer):
    """
    Create a Category table
    """
    __tablename__ = 'category'
    cid = db.Column("cid", db.Integer, primary_key=True)
    cat_name = db.Column("cat_name", db.String(50))

    def __init__(self, cid, cat_name):
        self.cid = cid
        self.cat_name = cat_name


class CategorySchema(Schema):
    """
    Inventory Schema
    """

    class Meta:
        # Fields to expose
        fields = ("cid", "cat_name")


class Inventory(db.Model, Serializer):
    """
    Create an Inventory table
    """
    __tablename__ = 'inventory'
    pid = db.Column("pid", db.Integer, primary_key=True)
    name = db.Column("name", db.String(50))
    description = db.Column("description", db.Text)
    code = db.Column("code", db.String(100))
    material = db.Column("material", db.String(50))
    price = db.Column("price", db.Integer)
    quantity = db.Column("quantity", db.Integer)
    perbox = db.Column("perbox", db.Integer)
    location = db.Column("location", db.String(50))
    rack = db.Column("rack", db.String(50))
    unit_code = db.Column("unit_code", db.String(50))
    file = db.Column("file", db.String(150))
    created_date = db.Column("created_date", db.DateTime, default=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    updated_date = db.Column("updated_date", db.DateTime)
    wid = db.Column('wid', db.Integer, ForeignKey('warehouse.wid'))
    cid = db.Column('cid', db.Integer, ForeignKey('category.cid'))
    warehouse = relationship("Warehouse", backref=db.backref("inventory", lazy='dynamic', cascade="all,delete"))
    category = relationship("Category", backref=db.backref("inventory", lazy='dynamic', cascade="all,delete"))

    def __init__(self, name, description, code, material, price, quantity, perbox, location, file,
                 wid, cid, rack, unit_code):
        self.name = name
        self.description = description
        self.code = code
        self.material = material
        self.price = price
        self.quantity = quantity
        self.perbox = perbox
        self.location = location
        self.file = file
        self.wid = wid
        self.cid = cid
        self.rack = rack
        self.unit_code = unit_code

    def __getitem__(self, item):
        return getattr(self, item)


class InventorySchema(Schema):
    """
    Inventory Schema
    """
    class Meta:
        # Fields to expose
        fields = ("wid", "wh_name", "pid", "name", "quantity", "description", "code", "price", "material", "perbox",
                  "location", "cid", "cat_name", "rack", "unit_code")


class UpdateInventorySchema(Schema):
    """
    Inventory Schema
    """

    class Meta:
        # Fields to expose
        fields = ("wid", "wh_name", "pid", "name", "quantity", "description", "code", "price", "material", "perbox",
                  "location", "cid", "cat_name", "rack", "unit_code")


class Loctite(db.Model, Serializer):
    """
    Create an Loctite table
    """
    __tablename__ = 'loctite'
    pid = db.Column("pid", db.Integer, primary_key=True)
    name = db.Column("name", db.Text)
    description = db.Column("description", db.String(255))
    price = db.Column("price", db.Integer)
    quantity = db.Column("quantity", db.Integer)
    batch = db.Column("batch", db.Integer)
    expiry_date = db.Column("expiry_date", db.Date)
    file = db.Column("file", db.String(150))
    created_date = db.Column("created_date", db.DateTime, default=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    updated_date = db.Column("updated_date", db.DateTime)

    def __init__(self, name, description, price, quantity, batch, expiry_date, file):
        self.name = name
        self.description = description
        self.price = price
        self.quantity = quantity
        self.batch = batch
        self.expiry_date = expiry_date
        self.file = file

    def __getitem__(self, item):
        return getattr(self, item)


class LoctiteSchema(Schema):
    """
    Loctite Schema
    """
    class Meta:
        # Fields to expose
        fields = ("pid", "name", "quantity", "description", "price", "batch", "expiry_date", "file")


class AuditLog(db.Model, Serializer):
    """
    Create an Audit Log table
    """
    __tablename__ = 'auditlog'
    pid = db.Column("pid", db.Integer, primary_key=True)
    name = db.Column("name", db.String(255))
    field = db.Column("field", db.String(255))
    old_value = db.Column("old_value", db.Text)
    new_value = db.Column("new_value", db.Text)
    date_time = db.Column("date_time", db.DateTime, default=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    user = db.Column("user", db.String(255))
    action = db.Column("action", db.String(255))

    def __init__(self, name, field, old_value, new_value, user, action):
        self.name = name
        self.field = field
        self.old_value = old_value
        self.new_value = new_value
        self.user = user
        self.action = action


class AuditLogSchema(Schema):
    """
    AuditLog Schema
    """
    class Meta:
        # Fields to expose
        fields = ("name", "field", "old_value", "new_value", "date_time", "user", "action")


class TodoList(db.Model, Serializer):
    """
    Create an Audit Log table
    """
    __tablename__ = 'todolist'
    uid = db.Column("uid", db.Integer, primary_key=True)
    title = db.Column("title", db.String(255))
    description = db.Column("description", db.Text)
    created_date = db.Column("created_date", db.DateTime, default=datetime.datetime.now())
    done = db.Column(db.Boolean, default=False)
    author = db.Column("author", db.String(255))
    due_date = db.Column("due_date", db.DateTime)

    def __init__(self, title, description, author, due_date):
        self.title = title
        self.description = description
        self.author = author
        self.due_date = due_date


class TodoListSchema(Schema):
    """
    AuditLog Schema
    """
    class Meta:
        # Fields to expose
        fields = ("uid", "title", "description", "created_date", "done", "author", "due_date")


def get_all_items():
    items = db.session.query(Warehouse.wid, Warehouse.wh_name, Inventory.pid, Inventory.name, Inventory.quantity,
                             Inventory.description, Inventory.code, Inventory.price, Inventory.material,
                             Inventory.perbox, Inventory.location, Inventory.rack, Inventory.unit_code, Category.cid,
                             Category.cat_name).filter(Inventory.wid == Warehouse.wid).filter(Category.cid == Inventory.cid).all()
    return items



def get_item(pid):
    item = db.session.query(Warehouse.wid, Warehouse.wh_name, Inventory.pid, Inventory.name, Inventory.quantity,
                            Inventory.description, Inventory.code, Inventory.price, Inventory.material,
                            Inventory.perbox, Inventory.location, Inventory.rack, Inventory.unit_code, Category.cid,
                            Category.cat_name).filter(Inventory.pid == pid).filter(Warehouse.wid == Inventory.wid).\
        filter(Category.cid == Inventory.cid).first()
    return item


def get_item_by_warehouse(wid):
    items = db.session.query(Warehouse.wid, Warehouse.wh_name, Inventory.pid, Inventory.name, Inventory.quantity,
                            Inventory.description, Inventory.code, Inventory.price, Inventory.material,
                            Inventory.perbox, Inventory.location, Inventory.rack, Inventory.unit_code, Category.cid,
                            Category.cat_name).filter(Inventory.wid == wid).filter(Category.cid == Inventory.cid).filter(Inventory.wid == Warehouse.wid).all()
    return items

