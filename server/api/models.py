from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# Association table for many-to-many relationship between Myusers and Sport
user_sports = db.Table('user_sports',
    db.Column('user_id', db.Integer, db.ForeignKey('myusers.id'), primary_key=True),
    db.Column('sport_id', db.Integer, db.ForeignKey('sports.id'), primary_key=True)
)

class Myusers(db.Model):
    __tablename__ = 'myusers'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    isProfileCompleted = db.Column(db.Boolean, default=False)
    availability = db.Column(db.Boolean, default=True)
    bio = db.Column(db.String(500))
    gender = db.Column(db.String(10))
    city = db.Column(db.String(100))
    tel = db.Column(db.String(15))

    # Establish the many-to-many relationship
    sports = db.relationship('Sport', secondary=user_sports, lazy='subquery',
                             backref=db.backref('users', lazy=True))

    # Relationship with Blog
    blogs = db.relationship('Blog', back_populates='author')

    def __repr__(self):
        return f'<User {self.username}>'

class Sport(db.Model):
    __tablename__ = 'sports'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)

    def __repr__(self):
        return f'<Sport {self.name}>'

class Blog(db.Model):
    __tablename__ = 'blogs'
    id = db.Column(db.Integer, primary_key=True)
    sport_id = db.Column(db.Integer, db.ForeignKey('sports.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('myusers.id'), nullable=False)

    # Relationship with Sport and User
    sport = db.relationship('Sport', backref='blogs')
    author = db.relationship('Myusers', back_populates='blogs')

    def __repr__(self):
        return f'<Blog {self.title}>'

# Function to insert default sports
def create_default_sports():
    default_sports = [
    'Soccer', 'Basketball', 'Tennis', 'Baseball', 'Swimming',
    'Volleyball', 'Cricket', 'Rugby', 'Table Tennis', 'Golf',
    'Handball', 'Hockey', 'Boxing', 'Cycling', 'Wrestling',
    'Gymnastics', 'Martial Arts', 'Skiing', 'Surfing',
    'Snowboarding', 'Skateboarding', 'Darts', 'Fencing',
    'Bowling', 'Archery', 'Rowing', 'Kickball', 'Lacrosse',
    'Squash', 'Polo', 'BMX Racing', 
    'Water Polo',
]

    
    for sport_name in default_sports:
        if not Sport.query.filter_by(name=sport_name).first():  # Check if sport already exists
            sport = Sport(name=sport_name)
            db.session.add(sport)
    
    db.session.commit()