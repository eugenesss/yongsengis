"""empty message

Revision ID: c15f43b61c83
Revises: 
Create Date: 2019-12-10 09:45:48.631888

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'c15f43b61c83'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('todolist',
    sa.Column('uid', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=True),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('created_date', sa.DateTime(), nullable=True),
    sa.Column('done', sa.Boolean(), nullable=True),
    sa.Column('author', sa.String(length=255), nullable=True),
    sa.Column('due_Date', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('uid')
    )
    op.alter_column(u'employees', 'is_admin',
               existing_type=mysql.TINYINT(display_width=1),
               type_=sa.Boolean(),
               existing_nullable=True)
    op.create_index(op.f('ix_employees_access'), 'employees', ['access'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_employees_access'), table_name='employees')
    op.alter_column(u'employees', 'is_admin',
               existing_type=sa.Boolean(),
               type_=mysql.TINYINT(display_width=1),
               existing_nullable=True)
    op.drop_table('todolist')
    # ### end Alembic commands ###
