"""empty message

Revision ID: 5dd6d47369e0
Revises: a87eb4a00c4b
Create Date: 2019-10-04 10:11:43.771826

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '5dd6d47369e0'
down_revision = 'a87eb4a00c4b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('auditlog',
    sa.Column('pid', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=True),
    sa.Column('field', sa.String(length=255), nullable=True),
    sa.Column('old_value', sa.Text(), nullable=True),
    sa.Column('new_value', sa.Text(), nullable=True),
    sa.Column('date_time', sa.DateTime(), nullable=True),
    sa.Column('user', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('pid')
    )
    op.alter_column(u'employees', 'is_admin',
               existing_type=mysql.TINYINT(display_width=1),
               type_=sa.Boolean(),
               existing_nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(u'employees', 'is_admin',
               existing_type=sa.Boolean(),
               type_=mysql.TINYINT(display_width=1),
               existing_nullable=True)
    op.drop_table('auditlog')
    # ### end Alembic commands ###
